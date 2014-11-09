// techonmap
var L = require('leaflet');
var React = require('react');
var MainView = require('./MainView.jsx');

var mainView = new MainView({});
var element = document.querySelector('body');
React.render(mainView, element);
