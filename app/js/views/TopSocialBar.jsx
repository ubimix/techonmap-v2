/** @jsx React.DOM */

var _ = require('underscore');
var React = require('react');
var DomUtils = require('./utils/DomUtils');
var I18NMixin = require('./utils/I18NMixin');

module.exports = React.createClass({

    render : function(){
                return ( 
                        <div className="social">
                            <div className="pull-right logout">
                                <a href="#" onClick={this.logout}>
                                    Se déconnnecter
                                </a>
                            </div>
                            <div className="pull-right follow">
                                <a href="https://twitter.com/TechOnMap" target="_blank">
                                    Suivez-nous
                                </a>
                            </div>
                            <div className="left">
                                <a href="https://twitter.com/TechOnMap" className="lastTweetAuthor">
                                    @TechOnMap
                                </a> :
                                <span className="lastTweet">
                                    &nbsp;La nouvelle version de TechOnMap, la carte des acteurs du numérique d’Île-de-France est à découvrir très bientôt ! <a href="https://twitter.com/hashtag/opendata?src=hash"><s>#</s>opendata</a> <a href="https://twitter.com/hashtag/opensource?src=hash"><s>#</s>opensource</a>                      
                                </span>
                                &nbsp;<a href="https://twitter.com/TechOnMap/status/578596672126771200" className="lastTweetDate">19/3/2015</a>
                            </div>
                        </div>
                    );  
            
    },


    logout : function() {
        var app = this.props.app;
        app.user.logout().then(function(obj){
        	console.log('>>LOGGED OUT');     
         });
    }


});
