/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var PanelSwitcher = require('./PanelSwitcher');

function toArray(args){
    args = _.toArray(args);
    if (args.length == 1 && _.isArray(args[0])) {
        args = _.toArray(args[0]);
    }
    return args;
}

var MenuMixin = {
    _renderMenuItems : function(){
        return (        
            <ul className="list-group">
                {_.map(arguments, function(val) {
                    return <li className="list-group-item">{val}</li>
                })}
            </ul>
        );
    },
    _renderMenuPanel : function(){
        var args = toArray(arguments);
        var heading = args[0];
        args.splice(0, 1);
        args = _.filter(args, function(val){
            return !!val;
        });
        var body = null;
        var key;
        if (args.length) {
            body = <div className="panel-body">{args}</div>;
            key = args[0].key;
        }
        if (!key) {
            key = _.uniqueId('menu-');
        }
        return (
             <div className="panel" key={key    }>
                 <div className="panel-heading">{heading}</div>
                 {body}
             </div>
        );
    },
    _renderMenuPanelGroup : function(){
        var args = toArray(arguments);
        var ref = args[0];
        args.splice(0, 1);
        args = toArray(args);
        var className = "panel-group " + ref;
        return (<div className={className} ref={ref}>{args}</div>);
    },
    _renderMenuPanels : function(){
        var panels = toArray(arguments);
        return (
            <PanelSwitcher className="container" ref="panels">
                {panels}
            </PanelSwitcher>
       );
    },
    _toggleMenuPanel : function(panelKey, ev) {
        this.refs.panels.activate(panelKey);
        if (ev) {
            ev.preventDefault();
            ev.stopPropagation();
        }
    },
    _renderMenuRef : function(labelKey, panelKey, view) {
        return (
           <a href="#" onClick={_.bind(this._toggleMenuPanel, this, panelKey)}>
               <i className="chevron-right pull-right"/>
               {this._getLabel(labelKey)}
               {view}
           </a>
        );
    },
    _renderMenuReturnRef : function(key, labelKey){
        key = key || 'main';
        labelKey  = labelKey || 'search.panel.button.return';
        return this._renderMenuItems(
            <a href="#" className="return" onClick={_.bind(this._toggleMenuPanel, this, key)}>
                <i className="chevron-left pull-left"/>
                {this._getLabel(labelKey)}
            </a>
        );
    },
};

module.exports = MenuMixin;
