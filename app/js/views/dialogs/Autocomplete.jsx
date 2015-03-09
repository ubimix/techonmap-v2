var _ = require('underscore');
var React = require('react');

var Autocomplete = React.createClass({
    displayName : 'Autocomplete',
    statics:  {
        Factory : React.createFactory(Autocomplete)
    },
    getInitialState : function(){
        return this._newState();
    },
    _newState : function(options){
        var prevValue = (this.state || {}).value;
        var state = _.extend({
             showSuggestions : false,
             value : this.props.value
        }, this.state, options);
        var value = state.value;
        if (!value || value !== prevValue) {
            if (prevValue === undefined){
                state.suggestionIndex = 0;
            }
            var filter;
            var suggestions = this.props.suggestions;
            if (_.isFunction(suggestions)) {
                filter = suggestions;
            } else {
                filter = function(value, prevValue){
                    return _.filter(suggestions, function(str){
                        if (!value)
                            return true;
                        if (value == str)
                            return false;
                        return (str.match(value));
                    });
                 }
            }
            state.suggestions = filter(value, prevValue);
        }
        return state;
    },
    
    componentDidMount : function(){
// console.log(this.props.suggestions);
    },
    componentDidUpdate : function(){
// console.log(this.props.suggestions);
    },
    _updateSuggestionIndex : function(delta) {
        if (!this.state)
            return; 
        var pos = (this.state.suggestionIndex || 0) + delta;
        var len = this.state.suggestions ? this.state.suggestions.length : 0; 
        pos = Math.max(0, Math.min(len - 1, pos));
        this.setState(this._newState({
            suggestionIndex : pos            
        }));
    },
    _selectSuggestion : function() {
        if (!this.state)
            return; 
        var pos = (this.state.suggestionIndex || 0);
        var len = this.state.suggestions ? this.state.suggestions.length : 0;
        var suggestion = pos >= 0 && pos < len ? this.state.suggestions[pos] : null;
        if (suggestion) {
            this._setNewValue(suggestion);
        }
    },
    _onChange : function(ev){
        this._setNewValue(ev.target.value);
    },
    _setNewValue : function(value, callback){
        this.setState(this._newState({
            value : value
        }), function() {
            if (this.props.onValueUpdate){
                this.props.onValueUpdate(value);
            }
            if (callback) {
                callback();
            }
        }.bind(this));
    },
    _onFocus : function(ev) {
        this._blurring = false;
        this.setState(this._newState({ showSuggestions : true }));
    },
    _onBlur : function(ev) {
        this._blurring = true;
        setTimeout(function(){
            if (!this._blurring)
                return ;
            this._blurring = false;
            this.setState(this._newState({ showSuggestions : false }));
        }.bind(this), 150);
    },
    _onKeyDown : function(ev) {
        var handled = false;
        if (ev.keyCode == 13) { // Enter
            this._selectSuggestion();
            handled = true;
        } else if (ev.keyCode == 40) { // Down
            this._updateSuggestionIndex(+1);
            handled = true;
        } else if (ev.keyCode == 38) { // Up
            this._updateSuggestionIndex(-1);
            handled = true;
        }
        if (handled) {
            ev.stopPropagation();
            ev.preventDefault();
        }
    },
    _renderSuggestions : function(){
        if (!this.state.showSuggestions)
            return '';
        if (!this.state.suggestions.length)
            return '';
        var items = _.map(this.state.suggestions, function(str, pos) {
            var className = (pos === this.state.suggestionIndex) ? 'active' : '';
            return (
                <li className={className} role="presentation" key={str}>
                    <a role="menuitem" tabIndex="-1" href="#"
                        onClick={function(ev){
                            this._blurring = false;
                            var input = this.refs.input.getDOMNode(); 
                            input.focus();
                            setTimeout(function(){
                                this._setNewValue(str);
                            }.bind(this), 10);
                            ev.preventDefault();
                            ev.stopPropagation();
                        }.bind(this)}>
                        {str}
                    </a>
                </li>
            );
        }, this);
        var style = {display: 'block', maxHeight: '150px', overflowY : 'auto'};
        return (
            <ul className="dropdown-menu" role="menu"  style={style}>
                {items}
            </ul>                
        );
    },
    render : function(){
        var props = _.extend({}, this.props, {
            onChange : this._onChange,
            onFocus : this._onFocus,
            onBlur : this._onBlur,
            onKeyDown : this._onKeyDown,
            value : this.state.value,
            ref : 'input'
        });
        return (
            <span className="dropdown clearfix">
                {React.DOM.input(props)}
                {this._renderSuggestions()}
            </span>
        );
            
    }
});

module.exports = Autocomplete;