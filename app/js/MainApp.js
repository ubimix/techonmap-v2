var _ = require('underscore');
var React = require('react');
var Mosaic = require('mosaic-commons');
require('mosaic-core');
var MainView = require('./views/MainView.jsx');

// var SelectionModule = require('./models/selection/Selection.Module');
// var SearchModule = require('./models/search/Search.Module');
var I18NModule = require('./models/i18n/I18N.Module');
var MapModule = require('./models/map/Map.Module');
// var UIModule = require('./models/ui/UI.Module');

var initWidgets = require('./views/widgets/registration');
module.exports = Mosaic.App.extend({

    /**
     * This function loads and initializes all modules of this application.
     */
    initModules : function() {
        this.viewManager = new Mosaic.Core.ViewManager();
        initWidgets(this);
        var modules = {
            map : MapModule,
            // search : SearchModule,
            // selection : SelectionModule,
            i18n : I18NModule,
        // ui : UIModule
        };
        this.apis = [];
        this.modules = {};
        _.each(modules, function(ModuleType, name) {
            var module = new ModuleType({
                key : name,
                app : this
            });
            this._addModule(name, module);
        }, this);
    },

    /** Returns all registered modules. */
    getModules : function() {
        return this.modules;
    },

    _addModule : function(name, module) {
        var api = module.api;
        this.apis.push(api);
        this.modules[name] = module;
        this[name] = api;
    },

    _applyToModules : function(modules, onoff) {
        var that = this;
        return Mosaic.P.all(_.map(modules, function(module) {
            return Mosaic.P.then(function() {
                if (module[onoff]) {
                    return module[onoff]();
                }
            })
        }));
    },

    /**
     * Pre-loads data for this application and returns a promise with results.
     */
    preloadData : function() {
        return this._applyToModules(this.modules, 'start');
    },

    /** Closes all modules */
    deleteModules : function() {
        return this._applyToModules(this.modules, 'stop');
    },

    /**
     * This method initializes main views of this application.
     */
    initViews : function(err) {
        if (err) {
            console.log('[ERROR] Initialization failed.', err);
        }
        var containers = this.options.containers;
        this.mainView = new MainView({
            app : this
        });
        React.renderComponent(this.mainView, containers.main);
    }

});
