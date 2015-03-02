var _ = require('underscore');
var React = require('react');
var Mosaic = require('mosaic-commons');
var MosaicLeaflet = require('mosaic-core').Leaflet;
var L = require('leaflet');
var EsriGeoLocation = require('./EsriGeoLocation');

var GeolocationWidget = React.createClass({
    displayName : 'GeolocationWidget',

    componentWillMount : function(){
        this._geolocService = new EsriGeoLocation();
    },
    
    getInitialState : function(){
        return this._newState();
    },

    _copy : function(from, to){
        _.each(from, function(value, key) {
            var oldValue = to[key];
            if (_.isObject(value)) {
                if (!_.isObject(oldValue)) {
                    oldValue = to[key] = {};
                }
                this._copy(value, oldValue);
            } else {
                to[key] = value;
            }
        }, this);
    },
    
    _newState : function(options){
        options = options || {};
        var state = {};
        this._copy(this._getInfo(), state);
        this._copy(this.state, state);
        this._copy(options, state);
        return state;
    },

    _getInfo : function(){
        return this.props.info || {
            address : {
                name : 'properties.address',
                placeholder  : 'Address',
                value: ''
            },
            postcode: {
                name : 'properties.postcode',
                placeholder  : 'Postcode',
                value: ''
            },
            city : {
                name : 'properties.city',
                placeholder  : 'City',
                value: ''
            },
            latitude : {
                name: 'geometry.coordinates.0',
                type: 'hidden',
                value : ''
            },
            longitude : {
                name: 'geometry.coordinates.1',
                type: 'hidden',
                value : ''
            },
            localizeBtn : {
                label : 'Localize on the map',
                name : '',
                value : ''
            },
            map : {
                style : {width: '100%', height:'200px'}
            }
        };
    },
    
    _onChange : function(field, ev) {
        var options = {};
        options[field] = {
            value : ev.target.value
        };
        this.setState(this._newState(options));
    },
    
    componentDidUpdate : function(){
        this._focusMap();
    },
    
    _focusMap : function(){
        if (this._marker && this._map) {
            var latlng = this._getMarkerCoordinates();
            this._marker.setLatLng(latlng);
            var zoom = this.props.zoom || 15;
            this._map.setView(latlng, zoom);
        }
    },
    
    _getMarkerCoordinates : function(){
        var center = this.props.center || [0, 0];
        var lat = this.state.latitude.value || center[1];
        var lng = this.state.longitude.value || center[0];
        var result = L.latLng(lat, lng);
        return result; 
    },
    
    _onMapAdd : function(map){
        this._map = map;
        this._tiles = L.tileLayer(this.props.tilesUrl, {
            attribution : this.props.attribution,
            maxZoom : this.props.maxZoom || 18,
            minZoom : this.props.minZoom || 0
        });
        map.addLayer(this._tiles);

        var centerLatLng = this._getMarkerCoordinates();
        this._marker = L.circleMarker(centerLatLng, {
        });
        map.addLayer(this._marker);
        this._focusMap();
    },
    _onMapRemove : function(map){
        map.removeLayer(this._tiles);
        delete this._tiles;
        map.removeLayer(this._marker);
        delete this._marker;
        delete this._map;
    },
    
    render : function() {
        var addrInfo = this.state.address;
        var addressInput = <input type="text" className="form-control"
            name={addrInfo.name}
            ref="address"
            placeholder={addrInfo.placeholder}
            value={addrInfo.value}
            onChange={this._onChange.bind(this, 'address')} />;

        var postcodeInfo = this.state.postcode;
        var postcodeInput = <input type="text" className="form-control"
            name={postcodeInfo.name} 
            ref="postcode"
            placeholder={postcodeInfo.placeholder}
            value={postcodeInfo.value} 
            onChange={this._onChange.bind(this, 'postcode')} />;

        var cityInfo = this.state.city;
        var cityInput = <input type="text" className="form-control"
            name={cityInfo.name} 
            ref="city"
            placeholder={cityInfo.placeholder}
            value={cityInfo.value}
            onChange={this._onChange.bind(this, 'city')} />;

        var latitudeInfo = this.state.latitude;
        var latitudeInput = <input className="form-control"
            name={latitudeInfo.name}
            type={latitudeInfo.type||'text'}
            ref="latitude"
            key="latitude"
            placeholder={latitudeInfo.placeholder}
            value={latitudeInfo.value}
            onChange={this._onChange.bind(this, 'latitude')} />;

        var longitudeInfo = this.state.longitude;
        var longitudeInput = <input className="form-control"
            name={longitudeInfo.name}
            type={longitudeInfo.type||'text'}
            ref="longitude"
            key="longitude"
            placeholder={longitudeInfo.placeholder}
            value={longitudeInfo.value}
            onChange={this._onChange.bind(this, 'longitude')} />;

        function localizeAddress(ev){
            var addr = this.state.address.value;
            var postcode = this.state.postcode.value;
            var city = this.state.city.value;
            var array = [];
            if (addr) {array.push(addr);}
            if (postcode) {array.push(postcode);}
            if (city) {array.push(city);}
            array.push('France');
            
            var address = array.join(', ');
            var that = this;
            that._geolocService.geolocalize({
                address : address
            }).then(function(result) {
                var obj = result[0];
                that.setState(that._newState({
                    latitude  : {
                        value: obj.lat
                    },
                    longitude : {
                        value : obj.lng
                    }
                }));
            }, function(err) {
                that.setState(that._newState({
                    address : {
                        error: err
                    }
                }));
            });
            ev.preventDefault();
            ev.stopPropagation();
        }
        var localizeButton = (
            <button onClick={localizeAddress.bind(this)}
                className="btn btn-primary btn-xs">
                {this.state.localizeBtn.label}
            </button>
        );
            
        var mapView = (
            <MosaicLeaflet.ReactMap
                onMapAdd={this._onMapAdd}
                onMapRemove={this._onMapRemove}
                style={this.state.map.style}/>
        );
        return (
            <div>
                <div className="form-group">
                    <div className="col-sm-5">{addressInput}</div>
                    <div className="col-sm-3">{postcodeInput}</div>
                    <div className="col-sm-4">{cityInput}</div>
                </div>
                <div className="form-group">
                    <div className="col-sm-12">{localizeButton}</div>
                </div>
                <div className="form-group">
                    <div className="col-sm-6">{latitudeInput}</div>
                    <div className="col-sm-6">{longitudeInput}</div>
                </div>
                <div className="form-group">
                    <div className="col-sm-12">{mapView}</div>
                </div>
            </div>
        );
    }
});

module.exports = GeolocationWidget;