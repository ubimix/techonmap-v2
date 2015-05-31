var _ = require('underscore');
var Mosaic = require('mosaic-commons');
var LunrWrapper = require('../app/js/tools/LunrWrapper');

var data = require('../data/data.json');
var index = new LunrWrapper();
var events = [ 'search:begin', 'search:end', 'indexing:begin',
        'indexing:configuration:begin', 'indexing:configuration:end',
        'indexing:resources:begin', 'indexing:resources:end', 'indexing:end' ];
_.each(events, function(eventType) {
    index.on(eventType, function() {
        console.log(' * ', eventType);
    });
});
var progress = function(info) {
    if (info.position % 100 === 0) {
        var percent = Math.round(100 * info.position / info.resources.length);
        console.log('   - ' + percent + '% - ' + info.position + ' / '
                + info.resources.length);
    }
}
index.on('indexing:resources:begin', progress);
index.on('indexing:resources:progress', progress);
index.on('indexing:resources:end', progress);

index.index(data.features);
Mosaic.P//
//
.then(function() {
    return showResults(index, 'ubimix');
}).then(function(results) {
    return showResults(index, 'societe information');
});

function showResults(index, query) {
    return index.search(query).then(function(results) {
        console.log('---------------------------------------------------');
        console.log('QUERY: ', query);
        console.log('RESULTS: ');
        _.each(results.resources, function(r) {
            var descr = r.properties.description;
            var maxLen = 80;
            if (descr.length > maxLen) {
                descr = descr.substring(0, maxLen - 3) + '...';
            }
            console.log('   - [' + r.id + '] ' + r.properties.name + ' - ', descr);
        })
    });
}
