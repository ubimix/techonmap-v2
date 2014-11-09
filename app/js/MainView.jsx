/** @jsx React.DOM */
var React = require('react');
var tmp = require('./module.jsx');


var MainView = React.createClass({
    render : function() {
        return <div>
            <h1>Hello, there!</h1>
            {tmp.sayHello()}
        </div>;
    }
});
module.exports = MainView;