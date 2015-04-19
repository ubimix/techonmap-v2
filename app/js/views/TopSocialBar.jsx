/** @jsx React.DOM */

var _ = require('underscore');
var React = require('react');
var DomUtils = require('./utils/DomUtils');
var I18NMixin = require('./utils/I18NMixin');

module.exports = React.createClass({

    render : function(){
                return ( 
                        <div className="social">
                            {this._renderLogoutButton()}
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
        var that = this;
        app.user.logout().then(function(obj){
        	that.setState({user : null});  
         });
    },
    
    getInitialState : function() {
        return { user : null };
    },
    
    componentWillMount : function() {
        this._checkUserState();
    },
    
    componentWillUnmount : function() {
        var app = this.props.app;
        app.user.removeChangeListener(this._onUserChange);
    },
    
    _checkUserState : function() {
        var app = this.props.app;
        var that = this;
        app.user.addChangeListener(this._onUserChange);
        app.user.getUserInfo().then(function(user) {
          that.setState({user : user});  
        });        
    },

    _renderLogoutButton : function() {
        if (!this.state.user) {
            return;
        }
        
        return (
            <div className="pull-right logout">
                <a href="#" onClick={this.logout}>
                    Se déconnnecter
                </a>
            </div>
        );
    },
    
    _onUserChange : function() {
        this._checkUserState();
    }
});
