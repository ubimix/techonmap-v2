/**
 * @jsx React.DOM
 */
'use strict';
var _ = require('underscore');
var React = require('react');
var DomUtils = require('./DomUtils');

var PopupPanel = React.createClass({
     statics : {
        closePopup : function(options){
            if (!this._popupDiv)
                return ;
            React.unmountComponentAtNode(this._popupDiv);
        },
        openPopup : function(){
            this.closePopup();
            if (!this._popupDiv){
                this._popupDiv = document.createElement('div');
                document.body.appendChild(this._popupDiv);
            }
            var panel = PopupPanel.apply(this, arguments);
            React.render(panel, this._popupDiv);
        },
     },
     mixins : [DomUtils],

    componentDidMount : function(){
        this._updatePopupHeight = _.bind(this._updatePopupHeight, this);
        this._addResizeListener(this._updatePopupHeight);
        this._updatePopupHeight();
    },
    componentDidUpdate : function(){
        this._updatePopupHeight();
    },
    componentWillUnmount : function(){
        this._removeResizeListener(this._updatePopupHeight);
    },
    _updatePopupHeight : function(){
        var container = this.refs.container;
        var innerBorder = this.refs.innerBorder;
        var outerBorder = this.refs.outerBorder;
        if (!container || !innerBorder || !outerBorder){
            return ; 
        }
        var containerNode = container.getDOMNode();
        var innerPosition = 
            this._getPosition(innerBorder.getDOMNode(), containerNode);
        var outerPosition = 
            this._getPosition(outerBorder.getDOMNode(), containerNode);
        var containerHeight = this._getOuterHeight(containerNode);
        var delta = outerPosition.top + innerPosition.top  * 2;
        var height = containerHeight - delta; 
        height = Math.max(height, 0);
        if (!isNaN(height) && this.state.maxHeight !== height){
            this.setState(this._newState({
                maxHeight: height
            }));
        }
    },
    _newState : function(options){
        var state = _.extend({}, this.state, options);
        return state;
    },
    getInitialState : function(){
        return this._newState();
    },
     _handleClose : function(ev){
         ev.stopPropagation();
         ev.preventDefault();
         var onClose = this.props.onClose;
         var close = true;
         if (_.isFunction(onClose)){
             var result = onClose(ev);
             close = !(result === false);
         }
         if (close){
             PopupPanel.closePopup({app : this.props.app});
         }
     },
    
    render : function(){
        var style = {
            maxHeight: this.state.maxHeight
        };
        
        var className = this.props.className||'';
        className = "modal-dialog " + className;
        return (
        <div className="modal in" tabindex="-1" role="dialog" ref="container" style={{display: 'block'}}>
            <div className="modal-backdrop in" onClick={this._handleClose}></div>
            <div className={className}>
                <div className="modal-content" ref="outerBorder">
                    <div className="modal-header">
                        <button type="button" className="close" onClick={this._handleClose}>
                            <span aria-hidden="true">×</span>
                            <span className="sr-only">Close</span>
                        </button>
                        <h4 className="modal-title">
                            {this.props.title}
                        </h4>
                    </div>
                    <div className="modal-body" ref="innerBorder" style={style}>
                        {this.props.body}
                    </div>
                    <div className="modal-footer">
                        {this.props.footer}
                    </div>
                </div>
            </div>
        </div>
        );
    }
});

module.exports= PopupPanel;
 