var FS = require('fs');
var YAML = require('js-yaml/index.js');

var configStr = FS.readFileSync('./config.yaml', 'utf-8')
var props = YAML.load(configStr);

module.exports = props;
