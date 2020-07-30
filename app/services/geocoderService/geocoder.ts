const mbxClient = require('@mapbox/mapbox-sdk');
const mbxGeocoder = require('@mapbox/mapbox-sdk/services/geocoding')
import { Geocoder, GeocodeRequest, GeocodeResponse } from './types'
// import { MapboxEventManager } from './events'

// const baseClient = (accessToken: string) => mbxClient({ accessToken: accessToken})
// const geocoderService: Geocoder = mbxGeocoder(baseClient)
// const forwardGeocoding = (config: GeocodeRequest): any => geocoderService.forwardGeocode({
//   query: config.query
// })
//   .send()
//   .then(response => console.dir(response))

export const geocoder = (accessToken: string, config: GeocodeRequest) => {
  const baseClient = (accessToken: string) => mbxClient({ accessToken: accessToken })
  const geocoderService: Geocoder = mbxGeocoder(baseClient)
  const forwardGeocoding = (config: GeocodeRequest): any => geocoderService.forwardGeocode({
    query: config.query
  })
    .send()
    .then(response => console.dir(response))
  return forwardGeocoding
}

// const geocode = (opts: GeocodeRequest) => {
//       // const _eventEmitter.emit('loading', { query: searchInput });
//       const options = opts
//       const inputString = options.query
//       // Possible config properties to pass to client
//       const keys = [
//         'bbox',
//         'limit',
//         'proximity',
//         'countries',
//         'types',
//         'language',
//         'reverseMode',
//         'mode'
//       ];

//       // Create config object
//       var config = keys.reduce(function(config, key) {
//         if (options[key]) {
//           // countries, types, and language need to be passed in as arrays to client
//           // https://github.com/mapbox/mapbox-sdk-js/blob/master/services/geocoding.js#L38-L47
//           ['countries', 'types', 'language'].indexOf(key) > -1
//             ? (config[key] = options[key].split(/[\s,]+/))
//             : (config[key] = options[key]);

//           if (key === 'proximity' && options[key] && typeof options[key].longitude === 'number' && typeof options[key].latitude === 'number') {
//             config[key] = [options[key].longitude, options[key].latitude]
//           }
//         }
//         return config;
//       }, {})

//       let request: any
//       if (options.localGeocoderOnly){
//         request = Promise.resolve();
//       }
//       // check if searchInput resembles coordinates, and if it does,
//       // make the request a reverseGeocode
//       else if (
//         options.reverseGeocode &&
//         /(-?\d+\.?\d*)[, ]+(-?\d+\.?\d*)[ ]*$/.test(searchInput)
//       ) {
//         // parse coordinates
//         const coords = searchInput.split(/[\s(,)?]+/).map(function(c) {
//           // return parseFloat(c, 10) //FIXME: Error!! only one argument
//           return parseFloat(c)
//         }).reverse();

//         // client only accepts one type for reverseGeocode, so
//         // use first config type if one, if not default to poi
//         config.types ? [config.types[0]] : ["poi"];
//         config = Object.assign(config, { query: coords, limit: 1 });

//         // drop proximity which may have been set by trackProximity since it's not supported by the reverseGeocoder
//         if ('proximity' in config) {
//           delete config.proximity;
//         }

//         request = geocoderService.reverseGeocode(config).send();
//       } else {
//         config = Object.assign(config, { query: searchInput });
//         request = geocoderService.forwardGeocode(config).send();
//       }

//       let localGeocoderRes = [];
//       if (options.localGeocoder) {
//         localGeocoderRes = options.localGeocoder(searchInput);
//         if (!localGeocoderRes) {
//           localGeocoderRes = [];
//         }
//       }

//       request.then(
//         response => {
//           let res = {}

//           if (!response){
//             res = {
//               type: 'FeatureCollection',
//               features: []
//             }
//           }else if (response.statusCode == '200') {
//             res = response.body;
//             res.request = response.request
//             res.headers = response.headers
//           }

//           res.config = config
//           if (this.fresh){
//             this.eventManager.start(this)
//             this.fresh = false
//           }
//           // supplement Mapbox Geocoding API results with locally populated results
//           res.features = res.features
//             ? localGeocoderRes.concat(res.features)
//             : localGeocoderRes

//           // apply results filter if provided
//           if (options.filter && res.features.length) {
//             res.features = res.features.filter(options.filter);
//           }

//           if (res.features.length) {
//              this._eventEmitter.emit('results', res);
//             this._typeahead.update(res.features);
//           } else {
//             this._typeahead.selected = null;
//             this._renderNoResults();
//             this._eventEmitter.emit('results', res);
//           }

//         }
//       );

//       request.catch(
//         error => {
//           console.log(`error: ${error}`)
//           return error
//         }
//       )
//      return request;
// }

/************************************************************************************************/


// var Typeahead = require('suggestions');
// var debounce = require('lodash.debounce');
// var extend = require('xtend');
// var EventEmitter = require('events').EventEmitter;
// var exceptions = require('./exceptions');
// var MapboxClient = require('@mapbox/mapbox-sdk');
// var mbxGeocoder = require('@mapbox/mapbox-sdk/services/geocoding');
// var MapboxEventManager = require('./events');
// var localization = require('./localization');
// var subtag = require('subtag');

// import { MapboxGeocoderDefaultOptions, MapboxGeocoder } from './types'

// /**
//  * A geocoder component using the [Mapbox Geocoding API](https://docs.mapbox.com/api/search/#geocoding)
//  * @class MapboxGeocoder
//  * @param {Object} options
//  * @param {String} options.accessToken Required.
//  * @param {String} [options.origin=https://api.mapbox.com] Use to set a custom API origin.
//  * @param {Object} [options.mapboxgl] A [mapbox-gl](https://github.com/mapbox/mapbox-gl-js) instance to use when creating [Markers](https://docs.mapbox.com/mapbox-gl-js/api/#marker). Required if `options.marker` is `true`.
//  * @param {Number} [options.zoom=16] On geocoded result what zoom level should the map animate to when a `bbox` isn't found in the response. If a `bbox` is found the map will fit to the `bbox`.
//  * @param {Boolean|Object} [options.flyTo=true] If `false`, animating the map to a selected result is disabled. If `true`, animating the map will use the default animation parameters. If an object, it will be passed as `options` to the map [`flyTo`](https://docs.mapbox.com/mapbox-gl-js/api/#map#flyto) or [`fitBounds`](https://docs.mapbox.com/mapbox-gl-js/api/#map#fitbounds) method providing control over the animation of the transition.
//  * @param {Object} [options.proximity] a proximity argument: this is
//  * a geographical point given as an object with `latitude` and `longitude`
//  * properties. Search results closer to this point will be given
//  * higher priority.
//  * @param {Boolean} [options.trackProximity=true] If `true`, the geocoder proximity will automatically update based on the map view.
//  * @param {Boolean} [options.collapsed=false] If `true`, the geocoder control will collapse until hovered or in focus.
//  * @param {Boolean} [options.clearAndBlurOnEsc=false] If `true`, the geocoder control will clear it's contents and blur when user presses the escape key.
//  * @param {Boolean} [options.clearOnBlur=false] If `true`, the geocoder control will clear its value when the input blurs.
//  * @param {Array} [options.bbox] a bounding box argument: this is
//  * a bounding box given as an array in the format `[minX, minY, maxX, maxY]`.
//  * Search results will be limited to the bounding box.
//  * @param {string} [options.countries] a comma separated list of country codes to
//  * limit results to specified country or countries.
//  * @param {string} [options.types] a comma seperated list of types that filter
//  * results to match those specified. See https://docs.mapbox.com/api/search/#data-types
//  * for available types.
//  * If reverseGeocode is enabled, you should specify one type. If you configure more than one type, the first type will be used.
//  * @param {Number} [options.minLength=2] Minimum number of characters to enter before results are shown.
//  * @param {Number} [options.limit=5] Maximum number of results to show.
//  * @param {string} [options.language] Specify the language to use for response text and query result weighting. Options are IETF language tags comprised of a mandatory ISO 639-1 language code and optionally one or more IETF subtags for country or script. More than one value can also be specified, separated by commas. Defaults to the browser's language settings.
//  * @param {Function} [options.filter] A function which accepts a Feature in the [Carmen GeoJSON](https://github.com/mapbox/carmen/blob/master/carmen-geojson.md) format to filter out results from the Geocoding API response before they are included in the suggestions list. Return `true` to keep the item, `false` otherwise.
//  * @param {Function} [options.localGeocoder] A function accepting the query string which performs local geocoding to supplement results from the Mapbox Geocoding API. Expected to return an Array of GeoJSON Features in the [Carmen GeoJSON](https://github.com/mapbox/carmen/blob/master/carmen-geojson.md) format.
//  * @param {distance|score} [options.reverseMode=distance] - Set the factors that are used to sort nearby results.
//  * @param {boolean} [options.reverseGeocode=false] If `true`, enable reverse geocoding mode. In reverse geocoding, search input is expected to be coordinates in the form `lat, lon`, with suggestions being the reverse geocodes.
//  * @param {Boolean} [options.enableEventLogging=true] Allow Mapbox to collect anonymous usage statistics from the plugin.
//  * @param {Boolean|Object} [options.marker=true]  If `true`, a [Marker](https://docs.mapbox.com/mapbox-gl-js/api/#marker) will be added to the map at the location of the user-selected result using a default set of Marker options.  If the value is an object, the marker will be constructed using these options. If `false`, no marker will be added to the map. Requires that `options.mapboxgl` also be set.
//  * @param {Function} [options.getItemValue] A function that specifies how the selected result should be rendered in the search bar. This function should accept a single [Carmen GeoJSON](https://github.com/mapbox/carmen/blob/master/carmen-geojson.md) object as input and return a string. HTML tags in the output string will not be rendered. Defaults to `(item) => item.place_name`.
//  * @param {String} [options.mode=mapbox.places] A string specifying the geocoding [endpoint](https://docs.mapbox.com/api/search/#endpoints) to query. Options are `mapbox.places` and `mapbox.places-permanent`. The `mapbox.places-permanent` mode requires an enterprise license for permanent geocodes.
//  * @param {Boolean} [options.localGeocoderOnly=false] If `true`, indicates that the `localGeocoder` results should be the only ones returned to the user. If `false`, indicates that the `localGeocoder` results should be combined with those from the Mapbox API with the `localGeocoder` results ranked higher.
//  * @example
//  * var geocoder = new MapboxGeocoder({ accessToken: mapboxgl.accessToken });
//  * map.addControl(geocoder);
//  * @return {MapboxGeocoder} `this`
//  *
//  */

// const setMapBoxGeocoderDefaultOptions = (): MapboxGeocoderDefaultOptions => {
//   const options: {
//     zoom: 16,
//     flyTo: true,
//     trackProximity: true,
//     minLength: 2,
//     reverseGeocode: false,
//     limit: 5,
//     origin: 'https://api.mapbox.com',
//     enableEventLogging: true,
//     marker: true,
//     mapboxgl: null,
//     collapsed: false,
//     clearAndBlurOnEsc: false,
//     clearOnBlur: false,
//     localGeocoderOnly: false,
//     // getItemValue: (item) => item.place_name,
//   }
//   return options
// }

// const MapboxGeocoder = (opts: MapboxGeocoder) => {
//   const _eventEmitter = new EventEmitter()
//   const defaultOptions = setMapBoxGeocoderDefaultOptions()
//   const options = Object.assign({}, defaultOptions, opts)
//   let inputString = ''
//   let fresh = true
//   let lastSelected = null
// }

// // TODO: Eliminar, el mapa se proporciona desde el propio componente MAp
// //returns the input elements, which are then added to the requested html container
// const onAdd = (map) => {
//     let _map: any // TODO: Revisar el tipo
//     if (map && typeof map != 'string'){
//       _map = map
//     }

//     // setLanguage() //FIXME: Proporcionar el language mediante un parámetro o una constante de locales

//   // TODO: Sustituir por una promesa
//     if (MapboxGeocoder.options.localGeocoderOnly){
//       const geocoderService = mbxGeocoder(
//         MapboxClient({
//           accessToken: options.accessToken,
//           origin: options.origin
//         })
//       )
//       return geocoderService
//     }

//     if (options.localGeocoderOnly && !options.localGeocoder){
//       throw new Error("A localGeocoder function must be specified to use localGeocoderOnly mode")
//   }


//     const eventManager = new MapboxEventManager(this.options);

//     // this._onChange = this._onChange.bind(this);
//     // this._onKeyDown = this._onKeyDown.bind(this);
//     // this._onPaste = this._onPaste.bind(this);
//     // this._onBlur = this._onBlur.bind(this);
//     // this._showButton = this._showButton.bind(this);
//     // this._hideButton = this._hideButton.bind(this);
//     // this._onQueryResult = this._onQueryResult.bind(this);
//     // this.clear = this.clear.bind(this);
//     // this._updateProximity = this._updateProximity.bind(this);
//     // this._clear = this._clear.bind(this);
//     // this._clearOnBlur = this._clearOnBlur.bind(this);

//     // Autocomplete
//     const _typeahead = new Typeahead(this._inputEl, [], {
//       filter: false,
//       minLength: this.options.minLength,
//       limit: this.options.limit
//     });

//     this._typeahead.getItemValue = this.options.getItemValue

//     let mapMarker = null
//     this._handleMarker = this._handleMarker.bind(this)
//     if (_map){
//       if (options.trackProximity ) {
//         _updateProximity()
//         _map.on('moveend', _updateProximity());
//       }
//       const _mapboxgl = options.mapboxgl
//       if (!_mapboxgl && options.marker) {
//         // eslint-disable-next-line no-console
//         console.error("No mapboxgl detected in options. Map markers are disabled. Please set options.mapboxgl.");
//         this.options.marker = false;
//       }
//     }
//     return el;
//   },

//   const onRemove = () => {
//     if (this.options.trackProximity && this._map) {
//       this._map.off('moveend', this._updateProximity);
//     }

//     _removeMarker()

//     this._map = null;

//     return this;
//   },

//   // TODO: Revisar -> eliminar
//   // _onPaste: function(e){
//   //   const value = (e.clipboardData || window.clipboardData).getData('text');
//   //   if (value.length >= this.options.minLength) {
//   //     this._geocode(value);
//   //   }
//   // }

//   // TODO: Revisar -> eliminar
//   // _onKeyDown: function(e) {
//   //   const ESC_KEY_CODE = 27
//   //   const TAB_KEY_CODE = 9

//   //   if (e.keyCode === ESC_KEY_CODE && this.options.clearAndBlurOnEsc) {
//   //     this._clear(e);
//   //     return this._inputEl.blur();
//   //   }

//   //   // if target has shadowRoot, then get the actual active element inside the shadowRoot
//   //   var target = e.target && e.target.shadowRoot
//   //     ? e.target.shadowRoot.activeElement
//   //     : e.target;
//   //   var value = target ? target.value : '';

//   //   if (!value) {
//   //     this.fresh = true;
//   //     // the user has removed all the text
//   //     if (e.keyCode !== TAB_KEY_CODE) this.clear(e);
//   //     return (this._clearEl.style.display = 'none');
//   //   }

//   //   // TAB, ESC, LEFT, RIGHT, ENTER, UP, DOWN
//   //   if ((e.metaKey || [TAB_KEY_CODE, ESC_KEY_CODE, 37, 39, 13, 38, 40].indexOf(e.keyCode) !== -1))
//   //     return;

//   //   if (target.value.length >= this.options.minLength) {
//   //     this._geocode(target.value);
//   //   }
//   // },

//   // TODO: Revisar -> eliminar
//   // _onBlur: function(e) {
//   //   if (this.options.clearOnBlur) {
//   //     this._clearOnBlur(e);
//   //   }
//   //   if (this.options.collapsed) {
//   //     this._collapse();
//   //   }
//   // },

//   const _onChange = () => {
//     const selected = this._typeahead.selected;
//     if (selected  && JSON.stringify(selected) !== this.lastSelected) {
//       this._clearEl.style.display = 'none';
//       if (this.options.flyTo) {
//         let flyOptions;
//         if (selected.properties && exceptions[selected.properties.short_code]) {
//           // Certain geocoder search results return (and therefore zoom to fit)
//           // an unexpectedly large bounding box: for example, both Russia and the
//           // USA span both sides of -180/180, or France includes the island of
//           // Reunion in the Indian Ocean. An incomplete list of these exceptions
//           // at ./exceptions.json provides "reasonable" bounding boxes as a
//           // short-term solution; this may be amended as necessary.
//           flyOptions = extend({}, this.options.flyTo);
//           if (this._map){
//             this._map.fitBounds(exceptions[selected.properties.short_code].bbox, flyOptions);
//           }
//         } else if (selected.bbox) {
//           var bbox = selected.bbox;
//           flyOptions = extend({}, this.options.flyTo);
//           if (this._map){
//             this._map.fitBounds([[bbox[0], bbox[1]], [bbox[2], bbox[3]]], flyOptions);
//           }
//         } else {
//           var defaultFlyOptions = {
//             zoom: this.options.zoom
//           }
//           flyOptions = extend({}, defaultFlyOptions, this.options.flyTo);
//           //  ensure that center is not overriden by custom options
//           flyOptions.center = selected.center;
//           if (this._map){
//             this._map.flyTo(flyOptions);
//           }
//         }
//       }
//       if (this.options.marker && this._mapboxgl){
//         this._handleMarker(selected);
//       }

//       // TODO: Revisar -> eliminar
//       // // After selecting a feature, re-focus the textarea and set
//       // // cursor at start.
//       // this._inputEl.focus();
//       // this._inputEl.scrollLeft = 0;
//       // this._inputEl.setSelectionRange(0, 0);
//       // this.lastSelected = JSON.stringify(selected);
//       // this._eventEmitter.emit('result', { result: selected });
//       // this.eventManager.select(selected, this);
//     }
//   },

//   const _geocode = (searchInput) => {
//     this._eventEmitter.emit('loading', { query: searchInput });
//     this.inputString = searchInput;
//     // Possible config proprerties to pass to client
//     var keys = [
//       'bbox',
//       'limit',
//       'proximity',
//       'countries',
//       'types',
//       'language',
//       'reverseMode',
//       'mode'
//     ];
//     var self = this;
//     // Create config object
//     var config = keys.reduce(function(config, key) {
//       if (self.options[key]) {
//         // countries, types, and language need to be passed in as arrays to client
//         // https://github.com/mapbox/mapbox-sdk-js/blob/master/services/geocoding.js#L38-L47
//         ['countries', 'types', 'language'].indexOf(key) > -1
//           ? (config[key] = self.options[key].split(/[\s,]+/))
//           : (config[key] = self.options[key]);

//         if (key === 'proximity' && self.options[key] && typeof self.options[key].longitude === 'number' && typeof self.options[key].latitude === 'number') {
//           config[key] = [self.options[key].longitude, self.options[key].latitude]
//         }
//       }
//       return config;
//     }, {});

//     let request
//     if (this.options.localGeocoderOnly){
//       request = Promise.resolve();
//     }
//     // check if searchInput resembles coordinates, and if it does,
//     // make the request a reverseGeocode
//     else if (
//       this.options.reverseGeocode &&
//       /(-?\d+\.?\d*)[, ]+(-?\d+\.?\d*)[ ]*$/.test(searchInput)
//     ) {
//       // parse coordinates
//       var coords = searchInput.split(/[\s(,)?]+/).map(function(c) {
//         return parseFloat(c, 10);
//       }).reverse();

//       // client only accepts one type for reverseGeocode, so
//       // use first config type if one, if not default to poi
//       config.types ? [config.types[0]] : ["poi"];
//       config = extend(config, { query: coords, limit: 1 });

//       // drop proximity which may have been set by trackProximity since it's not supported by the reverseGeocoder
//       if ('proximity' in config) {
//         delete config.proximity;
//       }

//       request = this.geocoderService.reverseGeocode(config).send();
//     } else {
//       config = extend(config, { query: searchInput });
//       request = this.geocoderService.forwardGeocode(config).send();
//     }

//     let localGeocoderRes = [];
//     if (this.options.localGeocoder) {
//       localGeocoderRes = this.options.localGeocoder(searchInput);
//       if (!localGeocoderRes) {
//         localGeocoderRes = [];
//       }
//     }

//     request.then(
//       function(response) {
//         this._loadingEl.style.display = 'none';

//         var res = {};

//         if (!response){
//           res = {
//             type: 'FeatureCollection',
//             features: []
//           }
//         }else if (response.statusCode == '200') {
//           res = response.body;
//           res.request = response.request
//           res.headers = response.headers
//         }

//         res.config = config;
//         if (this.fresh){
//           this.eventManager.start(this);
//           this.fresh = false;
//         }
//         // supplement Mapbox Geocoding API results with locally populated results
//         res.features = res.features
//           ? localGeocoderRes.concat(res.features)
//           : localGeocoderRes;

//         // apply results filter if provided
//         if (this.options.filter && res.features.length) {
//           res.features = res.features.filter(this.options.filter);
//         }

//         if (res.features.length) {
//           this._clearEl.style.display = 'block';
//           this._eventEmitter.emit('results', res);
//           this._typeahead.update(res.features);
//         } else {
//           this._clearEl.style.display = 'none';
//           this._typeahead.selected = null;
//           this._renderNoResults();
//           this._eventEmitter.emit('results', res);
//         }

//       }.bind(this)
//     );

//     request.catch(
//       function(err) {
//         // in the event of an error in the Mapbox Geocoding API still display results from the localGeocoder
//         if (localGeocoderRes.length && this.options.localGeocoder) {
//           this._clearEl.style.display = 'block';
//           this._typeahead.update(localGeocoderRes);
//         } else {
//           this._clearEl.style.display = 'none';
//           this._typeahead.selected = null;
//           this._renderError();
//         }

//         this._eventEmitter.emit('results', { features: localGeocoderRes });
//         this._eventEmitter.emit('error', { error: err });
//       }.bind(this)
//     );

//     return request;
//   }

//   /**
//    * Shared logic for clearing input
//    * @param {Event} [ev] the event that triggered the clear, if available
//    * @private
//    *
//    */
//   const _clear = (ev: any): void => {
//     if (ev) ev.preventDefault();
//     this._inputEl.value = '';
//     this._typeahead.selected = null;
//     this._typeahead.clear();
//     _onChange();
//     this._clearEl.style.display = 'none';
//     _removeMarker();
//     this.lastSelected = null;
//     this._eventEmitter.emit('clear');
//     this.fresh = true;
//   }

//   /**
//    * Clear and then focus the input.
//    * @param {Event} [ev] the event that triggered the clear, if available
//    *
//    */
//   const clear = (ev): void => {
//     _clear(ev);
//     // this._inputEl.focus();
//   }

//   // TODO: Revisar -> eliminar
//   /**
//    * Clear the input, without refocusing it. Used to implement clearOnBlur
//    * constructor option.
//    * @param {Event} [ev] the blur event
//    * @private
//    */
//   const _clearOnBlur = (ev) => {
//     var ctx = this;

//     /*
//      * If relatedTarget is not found, assume user targeted the suggestions list.
//      * In that case, do not clear on blur. There are other edge cases where
//      * ev.relatedTarget could be null. Clicking on list always results in null
//      * relatedtarget because of upstream behavior in `suggestions`.
//      *
//      * The ideal solution would be to check if ev.relatedTarget is a child of
//      * the list. See issue #258 for details on why we can't do that yet.
//      */
//     if (ev.relatedTarget) {
//       ctx._clear(ev);
//     }
//   }

//   const _onQueryResult = (response) => {
//     const results = response.body;
//     if (!results.features.length) return;
//     const result = results.features[0];
//     this._typeahead.selected = result;
//     this._inputEl.value = result.place_name;
//     _onChange();
//   }

//   _updateProximity: function() {
//     // proximity is designed for local scale, if the user is looking at the whole world,
//     // it doesn't make sense to factor in the arbitrary centre of the map
//     if (!this._map){
//       return;
//     }
//     if (this._map.getZoom() > 9) {
//       var center = this._map.getCenter().wrap();
//       this.setProximity({ longitude: center.lng, latitude: center.lat });
//     } else {
//       this.setProximity(null);
//     }
//   }

//   /**
//    * Set & query the input
//    * @param {string} searchInput location name or other search input
//    * @returns {MapboxGeocoder} this
//    */
//   const query = (searchInput: string) => {
//     _geocode(searchInput).then(this._onQueryResult);
//     return this;
//   }

//   // TODO: Revisar y manejar con locales
//   const _renderError = () => {
//     const errorMessage = "There was an error reaching the server"
//     this._renderMessage(errorMessage);
//   }

//   // TODO: Revisar y manejar con locales
//   const _renderNoResults = () => {
//     const errorMessage = "No results found";
//     this._renderMessage(errorMessage);
//   }

//     // TODO: Revisar y manejar en el componente
//   const _renderMessage = (msg: string): void => {
//     this._typeahead.update([]);
//     this._typeahead.selected = null;
//     this._typeahead.clear();
//     this._typeahead.renderError(msg);
//   }

//   /**
//    * Set input
//    * @param {string} searchInput location name or other search input
//    * @returns {MapboxGeocoder} this
//    */
//   const setInput = (searchInput: string) => {
//     // Set input value to passed value and clear everything else.
//     this._inputEl.value = searchInput;
//     this._typeahead.selected = null;
//     this._typeahead.clear();
//     if (searchInput.length >= this.options.minLength) {
//       this._geocode(searchInput);
//     }
//     return this;
//   }

//   // TODO: Revisar
//   /**
//    * Set proximity
//    * @param {Object} proximity The new `options.proximity` value. This is a geographical point given as an object with `latitude` and `longitude` properties.
//    * @returns {MapboxGeocoder} this
//    */
//   const setProximity = (proximity: Object) => options.proximity = proximity;

//   // TODO: Revisar
//   /**
//    * Get proximity
//    * @returns {Object} The geocoder proximity
//    */
//   const getProximity = () => options.proximity;

//   // TODO: Revisar
//   /**
//    * Get the language to use in UI elements and when making search requests
//    * @returns {String} The language(s) used by the plugin, if any
//    */
// const getLanguage = (): string => options.language

//   // TODO: Revisar
//   /**
//    * Get the zoom level the map will move to when there is no bounding box on the selected result
//    * @returns {Number} the map zoom
//    */
//   const getZoom = (): number => options.zoom

//   // TODO: Revisar
//   /**
//    * Set the zoom level
//    * @param {Number} zoom The zoom level that the map should animate to when a `bbox` isn't found in the response. If a `bbox` is found the map will fit to the `bbox`.
//    * @returns {MapboxGeocoder} this
//    */
//   const setZoom = (zoom: number) => {
//     this.options.zoom = zoom;
//     return this;
//   }

//   /**
//    * Get the parameters used to fly to the selected response, if any
//    * @returns {Boolean|Object} The `flyTo` option
//    */
//   const getFlyTo = (): boolean | Object => options.flyTo

//   /**
//    * Set the flyTo options
//    * @param {Boolean|Object} flyTo If false, animating the map to a selected result is disabled. If true, animating the map will use the default animation parameters. If an object, it will be passed as `options` to the map [`flyTo`](https://docs.mapbox.com/mapbox-gl-js/api/#map#flyto) or [`fitBounds`](https://docs.mapbox.com/mapbox-gl-js/api/#map#fitbounds) method providing control over the animation of the transition.
//    */
//   const setFlyTo = (flyTo: boolean | Object) => {
//     this.options.flyTo = flyTo;
//     return this;
//   }

//   /**
//    * Get the bounding box used by the plugin
//    * @returns {Array<Number>} the bounding box, if any
//    */
//   const getBbox = (): [string] => options.bbox


//   /**
//    * Set the bounding box to limit search results to
//    * @param {Array<Number>} bbox a bounding box given as an array in the format [minX, minY, maxX, maxY].
//    * @returns {MapboxGeocoder} this
//    */
//   const setBbox = (bbox: [string]) => {
//     options.bbox = bbox;
//     return this;
//   }

//   /**
//    * Get a list of the countries to limit search results to
//    * @returns {String} a comma separated list of countries to limit to, if any
//    */
//   const getCountries = (): string => options.countries;

//   /**
//    * Set the countries to limit search results to
//    * @param {String} countries a comma separated list of countries to limit to
//    * @returns {MapboxGeocoder} this
//    */
//   const setCountries = (countries: string) => {
//     this.options.countries = countries;
//     return this;
//   }

//   /**
//    * Get a list of the types to limit search results to
//    * @returns {String} a comma separated list of types to limit to
//    */
//   const getTypes = (): string => options.types

//   /**
//    * Set the types to limit search results to
//    * @param {String} countries a comma separated list of types to limit to
//    * @returns {MapboxGeocoder} this
//    */
//   const setTypes = (types: string) => {
//     this.options.types = types;
//     return this;
//   }

//   /**
//    * Get the minimum number of characters typed to trigger results used in the plugin
//    * @returns {Number} The minimum length in characters before a search is triggered
//    */
//   const getMinLength = (): number => options.minLength

//   /**
//    * Set the minimum number of characters typed to trigger results used by the plugin
//    * @param {Number} minLength the minimum length in characters
//    * @returns {MapboxGeocoder} this
//    */
//   const setMinLength = (minLength: number) => {
//     this.options.minLength = minLength;
//     if (this._typeahead)  this._typeahead.minLength = minLength;
//     return this;
//   }

//   /**
//    * Get the limit value for the number of results to display used by the plugin
//    * @returns {Number} The limit value for the number of results to display used by the plugin
//    */
//   const getLimit = (): number => options.limit

//   /**
//    * Set the limit value for the number of results to display used by the plugin
//    * @param {Number} limit the number of search results to return
//    * @returns {MapboxGeocoder}
//    */
//   const setLimit = (limit: number) => {
//     this.options.limit = limit;
//     if (this._typeahead) this._typeahead.options.limit = limit;
//     return this;
//   }

//   /**
//    * Get the filter function used by the plugin
//    * @returns {Function} the filter function
//    */
// const getFilter = (): function => options.filter

//   /**
//    * Set the filter function used by the plugin.
//    * @param {Function} filter A function which accepts a Feature in the [Carmen GeoJSON](https://github.com/mapbox/carmen/blob/master/carmen-geojson.md) format to filter out results from the Geocoding API response before they are included in the suggestions list. Return `true` to keep the item, `false` otherwise.
//    * @returns {MapboxGeocoder} this
//    */
//   const setFilter = (filter: function) => {
//     this.options.filter = filter;
//     return this;
//   }

//   /**
//    * Set the geocoding endpoint used by the plugin.
//    * @param {Function} origin A function which accepts an HTTPS URL to specify the endpoint to query results from.
//    * @returns {MapboxGeocoder} this
//    */
//   const setOrigin = (origin: function) => {
//     options.origin = origin;
//     const geocoderService = mbxGeocoder(
//       MapboxClient({
//         accessToken: options.accessToken,
//         origin: options.origin
//       })
//     );
//     return this;
//   },

//   /**
//    * Get the geocoding endpoint the plugin is currently set to
//    * @returns {Function} the endpoint URL
//    */
//   const getOrigin = (): function => options.origin

//   /**
//    * Handle the placement of a result marking the selected result
//    * @private
//    * @param {Object} selected the selected geojson feature
//    * @returns {MapboxGeocoder} this
//    */
//   const _handleMarker = (selected) => {
//     // clean up any old marker that might be present
//     if (!this._map){
//       return;
//     }
//     _removeMarker()
//     const defaultMarkerOptions = {
//       color: '#4668F2' // TODO: Revisar
//     }
//     var markerOptions = extend({}, defaultMarkerOptions, this.options.marker)
//     this.mapMarker = new this._mapboxgl.Marker(markerOptions);
//     if (selected.center) {
//       this.mapMarker
//         .setLngLat(selected.center)
//         .addTo(this._map);
//     } else if (selected.geometry && selected.geometry.type && selected.geometry.type === 'Point' && selected.geometry.coordinates) {
//       this.mapMarker
//         .setLngLat(selected.geometry.coordinates)
//         .addTo(this._map);
//     }
//     return this;
//   }

//   /**
//    * Handle the removal of a result marker
//    * @private
//    */
//   const _removeMarker = () => { // TODO: tipar
//     if (mapMarker){
//       mapMarker.remove();
//       mapMarker = null;
//     }
//   }

//   /**
//    * Subscribe to events that happen within the plugin.
//    * @param {String} type name of event. Available events and the data passed into their respective event objects are:
//    *
//    * - __clear__ `Emitted when the input is cleared`
//    * - __loading__ `{ query } Emitted when the geocoder is looking up a query`
//    * - __results__ `{ results } Fired when the geocoder returns a response`
//    * - __result__ `{ result } Fired when input is set`
//    * - __error__ `{ error } Error as string`
//    * @param {Function} fn function that's called when the event is emitted.
//    * @returns {MapboxGeocoder} this;
//    */
//   const on = (type: string, fn: function) => {
//     this._eventEmitter.on(type, fn);
//     return this;
//   }

//   /**
//    * Remove an event
//    * @returns {MapboxGeocoder} this
//    * @param {String} type Event name.
//    * @param {Function} fn Function that should unsubscribe to the event emitted.
//    */
//   const off = (type: string, fn: function) {
//     this._eventEmitter.removeListener(type, fn);
//     this.eventManager.remove();
//     return this;
//   }

// module.exports = MapboxGeocoder;