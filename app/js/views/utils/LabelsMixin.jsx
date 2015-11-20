/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var ResourceUtils = require('../../tools/ResourceUtilsMixin');

module.exports =  {
    _renderLabels : function(hideEmpty){
        var labels = ResourceUtils.getResourceLabels(this.props.resource);
        return this._renderLabelList(labels, hideEmpty);
    },
    _renderLabel : function(label){
        var app = this.props.app;
        //var selected = app.res.isFilteredByTag(tag);
        var selected = false;
        //tag = app.res.getTagKey(label);
        var className = selected ? 'badge selected' : 'badge';
        return (
            <span
                className={className}
                key={label}>
                <span className='tag-label'>{label + ' '}</span>
            </span>
        );
    },
    _renderLabelList : function(tags, hideEmpty) {
        var tags = _.map(tags, this._renderLabel, this);
        if (!tags.length) {
            if (hideEmpty) {
                return ;
            }
            tags = [
               <span className="tag none">
                   {this._getLabel('filter.label.tags.all')}
               </span>
            ];
        }
        return <div className="labels">{tags}</div>
    },
};
