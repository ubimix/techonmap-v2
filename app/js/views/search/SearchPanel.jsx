var _ = require('underscore');
var React = require('react');
var DomUtils = require('../utils/DomUtils');
var I18NMixin = require('../utils/I18NMixin');
var MenuMixin = require('../utils/MenuMixin.jsx');
var PanelSwitcher = require('../utils/PanelSwitcher');
var CategoriesSearchPanel = require('./CategoriesSearchPanel.jsx');
var SearchInputBoxView = require('./SearchInputBoxView.jsx');
var SearchResultsInfoView = require('./SearchResultsInfoView.jsx');
var ZoneInfoView = require('./ZoneInfoView.jsx');
var ZonesSearchPanel = require('./ZonesSearchPanel.jsx'); 
var TagsInfoView = require('./TagsInfoView.jsx');
var TagsSearchPanel = require('./TagsSearchPanel.jsx');
var CategoriesInfoView = require('./CategoriesInfoView.jsx');
var SelectedCategorySearchPanel = require('./SelectedCategorySearchPanel.jsx');

var SearchPanel = React.createClass({
    displayName : 'SearchPanel',
    mixins : [ DomUtils, I18NMixin, MenuMixin ],
    componentDidMount : function(){
        this._toggleMenuPanel('main');
    }, 
    componentDidUpdate : function(){
        this._toggleMenuPanel('main');
    },
    activate : function(key) {
        this.setState(this._newState({
            active: key
        }));
    },
    getApp : function(){
        return this.props.app;
    },
    render : function(){
        return (
             <PanelSwitcher className="container searchpanel" ref="panels">
                 {this._renderMainPanel()}
                 {this._renderZonesPanel()}
                 {this._renderCategoriesPanel()}
                 {this._renderSelectedCategoryPanel()}
                 {this._renderTagsPanel()}
             </PanelSwitcher>
        );
    },
    _onCategorySelect : function(category) {
        var app = this.getApp();
        if (app.nav.hasCategoryFilteredApplied()) {
            this._toggleMenuPanel('selected-category');
        }
    },
    _renderZonesPanel : function(){
        var app = this.getApp();
        return this._renderMenuPanelGroup('zones',
                this._renderMenuReturnRef(),
                <ZonesSearchPanel app={app} />);
    },
    _renderTagsPanel : function(){
        var app = this.getApp();
        return this._renderMenuPanelGroup('tags',
                this._renderMenuReturnRef(),
                <TagsSearchPanel app={app} />);
    },
    _renderCategoriesPanel : function(){
        var app = this.getApp();
        return this._renderMenuPanelGroup('categories',
                this._renderMenuReturnRef(),
                <CategoriesSearchPanel app={app}
                    onSelectCategory={this._onCategorySelect}/>);
    },
    _renderSelectedCategoryPanel : function(){
        var app = this.getApp();
        return this._renderMenuPanelGroup('selected-category',
                this._renderMenuReturnRef('categories',
                        'search.panel.button.return.to.categories'),
                <SelectedCategorySearchPanel app={app}
                    onExit={_.bind(this._toggleMenuPanel, this, 'categories')}/>);
    },
    _renderMainPanel : function(){
        var app = this.props.app;
        return this._renderMenuPanelGroup(
           'main', 
           this._renderMenuPanel(
               <h3 className="panel-title">
                   {this._getLabel('search.panel.label.input')}
               </h3>, 
               <SearchInputBoxView app={app}/>
           ), 
           this._renderMenuPanel(
               <h3 className="panel-title">
                   {this._getLabel('search.panel.label.filters')}
               </h3>,
               this._renderMenuItems(
                   this._renderMenuRef(
                           'search.panel.label.zones',
                           'zones',
                           <ZoneInfoView app={app} />),
                   this._renderMenuRef(
                           'search.panel.label.categories',
                           'categories',
                           <CategoriesInfoView app={app} />)
               )
           ),
           <SearchResultsInfoView app={app} />
        );
    },
});
               
module.exports = SearchPanel;