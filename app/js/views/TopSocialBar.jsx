/** @jsx React.DOM */

var _ = require('underscore');
var React = require('react');
var DomUtils = require('./utils/DomUtils');
var PopupPanel = require('./utils/PopupPanel.jsx');
var I18NMixin = require('./utils/I18NMixin');

module.exports = React.createClass({
    render : function(){
        return ( 
          <div className="container-fluid">
              <div className="row social">
                  <div className="col-xs-9 twitter">
                      <div className="left">
                          <a href="https://twitter.com/TechOnMap" className="lastTweetAuthor">
                              @TechOnMap
                          </a> :
                           <span className="lastTweet"><a href="https://twitter.com/search?q=%23fens2014">#fens2014</a> dernier jour pour découvrir <a href="https://twitter.com/@TechOnMap">@TechOnMap</a> la carte représentant la richesse de l&quot;écosystème des acteurs du <a href="https://twitter.com/search?q=%23numerique">#numerique</a> francilien
                           </span>
                            <a href="https://twitter.com/TechOnMap/status/478119836766461952" className="lastTweetDate">15/6/2014 </a>
                      </div>
                  </div>
                  <div className="col-xs-3 follow">
                      <a href="https://twitter.com/TechOnMap" target="_blank">Suivez-nous</a>
                  </div>
              </div>
          </div>
      );
    }
});