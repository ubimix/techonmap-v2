/**
 * @jsx React.DOM
 */
'use strict';
var _ = require('underscore');
var React = require('react');
var Mosaic = require('mosaic-commons');
var DomUtils = require('../utils/DomUtils');
var I18NMixin = require('../utils/I18NMixin');

var ExportTypeSelector = React.createClass({
    displayName: "ExportTypeSelector",
    mixins : [I18NMixin],
    componentWillMount : function(){
    },
    componentWillUnmount : function(){
    },
    getApp : function() {
        return this.props.app;
    },
    _newState : function(options){
        var state = _.extend({
            useQuery : this.props.useQuery
        }, this.state, options);
        state.url = this._getExportUrl(state);
        return state;
    },
    _getExportUrl : function(state){
        state = state || this.state;
        var embedMode = state.embedMode;
        var useQuery = state.useQuery;
        var app = this.getApp();
        var url = app.nav.getExportUrl({
            embedMode : embedMode,
            useQuery : useQuery
        });
        url = encodeURI(url);
        return url;
    },
    getInitialState : function(){
        return this._newState();
    },
    _onUseQuery : function(useQuery, ev){
        var state = this._newState({useQuery : useQuery});
        this.setState(state);
        ev.stopPropagation();
        ev.preventDefault();
    },
    _onChange : function(ev){
        
    },
    render : function(){
        var leftChecked = !!this.state.useQuery;
        var rightChecked = !leftChecked;
        return (
            <div className="row export-type-selector">
                <div className="col-xs-6">
                    <div className="media" onClick={_.bind(this._onUseQuery, this, true)}>
                        <a className="media-left" href="#">
                            <img alt="" src={this.props.leftImageUrl} />
                        </a>
                        <div className="media-body">
                            <input type="radio" checked={leftChecked} onChange={this._onChange}/>
                            votre selection de filterage 
                        </div>
                    </div>
                </div>
                <div className="col-xs-6">
                    <div className="media" onClick={_.bind(this._onUseQuery, this, false)}>
                        <a className="media-left" href="#">
                            <img alt="" src={this.props.rightImageUrl} />
                        </a>
                        <div className="media-body">
                            <input type="radio" checked={rightChecked} onChange={this._onChange}/>
                            l'intégralité des données 
                        </div>
                    </div>
                </div>
            </div>              
        );
    }
});
 
module.exports = ExportTypeSelector;
