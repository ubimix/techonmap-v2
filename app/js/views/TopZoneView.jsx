/** @jsx React.DOM */

var _ = require('underscore');
var React = require('react');
var DomUtils = require('./utils/DomUtils');
var PopupPanel = require('./utils/PopupPanel.jsx');

module.exports = React.createClass({
    displayName : 'TopZoneView',
    mixins : [ DomUtils ],
    _toggleNavigation : function(ref, ev) {
        var nav = this.refs[ref];
        if (nav) {
            var node = nav.getDOMNode();
            this._toggleClass(node, 'in');
        }
        ev.stopPropagation();
        ev.preventDefault();
    },
    _toggleMenu : function(ev) {
        var node = ev.target;
        while (node) {
            if (this._hasClass(node, 'dropdown'))
                break;
            node = node.parentNode;
        }
        if (node) {
            this._toggleClass(node, 'open');
        }
        ev.stopPropagation();
        ev.preventDefault();
    },
    _showInfo : function(){
        var title = (<span>This is a title</span>);
        var body = (<div><p>This is a content</p><p>Second paragraph</p></div>);
        var footer = (<div>Just a message</div>);
        
        PopupPanel.openPopup({
            title : title,
            body : body,
            footer : footer
        });
    },
    
    render : function() {
        var app = this.props.app;
        var className = this.props.className + " navbar navbar-default";
        return (
            <div className="topbar">
                <div className="social">
                    <div className="left">
                        <a href="https://twitter.com/TechOnMap" className="lastTweetAuthor">@TechOnMap</a> : <span className="lastTweet"><a href="https://twitter.com/search?q=%23fens2014">#fens2014</a> dernier jour pour découvrir <a href="https://twitter.com/@TechOnMap">@TechOnMap</a> la carte représentant la richesse de l'écosystème des acteurs du <a href="https://twitter.com/search?q=%23numerique">#numerique</a> francilien</span> <a href="https://twitter.com/TechOnMap/status/478119836766461952" className="lastTweetDate">15/6/2014 </a>
                    </div>
                    <div className="right">
                        <a href="https://twitter.com/TechOnMap" target="_blank">Suivez-nous</a>
                    </div>
                </div>
                <div className="header">
                    <div className="aside">
                        <a href="edition.html" className="btn-blue">Ajouter une organisation
                            sur la carte</a>
                    </div>
                    <div className="ban">
                        <div className="left">
                            <h1>
                                <a href=""><img src="images/banner.png" alt="Techonmap" /></a>
                            </h1>
                            <h2>La carte des acteurs du numérique en Île-de-France</h2>
                        </div>
                        <div className="right">
                            <ul className="menu">
                                <li className="level-1 picto-heatmap" title="Densité"></li>
                                <li className="deroulant level-1 open-left picto-param" title="Menu">
                                    <div className="hide-shadow"></div>
                                    <div className="menu-mask">
                                        <ul className="menu-content">
                                            <li className="level-2 lightbox-trigger" id="lightbox-about"><a href="#"> <span className="picto picto-about"></span> À propos
                                            </a></li>
                                            <li className="level-2 embed"><a href="#" className="generate-embed-trigger"> <span className="picto picto-embeded"></span> Embarquer
                                            </a></li>
                                            <li className="level-2"><a href="mailto:techonmap@lafonderie-idf.fr"> <span className="picto picto-contact"></span> Contact
                                            </a></li>
                                            <li className="level-2 image"><a href="#" className="generate-image-trigger"> <span className="picto picto-generate"></span> Générer une image
                                            </a></li>
                                            <li className="level-2 lightbox-trigger last export" id="lightbox-export-data"><a href="" id="export-data-trigger"> <span className="picto picto-export"></span>
                                                    Export des données
                                            </a></li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="clear"></div>
                    </div>
                </div>
                <div className="tab tab-up tab-to-menu"></div>
            </div>
        );
    }
});
