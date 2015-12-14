var _ = require('underscore');
module.exports = [ {
    type : '',
    widgets : {
        'listItem' : require('./ListItem.jsx'),
        'listItemEmpty' : require('./ListItemEmpty.jsx'),
        'mapPopup' : require('./MapPopup.jsx'),
        'mapMarker' : require('./MapMarker'),
        'mapLayer' : require('./MapLayer'),
        // 'mapClusterMarker' : require('./MapClusterMarker'),
        'mapClusterOptions' : require('./MapClusterOptions')
    }
} ];
