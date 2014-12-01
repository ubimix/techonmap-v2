module.exports = {
    entry: "./app/js/index.js",
    output: {
        path: __dirname,
        filename: "./app/dist/mapapp.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test : /\.jsx$/, loader : "jsx-loader" }, 
        ]
    }
};
