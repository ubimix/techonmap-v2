/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var ResourceUtils = require('../../tools/ResourceUtilsMixin');

var LABELS = {"eric": "Eric", "eric-services" : "Eric Services", "eric-lab": "Eric LAb", "lab-1": "Living PACA Lab catégorie 1", "lab-2": "Living PACA Lab catégorie 2", "lab-3": "Living PACA Lab catégorie 3"};

module.exports =  {
    _selectLabel : function(label, ev) {
        var app = this.props.app;
        if (app.ui.canChangeSearchQueries()) {
            app.res.toggleLabels([label]);
            if (this._onSelectLabel){
                this._onSelectLabel(ev);
            }
        }
        ev.stopPropagation();
        ev.preventDefault();
    },
    _renderLabels : function(hideEmpty){
        var labels = ResourceUtils.getResourceLabels(this.props.resource);
        return this._renderLabelList(labels, hideEmpty);
    },
    _renderLabel : function(label){
        var app = this.props.app;
        var selected = app.res.isFilteredByLabel(tag);
        var selected = false;
        //label = app.res.getTagKey(label);
        var labelName = LABELS[label];
        var className = selected ? 'badge selected' : 'badge';
        return (
            <span
                onClick={_.bind(this._selectLabel, this, label)}
                className={className}
                key={label}>
                <span className='tag-label'>{labelName + ' '}</span>
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
