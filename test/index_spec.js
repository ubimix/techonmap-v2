var expect = require('expect.js');
var _ = require('underscore');
var ScrollManager = require('./ScrollManager');

/**
 * 
 */
var TestViewport = ScrollManager.Viewport.extend({
    getScrollPosition : function() {
        if (this._position === undefined)
            return -1;
        return this._position;
    },

    setScrollPosition : function(pos) {
        this._position = pos;
    }
});

describe('ScrollManager', function() {
    it('should check the Viewport parameter in the constructor', function() {
        expect(function() {
            new ScrollManager();
        }).to.throwError();
        expect(function() {
            new ScrollManager({
                viewport : 'foo'
            });
        }).to.throwError();
        var manager = new ScrollManager({
            viewport : new TestViewport()
        });
        expect(manager).to.not.be.empty();
    });
    it('should invoke Viewport getScrollPosition/setScrollPosition methods '
            + 'when the "updateViewport" method is called', function(done) {
        var viewport = new TestViewport();
        var manager = new ScrollManager({
            viewport : viewport
        });
        expect(viewport.getScrollPosition()).to.be(-1);
        var event; 
        manager.on('update', function(ev) {
            event = ev;
            ev.then(function() {
                console.log('Resolved!');
            });
        });
        var intent = manager.updateViewport();
        expect(viewport.getScrollPosition()).to.be(0);
        expect(event).to.be(intent);
        intent.then(done.bind(null, null), done);
    });
});