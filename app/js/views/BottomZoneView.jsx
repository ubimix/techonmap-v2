/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
module.exports = React.createClass({
    displayName : 'BottomZoneView',
    _onClick : function(ev) {
      window.open('http://emergences-numeriques.regionpaca.fr/innovation-et-economie-numeriques/programme-paca-labs-2014-2020/living-paca-labs.html', '_blank');
      ev.stopPropagation();
      ev.preventDefault();
    },

    render : function() {
        var app = this.props.app;
        return (
            <div className={this.props.className} onClick={this._onClick}>
            </div>
        );
    }
});
