/** @jsx React.DOM */

var _ = require('underscore');
var React = require('react');
var DomUtils = require('./utils/DomUtils');
var I18NMixin = require('./utils/I18NMixin');

module.exports = React.createClass({
    _toggleMode : function(ev){
        var app = this.props.app;
        app.ui.toggleMobileMode();
        ev.preventDefault();
        ev.stopPropagation();
    },
    render : function(){
        return ( 
          <div className="social">
              <div className="pull-right follow">
                  <a href="https://twitter.com/TechOnMap" target="_blank">
                      Suivez-nous
                  </a>
                  | 
                  <a href="#" onClick={this._toggleMode} style={{backgroundColor: 'white', color: 'black'}}>
                      {this.props.app.ui.isMobileMode() ? ' FULL ' : ' MOB ' }
                  </a>    
              </div>
              <div className="left">
                  <a href="https://twitter.com/TechOnMap" className="lastTweetAuthor">
                      @TechOnMap
                  </a> :
                  <span className="lastTweet">
                      <a href="https://twitter.com/search?q=%23fens2014">#fens2014</a> dernier jour pour découvrir <a href="https://twitter.com/@TechOnMap">@TechOnMap</a> la carte représentant la richesse de l&quot;écosystème des acteurs du <a href="https://twitter.com/search?q=%23numerique">#numerique</a> francilien
                  </span>
                  <a href="https://twitter.com/TechOnMap/status/478119836766461952" className="lastTweetDate">15/6/2014 </a>
              </div>
          </div>
      );
    }
});