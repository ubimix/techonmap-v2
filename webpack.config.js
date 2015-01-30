module.exports = {
    entry: "./app/js/index.js",
    output: {
        path: __dirname,
        filename: "./app/dist/mapapp.js"
    },
    module: {
        loaders: [
            { test: /\.(less|css)$/, loader: "style-loader!css-loader!less-loader" },
            { test : /\.jsx$/, loader : "jsx-loader" }, 
            { test: /\.(png|svg|woff|eot|ttf)/, loader: 'url-loader?limit=100000' }
        ]
    }, 
    resolve : {
        alias : {
            react : __dirname + '/node_modules/react',
            underscore : __dirname + '/node_modules/underscore/underscore',
            leaflet : __dirname + '/node_modules/leaflet/dist',
            'bootstrap-css-only' : __dirname + '/node_modules/bootstrap/dist/css'
        }
    }
};
