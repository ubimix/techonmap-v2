var _ = require('underscore');
module.exports = [ {
    type : '',
    widgets : {
        'listItem' : require('./ListItem.jsx'),
        'mapPopup' : require('./MapPopup.jsx'),
        'mapMarker' : require('./MapMarker'),
        // 'mapClusterMarker' : require('./MapClusterMarker'),
        'mapClusterOptions' : require('./MapClusterOptions')
    }
} ];
