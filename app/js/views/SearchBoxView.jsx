/**
 * @jsx React.DOM
 */
define(
// Dependencies
[ 'require', 'underscore', 'react', 'mosaic-core', 'mosaic-commons',
      './AppViewMixin'  ],
// Module
function(require) {
    'use strict';
    var _ = require('underscore');
    var React = require('react');
    var Mosaic = require('mosaic-commons');
    var AppViewMixin = require('./AppViewMixin');

    return React.createClass({
        displayName : 'SearchBoxView',
        render : function(){
            var value = this.state.value||'';
            return (
                <form className={this.props.className} role="search" id={this.props.id}>
                   <div className="input-group">
                       <span className="input-group-btn">
                           <button ref="button" className="btn btn-default" type="button"
                               onClick={_.bind(function(){
                                   var value = this.state.value;
                                   this._setQuery(value);
                               }, this)}>
                               <i className="glyphicon glyphicon-search"></i>
                           </button>
                       </span>
                       <input ref="inputBox" type="text" className="form-control"
                           onChange={this._onInputChange}
                           onKeyDown={this._onKeyDown}
                           value={value}/>
                       <span className="input-group-btn">
                           {this._renderClearButton()}
                       </span>
                   </div>
               </form>
           ); 
        },
        _renderClearButton : function(){
            var value = this.state.value;
            if (value && value != '' ) {
                return (
                    <button className="btn btn-default" type="button"
                        onClick={this._clearSearch}>
                        <i className="glyphicon glyphicon-remove"></i>
                    </button>
                );
            }
            return undefined;
        },
        getInitialState : function(){
            return this._newState();
        },
        componentWillMount : function(){
            var app = this.props.app;
            this._setQuery = _.debounce(this._setQuery, 500);
            app.nav.addChangeListener(this._onSearch);
        },
        componentWillUnmount : function(){
             var app = this.props.app;
             app.nav.removeChangeListener(this._onSearch);
        },
        _clearSearch : function(e){
            this.setState(this._newState({
                value : ''
            }));
            this._setQuery('');
        },
        _setQuery : function(query){
            var app = this.props.app;
            app.nav.setSearchQuery(query);
        },
        _newState : function(options){
            var query = this.props.app.nav.getSearchQuery();
            return _.extend({ 
                value : query
            }, this.state, options); 
        },
        _onInputChange : function(ev){
            var query = ev.target.value;
            this._setQuery(query);
            this.setState(this._newState({
                value : query
             }));
        },
        _onKeyDown : function(ev) {
            var code = ev.which;
            var cancel = false;
            if (code === 13) { // ENTER
                var value = this.state.value;
                this._setQuery(value);
                cancel = true;
            } else if (code === 27) { // ESC
                this._clearSearch();
                cancel = true;
            }
            if (cancel){
                ev.preventDefault();
                ev.stopPropagation();
            }
        },
        _onSearch : function(){
            var query = this.props.app.nav.getSearchQuery();
            this.setState(this._newState({
                value : query
             }));
        },
    });
   
   
});
 