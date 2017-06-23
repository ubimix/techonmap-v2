module.exports = {
    entry : "./app/js/index.js",
    output : {
        path : __dirname + '/app/dist',
        filename : "./mapapp.js",
        publicPath : 'dist/'
    },
    module : {
        loaders : [ {
            test : /\.less$/,
            loader : "style-loader!css-loader!less-loader"
        }, {
            test : /\.css$/,
            loader : "style-loader!css-loader"
        }, {
            test : /\.jsx$/,
            loader : "jsx-loader"
        }, {
            test : /react-typeahead.*$/,
            loader : "jsx-loader"
        }, {
            test : /\.(png|jpg|svg|woff|eot|ttf)/,
            loader : 'url-loader?limit=8192'
        } ]
    },
    resolve : {
        alias : {
            react : __dirname + '/node_modules/react',
            underscore : __dirname + '/node_modules/underscore/underscore',
            leaflet : __dirname + '/node_modules/leaflet/dist',
            'bootstrap-css-only' : __dirname
                    + '/node_modules/bootstrap/dist/css',
        }
    }
};
