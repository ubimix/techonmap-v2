'use strict';
var _ = require('underscore');
var React = require('react');
var PopupPanel = require('./PopupPanel.jsx');

module.exports = {
    _showContentDialog : function(href) {
        var app = this.getApp();
        app.content.loadContent(href).then(function(obj) {
            var title = obj.getAsHtml('title');
            var content = obj.getContentAsHtml();
            var footer = obj.getAsHtml('footer');
            var titleElm = React.DOM.span({
                dangerouslySetInnerHTML : {
                    __html : title
                }
            });
            var bodyElm = React.DOM.span({
                dangerouslySetInnerHTML : {
                    __html : content
                }
            });
            var footerElm = React.DOM.span({
                dangerouslySetInnerHTML : {
                    __html : footer
                }
            });
            PopupPanel.openPopup({
                title : titleElm,
                body : bodyElm,
                footer : footerElm
            });
        });
    },
};
