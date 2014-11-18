/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var SearchInputBoxView = require('./SearchInputBoxView.jsx');
var SearchTagsView = require('./SearchTagsView.jsx');
var DomUtils= require('./utils/DomUtils');
var TagsMixin = require('./widgets/TagsMixin.jsx');

module.exports = React.createClass({
    displayName : 'LeftToolbar',
    mixins : [TagsMixin],
    
    _incZoomLevel : function(ev){
        var app = this.props.app;
        app.map.changeMapZoom({ zoomDelta : +1 });
        ev.stopPropagation();
        ev.preventDefault();
    },

    _decZoomLevel : function(ev){
        var app = this.props.app;
        app.map.changeMapZoom({ zoomDelta : -1 });
        ev.stopPropagation();
        ev.preventDefault();
    },
    _toggleCategories : function(ev){
        var app = this.props.app;
        var elm = this.refs.categories.getDOMNode();
        DomUtils._toggleClass(elm, 'open');
        ev.stopPropagation();
        ev.preventDefault();
    },
    _onSelectTag : function(){
        var elm = this.refs.categories.getDOMNode();
        DomUtils._removeClass(elm, 'open');
    },
    _renderCategories : function(){
        var app = this.props.app;
        var categories = app.nav.getCategories();
        var left = [];
        var right = [];
        _.each(categories, function(category, i){
            var key = category.key;
            var label = category.label;
            var tags = category.tags;
            var array = (i % 2) ? left : right;
            array.push(
                <div key={key}>
                    <h4>{label}</h4>
                    <div>{this._renderTagList(tags)}</div>
                </div>
            );
        }, this);
        if (right.length < left.length){
            right.push('');
        }
        var list = [];
        for (var i=0; i<left.length; i++) {
            list.push(
                <div className="row" key={i}>
                    <div className="col-xs-6">{left[i]}</div>
                    <div className="col-xs-6">{right[i]}</div>
                </div>
            );
        }
        return (
            <div>{list}</div>
        );
    },
    render : function() {
        var app = this.props.app;
        return (
            <div className={this.props.className}>
            
                <div className="btn-group-vertical" role="group">
                    <SearchInputBoxView app={app}/>
                </div>

                <div className="btn-group-vertical" role="group">
                    <button type="button" className="btn btn-default">
                        Tags : <SearchTagsView app={app}/>
                    </button>
                </div>

                <div className="btn-group-vertical" role="group">
                    <button type="button" className="btn btn-default" onClick={this._incZoomLevel}><i className="glyphicon glyphicon-plus"></i></button>
                    <button type="button" className="btn btn-default" onClick={this._decZoomLevel}><i className="glyphicon glyphicon-minus"></i></button>
                </div>

                <div className="btn-group-vertical" role="group" ref="categories">
                    <button type="button" className="btn btn-default" onClick={this._toggleCategories}><i className="glyphicon glyphicon-th-list"></i></button>
                    <ul className="dropdown-menu categories" role="menu">
                        <li>
                             {this._renderCategories()}
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
});
