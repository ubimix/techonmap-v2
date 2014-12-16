'use strict';
var _ = require('underscore');
var React = require('react');
var PopupPanel = require('./PopupPanel.jsx');

module.exports = {
    _showContentDialog : function(options) {
        var app = this.getApp();
        app.content.loadContent(options).then(function(obj) {
            var title = obj.getAsHtml('title');
            var content = obj.getContentAsHtml();
            var footer = options.footer || obj.getAsHtml('footer');
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
            var footerElm;
            if (_.isString(footer)) {
                footerElm = React.DOM.span({
                    dangerouslySetInnerHTML : {
                        __html : footer
                    }
                });
            } else {
                footerElm = footer;
            }
            PopupPanel.openPopup({
                title : titleElm,
                body : bodyElm,
                footer : footerElm,
                onOpen : options.onOpen,
                onClose : options.onClose
            });
        });
    },
};
