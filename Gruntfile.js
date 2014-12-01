var UmxGruntConfig = require('umx-grunt-config');
module.exports = function(grunt) {
    var configurator = new UmxGruntConfig(require, grunt);
    var options = {
        main : './app/js/index.js',
        files : [ './app/js/**/*.jsx', './app/js/**/*.js' ],
        dist : './app/dist',
        externals : [],
        lessPaths : [ './app/css/**/*.less', './app/css/**/*.css',
                './app/libs/**/*.css' ],
        lessFile : './app/css/index.less',
        watchTasks : [ 'less' ],

        // Webpack config
        debug : false,
        module : {
            loaders : [ {
                test : /\.jsx$/,
                loader : "jsx-loader"
            }, ]
        }
    }
    configurator.initBump(options);
    configurator.initWebpack(options);
    configurator.initWatch(options);
    configurator.initJshint(options);
    configurator.initMochaTest(options);
    configurator.initUglify(options);
    configurator.initLess(options);
    configurator.registerBumpTasks(options);
    grunt.initConfig(configurator.config);
    grunt.registerTask('test', [ 'build', 'mochaTest' ]);
    grunt.registerTask('build', [ 'webpack', 'less' ]);
    grunt.registerTask('build-min', [ 'build', 'uglify' ]);
    grunt.registerTask('commit', [ 'build-min', 'bump-commit' ]);
    grunt.registerTask('default', [ 'build-min' ]);
}
