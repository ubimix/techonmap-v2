var Mosaic = require('mosaic-commons');
var _ = require('underscore');

var Base = Mosaic.Class.extend(Mosaic.Events.prototype, {
    intent : function(key, options, callback) {
        var intent;
        try {
            var deferred = Mosaic.P.defer();
            var handled = false;
            intent = {
                options : options,
                target : this,
                resolve : function() {
                    handled = true;
                    deferred.resolve.apply(deferred, arguments);
                },
                reject : function() {
                    handled = true;
                    deferred.reject.apply(deferred, arguments);
                },
                then : _.bind(deferred.promise.then, deferred.promise)
            };
            this.fire(key, intent);
            if (!handled && _.isFunction(callback)) {
                var result = callback.call(this, intent);
                if (result !== undefined) {
                    intent.resolve(result);
                }
            }
        } catch (err) {
            intent.reject(err);
        }
        return intent;
    }
});

/**
 * This class manages loading and visualization individual items in the list.
 */
var ScrollManager = Base.extend({

    /**
     * Constructor of this class.
     */
    initialize : function(options) {
        this.setOptions(options);
        var viewport = this.getViewport();
        if (!ScrollManager.Viewport.hasInstance(viewport)) {
            throw new Error('Scroll viewport is not defined');
        }
    },

    /**
     * Returns the viewport associated with this scroll manager.
     */
    getViewport : function() {
        return this.options.viewport;
    },

    /**
     * Updates scroll position of the underlying viewport.
     */
    updateViewport : function() {
        return this.intent('update', {}, function(intent) {
            var viewport = this.getViewport();
            var pos = viewport.getScrollPosition();
            if (pos < 0) {
                pos = 0;
            }
            viewport.setScrollPosition(pos);
            return true;
        });
    }
});

ScrollManager.Base = Base;

/** 
 * 
 */
var NOT_IMPLEMENTED = ScrollManager.NOT_IMPLEMENTED = (function(method) {
    return function() {
        throw new Error('Method "' + method + '" is not implemented. ' +
                'It should be defined in subclasses.');
    }
});

/**
 * 
 */
ScrollManager.Block = Base.extend({
    initialize : function(options) {
        this.setOptions(options);
    },
    getLength : NOT_IMPLEMENTED('Block#getLength')
});

/**
 * Instances of this class are used to replace real items in scroll lists.
 */
ScrollManager.Placeholder = ScrollManager.Block.extend({

    /**
     * Constructor of this class initializing the total number of items replaced
     * by this placeholder and an average item length.
     */
    initialize : function(options) {
        this.setOptions(options);
        this.setItemsNumber(this.options.number);
        this.setItemAverageLength(this.options.itemLen);
    },

    /**
     * Returns length of this placeholder. It is equal to the number of items
     * replaced by this placeholder multiplied by the average item length.
     */
    getLength : function() {
        var number = this.getItemsNumber();
        var averageLength = this.getItemAverageLength();
        return number * averageLength;
    },

    /**
     * Returns the number of items replaced by this placeholder.
     */
    setItemsNumber : function(number) {
        return this.intent('update', {
            number : number
        }, function(intent) {
            this._itemsNumber = number || 0;
            return true;
        });
    },

    /**
     * Returns the number of items replaced by this placeholder.
     */
    getItemsNumber : function() {
        return this._itemsNumber || 0;
    },

    /**
     * Sets the average item length.
     */
    setItemAverageLength : function(len) {
        this._itemLen = len || 10;
    },

    /**
     * Returns the average item length.
     */
    getItemAverageLength : function() {
        return this._itemLen || 10;
    }

});

/**
 * 
 */
ScrollManager.Viewport = Base.extend({

    getScrollPosition : NOT_IMPLEMENTED('Viewport#getScrollPosition'),

    setScrollPosition : NOT_IMPLEMENTED('Viewport#setScrollPosition'),

    initialize : function(options) {
        this.setOptions(options);
        this._before = new ScrollManager.Placeholder(this.options);
        // this._block = new ScrollManager.Placeholder(this.options);
        this._after = new ScrollManager.Placeholder(this.options);
    },

    getBlockBefore : function() {
        return this._before;
    },

    getBlockAfter : function() {
        return this._after;
    },

});

module.exports = ScrollManager;