// import { nanoid } from 'nanoid'
// import {
//   MapboxEventManagerOptions,
//   Payload,
//   KeyEvent
// } from './types'

// /**
//  * Set the options of mapbox event service
//  * @param {Object} options options with which to create the service
//  *  * @private
//  */
// const setMapboxEventManagerOptions = (options: MapboxEventManagerOptions): MapboxEventManagerOptions => {
//   const version = '0.2.0'
//   const attrs = options

//   attrs.origin = options.origin || 'https://api.mapbox.com'
//   attrs.endpoint = 'events/v2'
//   attrs.sessionID = generateSessionID()
//   attrs.userAgent = getUserAgent(version)

//   // parse global options to be sent with each request
//   attrs.countries = (options.countries) ? options.countries.split(",") : null
//   attrs.types = (options.types) ? options.types.split(",") : null
//   attrs.language = (options.language) ? options.language.split(",") : null
//   attrs.limit = (options.limit) ? +options.limit : null
//   attrs.locale = navigator.language || null
//   attrs.enableEventLogging = shouldEnableLogging(attrs)
//   attrs.flushInterval = options.flushInterval || 1000;
//   attrs.maxQueueSize = options.maxQueueSize || 100;

//   return attrs
// }
// /**
//  * Construct a new mapbox event client to send interaction events to the mapbox event service
//  * @param {Object} options options with which to create the service
//  * @param {String} options.accessToken the mapbox access token to make requests
//  * @param {Number} [options.flushInterval=1000] the number of ms after which to flush the event queue
//  * @param {Number} [options.maxQueueSize=100] the number of events to queue before flushing
//  * @private
//  */
// export const MapboxEventManager = (opts: MapboxEventManagerOptions) => {
//   let eventQueue = new Array()
//   let timer: any

//   // keep some state to deduplicate requests if necessary
//   let lastSentInput = ""
//   let lastSentIndex = 0

//   const options: MapboxEventManagerOptions = setMapboxEventManagerOptions(opts)

//   const send = send.bind(options.enableEventLogging)

//   setTimer(options.flushInterval)

//   /**
//    * Send a search.select event to the mapbox events service
//    * This event marks the array index of the item selected by the user out of the array of possible options
//    * @private
//    * @param {Object} selected the geojson feature selected by the user
//    * @param {Object} geocoder a mapbox-gl-geocoder instance
//    * @returns {Promise}
//    */
//   const select = (selected, geocoder) => {
//     const resultIndex = getSelectedIndex(selected, geocoder)

//     const payload = getEventPayload('search.select', geocoder, options)
//     payload.resultIndex = resultIndex
//     payload.resultPlaceName  = selected.place_name
//     payload.resultId = selected.id

//     // don't log duplicate events if the user re-selected the same feature on the same search
//     if ((resultIndex === lastSentIndex && payload.queryString === lastSentInput) || resultIndex == -1) return

//     lastSentIndex = resultIndex;
//     lastSentInput = payload.queryString;
//     if (!payload.queryString) return; // will be rejected
//     return this.push(payload)
//   }

//   /**
//      * Send a search-start event to the mapbox events service
//      * This turnstile event marks when a user starts a new search
//      * @private
//      * @param {Object} geocoder a mapbox-gl-geocoder instance
//      * @returns {Promise}
//      */
//   const start = (geocoder, options: MapboxEventManagerOptions) => {
//     const payload = getEventPayload('search.start', geocoder, options)
//     if (!payload.queryString) return; // will be rejected
//       return this.push(payload);
//   }

//   /**
//      * Send a search-keyevent event to the mapbox events service
//      * This event records each keypress in sequence
//      * @private
//      * @param {Object} keyEvent the keydown event to log
//      * @param {Object} geocoder a mapbox-gl-geocoder instance
//      *
//      */
//   const keyevent = (keyEvent: KeyEvent, geocoder) => {

//     //pass invalid event
//     if (!keyEvent.key) return;
//     // don't send events for keys that don't change the input
//     // TAB, ESC, LEFT, RIGHT, ENTER, UP, DOWN
//     if (keyEvent.metaKey || [9, 27, 37, 39, 13, 38, 40].indexOf(keyEvent.keyCode) !== -1) return;
//     var payload = getEventPayload('search.keystroke', geocoder);
//     payload.lastAction = keyEvent.key;
//     if (!payload.queryString) return; // will be rejected
//     return this.push(payload);
//   }

//     /**
//      * Flush any remaining events from the queue before it is removed
//      * @private
//      */
//   const remove = () => flush(MapboxEventManager.eventQueue)
// }

// const setTimer = (flushInterval: number): any => flushInterval ? setTimeout(this.flush.bind(this), flushInterval) : null;

// /**
//    * Send an event to the events service
//    *
//    * The event is skipped if the instance is not enabled to send logging events
//    *
//    * @private
//    * @param {Object} payload the http POST body of the event
//    * @param {Function} [callback] a callback function to invoke when the send has completed
//    * @returns {Promise}
//    */
// const send = (payload, callback) => {
//   if (!this.enableEventLogging) {
//       if (callback) return callback();
//       return;
//     }
//     var options = this.getRequestOptions(payload);
//     request(options, function(err){
//       if (err) return handleError(err, callback);
//       if (callback) {
//         return callback();
//       }
//     }.bind(this))
//   }

//   /**
//    * Get http request options
//    * @private
//    * @param {*} payload
//    */
//   const getRequestOptions = (payload) => {
//     if (!Array.isArray(payload)) payload = [payload];
//     var options = {
//       // events must be sent with POST
//       method: "POST",
//       host: this.origin,
//       path: this.endpoint +  "?access_token=" + this.access_token,
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body:JSON.stringify(payload) //events are arrays
//     }
//     return options
//   }

//    /**
//    * Wraps the request function for easier testing
//    * Make an http request and invoke a callback
//    * @private
//    * @param {Object} opts options describing the http request to be made
//    * @param {Function} callback the callback to invoke when the http request is completed
//    */
//   const request = (opts, callback) => {
//     let xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//       if (this.readyState == 4 ) {
//         if (this.status == 204){
//           //success
//           return callback(null);
//         }else {
//           return callback(this.statusText);
//         }
//       }
//     }

//     xhttp.open(opts.method, opts.host + '/' + opts.path, true);
//     for (var header in opts.headers){
//       var headerValue = opts.headers[header];
//       xhttp.setRequestHeader(header, headerValue)
//     }
//     xhttp.send(opts.body);
//   },

//   /**
//    * Handle an error that occurred while making a request
//    * @param {Object} err an error instance to log
//    * @private
//    */
//   const handleError = (err, callback)  => {
//     if (callback) return callback(err);
//   },

//   /**
//    * Flush out the event queue by sending events to the events service
//    * @private
//    */
//   const flush = (eventQueue) => {
//     if (eventQueue.length > 0){
//       this.send(eventQueue);
//       eventQueue = new Array();
//     }
//     // //reset the timer
//     if (MapboxEventManager.timer)  clearTimeout(MapboxEventManager.timer);
//     if (MapboxEventManager.flushInterval) MapboxEventManager.timer = setTimeout(this.flush.bind(this), MapboxEventManager.flushInterval)
//   }

//   /**
//    * Push event into the pending queue
//    * @param {Object} evt the event to send to the events service
//    * @param {Boolean} forceFlush indicates that the event queue should be flushed after adding this event regardless of size of the queue
//    * @private
//    */
//   const push = (evt, forceFlush) => {
//     this.eventQueue.push(evt);
//     if (this.eventQueue.length >= this.maxQueueSize || forceFlush){
//       this.flush();
//     }
//   }

// /**
//    * Get the event payload to send to the events service
//    * Most payload properties are shared across all events
//    * @private
//    * @param {String} event the name of the event to send to the events service. Valid options are 'search.start', 'search.select', 'search.feedback'.
//    * @param {Object} geocoder a mapbox-gl-geocoder instance
//    * @returns {Object} an event payload
//    */
// const getEventPayload = (event, geocoder, options?: MapboxEventManagerOptions) => {
//   let proximity
//   if (!geocoder.options.proximity) proximity = null
//   else proximity = [geocoder.options.proximity.longitude, geocoder.options.proximity.latitude];

//   const zoom = (geocoder._map) ? geocoder._map.getZoom() : undefined;
//   const payload: Payload = {
//       event: event,
//       created: +new Date(),
//       sessionIdentifier: options.sessionID,
//       country: String(options.countries), // TODO: Revisar
//       userAgent: options.userAgent,
//       language: String(options.language), // TODO: Revisar
//       bbox: options.bbox,
//       types: options.types,
//       endpoint: 'mapbox.places',
//       // fuzzyMatch: search.fuzzy, //todo  --> add to plugin
//       proximity: proximity,
//       limit: geocoder.options.limit,
//       // routing: search.routing, //todo --> add to plugin
//       mapZoom: zoom,
//       keyboardLocale: options.locale
//     }

//     // get the text in the search bar
//     if (event === "search.select"){
//       payload.queryString = geocoder.inputString;
//     }else if (event != "search.select" && geocoder._inputEl){
//       payload.queryString = geocoder._inputEl.value;
//     }else{
//       payload.queryString = geocoder.inputString;
//     }
//     return payload;
// }

// /**
//    * Get the 0-based numeric index of the item that the user selected out of the list of options
//    * @private
//    * @param {Object} selected the geojson feature selected by the user
//    * @param {Object} geocoder a Mapbox-GL-Geocoder instance
//    * @returns {Number} the index of the selected result
//    */
// const getSelectedIndex = (selected, geocoder) => {
//   if (!geocoder._typeahead) return

//   const results = geocoder._typeahead.data;
//   const selectedID = selected.id
//   const resultIDs = results.map(feature => feature.id)
//   const selectedIdx = resultIDs.indexOf(selectedID)

//   return selectedIdx
// }

// /**
//    * Generate a session ID to be returned with all of the searches made by this geocoder instance
//    * ID is random and cannot be tracked across sessions
//    * @private
//    */
// const generateSessionID = (): string => nanoid()

// /**
//    * Get a user agent string to send with the request to the events service
//    * @private
//    */
// const getUserAgent = (version: string): string => `mapbox-gl-geocoder. ${ version } . ${ navigator.userAgent }`


// /**
//      * Check whether events should be logged
//      * Clients using a localGeocoder or an origin other than mapbox should not have events logged
//      * @private
//      */
// const shouldEnableLogging = (options: MapboxEventManagerOptions): boolean => {
//   if (options.enableEventLogging === false) return false;
//   if (options.origin && options.origin.indexOf('api.mapbox.com') == -1) return false;
//   // hard to make sense of events when a local instance is suplementing results from origin
//   if (options.localGeocoder) return false;
//   // hard to make sense of events when a custom filter is in use
//   if (options.filter) return false;
//   return true;
// }

// export default MapboxEventManager