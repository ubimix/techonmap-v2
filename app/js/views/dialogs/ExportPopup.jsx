/**
 * @jsx React.DOM
 */
'use strict';
var _ = require('underscore');
var React = require('react');
var Mosaic = require('mosaic-commons');
var DomUtils = require('../utils/DomUtils');
var I18NMixin = require('../utils/I18NMixin');
var PopupPanel = require('../utils/PopupPanel.jsx');
var ContentPopupMixin = require('../utils/ContentPopupMixin');
var ExportTypeSelector = require('./ExportTypeSelector.jsx');

var FORMAT_CSV = 'csv';
var FORMAT_JSON = 'json';

var ExportConfigPanel = React.createClass({
    displayName: "ExportConfigPanel",
    mixins : [I18NMixin],
    componentWillMount : function(){
        this.props.events.on('export', this._updateExportFormat, this);
    },
    componentWillUnmount : function(){
        this.props.events.off('export', this._updateExportFormat, this);
    },
    getApp : function() {
        return this.props.app;
    },
    _newState : function(options){
        return _.extend({
            format : FORMAT_CSV,
            useQuery : true
        }, this.state, options);
    },
    _updateExportFormat : function(options) {
        this.setState(this._newState(options));
    },
    _updateDatasetSelection : function(useQuery){
        this.setState(this._newState({ useQuery : useQuery }));
    },
    getInitialState : function(){
        return this._newState();
    },
    _onTextareaChange : function(){
        this.setState(this._newState());
    },
    _selectTextareaContent : function(ev){
        if (!this.isMounted())
            return ;
        var elm = ev.target;
        setTimeout(function() {
            var len = elm.value.length;
            DomUtils._selectText(elm, 0, len);
        }, 10);
    },
    _prepareData : function(){
        var app = this.getApp();
        var useQuery = this.state.useQuery;
        var data = useQuery ? app.res.getResources() : app.res.getAllResources();
        var format = this.state.format;
        var result;
        if (format == FORMAT_CSV) {
            result = app.serialize.formatAsJson(data); 
        } else {
            result = app.serialize.formatAsCSV(data);
        }
        return result;
    },
    render : function(){
        var leftImageUrl  = "images/export-selected.png";
        var rightImageUrl = "images/export-all.png";
        var app = this.getApp();
        return (
           <div>
               <div className="configuration-zone">
                   <p>{this._getLabel("dialog.export.description")}</p>
                   <h3>{this._getLabel("dialog.export.title.query")}</h3>
                   <ExportTypeSelector app={app}
                        leftImageUrl={leftImageUrl}
                        rightImageUrl={rightImageUrl}
                        useQuery={this.state.useQuery}
                        onUpdate={this._updateDatasetSelection}
                        />

                    <h3>{this._getLabel("dialog.export.title.format")}</h3>
                    <div className="row">
                        <div className="col-xs-12">
                            <textarea className="code embed"
                                value={this._prepareData()}
                                onChange={this._onTextareaChange}
                                onFocus={this._selectTextareaContent}/>
                        </div>
                    </div>
                </div>
           </div>                
        );
    }
});

var ExportPopup = Mosaic.Class.extend(I18NMixin, ContentPopupMixin, {
    initialize : function(options){
        this.setOptions(options);
    },
    getApp : function() {
        return this.options.app;
    },
    open : function() {
        var title = (
            <span>
                <i className="icon icon-export"></i>
                {this._getLabel('dialog.export.title')}
            </span>
        );
        var app = this.getApp();
        var events = new Mosaic.Events();
        this._panel = (<ExportConfigPanel app={app} events={events}/>);
        var that = this;
        var footerElm = (
           <div>
               <div className="row">
                   <div className="col-xs-6 text-center">
                       <button type="button" className="btn btn-primary"
                           onClick={function() { events.fire('export', { format: FORMAT_CSV }); }}>
                           {this._getLabel('dialog.export.btn.csv')}
                       </button> 
                   </div>
                   <div className="col-xs-6 text-center">
                       <button type="button" className="btn btn-primary"
                           onClick={function() { events.fire('export', { format: FORMAT_JSON }); }}>
                           {this._getLabel('dialog.export.btn.json')}
                       </button>        
                   </div>
               </div>
           </div>
        );
        PopupPanel.openPopup({
            title : title,
            body : this._panel,
            footer : footerElm
        });

    },
 
});

module.exports = ExportPopup;
