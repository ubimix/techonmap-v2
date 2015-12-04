var _ = require('underscore');
var React = require('react');
var DomUtils = require('../utils/DomUtils');
var I18NMixin = require('../utils/I18NMixin');
var MenuMixin = require('../utils/MenuMixin.jsx');
var PanelSwitcher = require('../utils/PanelSwitcher');
var CategoriesSearchFormPanel = require('./CategoriesSearchFormPanel.jsx');
var SearchInputBoxView = require('./SearchInputBoxView.jsx');
var ZoneInfoView = require('./ZoneInfoView.jsx');
var ZonesSearchFormPanel = require('./ZonesSearchFormPanel.jsx');
var TagsInfoView = require('./TagsInfoView.jsx');
var TagsSearchFormPanel = require('./TagsSearchFormPanel.jsx');
var CategoriesInfoView = require('./CategoriesInfoView.jsx');
var SelectedCategorySearchFormPanel = require('./SelectedCategorySearchFormPanel.jsx');

var SearchFormPanel = React.createClass({
    displayName : 'SearchFormPanel',
    mixins : [ DomUtils, I18NMixin, MenuMixin ],
    componentWillMount : function(){
        var app = this.getApp();
        app.res.addSearchCriteriaChangeListener(this._onChangeSearchCriteria);
    },
    componentWillUnmount : function(){
        var app = this.getApp();
        app.res.removeSearchCriteriaChangeListener(this._onChangeSearchCriteria);
    },
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
             <PanelSwitcher
                 className="search-form-panel"
                 ref="panels"
                 key="switch-panel"
                 onPanelUpdate={this.props.onPanelUpdate}>
                 {this._renderMainPanel()}
                 {this._renderZonesPanel()}
                 {this._renderCategoriesPanel()}
                 {this._renderSelectedCategoryPanel()}
                 {this._renderTagsPanel()}
             </PanelSwitcher>
        );
    },
    _onChangeSearchCriteria : function(){
        this._toggleMenuPanel('main');
    },
    _onCategorySelect : function(category) {
        var app = this.getApp();
        if (app.res.hasCategoryFilteredApplied()) {
            this._toggleMenuPanel('selected-category');
        }
    },
    _renderFluidPanel : function(key, panel){
        return (
            <div key={key} className="container-fluid">
                {panel}
            </div>
        );
    },
    _renderZonesPanel : function(){
        var app = this.getApp();
        return this._renderMenuPanelGroup('zones',
                this._renderMenuReturnRef(),
                this._renderFluidPanel("searchFormPanel", <ZonesSearchFormPanel app={app} />)
        );
    },
    _renderTagsPanel : function(){
        var app = this.getApp();
        return this._renderMenuPanelGroup('tags',
                this._renderMenuReturnRef(),
                this._renderFluidPanel("tagsSearchFormPanel", <TagsSearchFormPanel app={app} />)
        );
    },
    _renderCategoriesPanel : function(){
        var app = this.getApp();
        return this._renderMenuPanelGroup('categories',
                this._renderMenuReturnRef(),
                this._renderFluidPanel("CategoriesSearchFormPanel", <CategoriesSearchFormPanel app={app}
                    onSelectCategory={this._onCategorySelect}/>)
        );
    },
    _renderSelectedCategoryPanel : function(){
        var app = this.getApp();
        return this._renderMenuPanelGroup('selected-category',
                this._renderMenuReturnRef('categories',
                        'search.panel.button.return.to.categories'),
                this._renderFluidPanel(
                    "SelectedCategorySearchFormPanel",
                    <SelectedCategorySearchFormPanel app={app}
                    onExit={_.bind(this._toggleMenuPanel, this, 'categories')}/>
                )
        );
    },
    _renderMainPanel : function(){
        var app = this.props.app;
        return this._renderMenuPanelGroup(
           'main',
           this._renderMenuPanel({
               key : 'searchInput', 
               view : <SearchInputBoxView app={app}/>
           }),
           this._renderMenuPanel({
              key : 'searchFilters',
              view : (
                  <div key="searchFilterItems" className="search-filter-items">
                      <h4 key="title" className="header">Filtrer par :</h4>
                      {this._renderMenuItems(
                          this._renderMenuRef(
                                  'search.panel.label.zones',
                                  'zones',
                                  <ZoneInfoView app={app} />
                          ),
                          this._renderMenuRef(
                                  'search.panel.label.categories',
                                  'categories',
                                  <CategoriesInfoView app={app} />
                          ),
                          this._renderMenuRef(
                                  'search.panel.label.tags',
                                  'tags',
                                  <TagsInfoView app={app} />
                          )
                      )}
                  </div>
              )
           }),
           React.Children.map(this.props.children, function(child){
               return child;
           })
        );
    },
});

module.exports = SearchFormPanel;
