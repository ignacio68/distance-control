/*********************************************************************************************************************
* Common Types
*********************************************************************************************************************/
// TODO: Revisar y completar
interface MapboxGL {
  accessToken: string
  baseApiUrl: string
  workerCount?: number
  maxParallelImageRequests?: number
  supported?: boolean // TODO: Revisar object
  version: string | number
}

interface BoundingBox {
  minx: number
  miny: number
  maxx: number
  maxy: number
}
interface LngLat {
  lng: number
  lat: number
}

interface RoutablePoints {
  points: LngLat
}

interface Geometry {
  /**
   * Point, a GeoJSON type from the GeoJSON specification .
   */
  type: string
  /**
   * An array in the format [ longitude,latitude ] at the center of the specified  bbox .
   */
  coordinates: LngLat[]
  /**
   * A boolean value indicating if an  address is interpolated along a road network. This field is only present when the feature is interpolated.
   */
  interpolated?: boolean
  /**
   * A boolean value indicating an out-of-parity match
   */
  omitted?: boolean
}

/*********************************************************************************************************************
* Mapbox Geocoder Types
*********************************************************************************************************************/

type LocalGeocoder = (query: string[]) => []

type Filter = (item: string) => string

type FlyTo = {
  bearing: number
  speed: number
  curve: number
  easing?(): (t: any) => any
}

export interface MapboxGeocoderDefaultOptions {
  origin?: string
  mapboxgl?: MapboxGL
  zoom?: number
  flyTo?: boolean | FlyTo
  proximity?: Object
  trackProximity?: boolean
  clearAndBlurOnEsc?: boolean // TODO: UI
  clearOnBlur?: boolean // TODO: UI
  bbox?: BoundingBox[]
  countries?: string // TODO: Revisar
  types?: string // TODO: Revisar
  minLength?: number // TODO: UI
  limit?: number // TODO: UI
  language?: string // TODO: UI
  filter?(): Filter
  localGeocoder?: LocalGeocoder
  reverseGeocoder?: 'distance' | 'score'
  enableEventLogging?: boolean
  marker?: boolean | Object // TODO: Revisar Object
  getItemValue?(): any // TODO: UI
  mode?: string
  localGeocoderOnly?: boolean
}

export interface MapboxGeocoder extends MapboxGeocoderDefaultOptions {
  accessToken: string
  options: MapboxGeocoderDefaultOptions

}

export interface MapboxEventManagerOptions {
  accessToken: string
  origin: string
  endpoint?: string
  sessionID?: string
  userAgent?: string
  countries?: string[] // array?
  types?: string[] // array?
  bbox?: BoundingBox[]
  language?: string[] //array?
  limit?: any
  locale?: string
  enableEventLogging: boolean
  flushInterval?: number
  maxQueueSize?: number
  localGeocoder?: LocalGeocoder
  filter?: any
}

export interface MapboxEventManager extends MapboxEventManagerOptions {

}

export interface Payload {
  event: any
  created: any
  sessionIdentifier: string
  country: string
  userAgent: string
  language: string
  bbox: BoundingBox[]
  types: string[]
  endpoint: 'mapbox.places'
  // fuzzyMatch: search.fuzzy, //todo  --> add to plugin
  proximity: any // proximity,
  limit: string,
  // routing: search.routing, //todo --> add to plugin
  mapZoom: number
  keyboardLocale: string
  queryString?: string
  resultIndex?: any
  resultPlaceName?: string
  resultId?: string
  lastAction?: number
}

export interface KeyEvent {
  metaKey: number[]
  keyCode: number
  key: number
}

export interface MapboxGeocoderApi{

}

/*********************************************************************************************************************
* Carmen JSON Types
*********************************************************************************************************************/
interface Parents {
  id: string
  text: string
}

// interface FeatureCollection {
//   type: string
//   id: string
//   language?: string
//   place_name: string
//   place_type: string[]
//   bbox?: BoundingBox[]
//   address?: number | string
//   center: LngLat
//   geometry: Geometry
//   properties: any
//   context: Parents[]
//   routable_points?: [RoutablePoints]
// }

export interface CarmenGeoson {
  type: string
  query: string[]
  features: GeocodeFeature[]
}


/*********************************************************************************************************************
* Geocoder Types
*********************************************************************************************************************/
// export default function Geocoding(config: SdkConfig | MapiClient): GeocodeService
// export function geocoder(accessToken: string): Geocoder

// interface Geocoder {
//   getURL(): string;
//   setURL(url: string): any;
//   setID(id: string): any;
//   setTileJSON(tilejson: any): any;
//   queryURL(url: string): string;

//   /**
//    * Queries the geocoder with a query string, and returns its result, if any.
//    */
//   query(queryString: string, callback: Function): any;

//   /**
//    * Queries the geocoder with a location, and returns its result, if any.
//    */
//   reverseQuery(location: Coordinates, callback: Function): any;
// }
type GeocodeQueryType =
        | 'country'
        | 'region'
        | 'postcode'
        | 'district'
        | 'place'
        | 'locality'
        | 'neighborhood'
        | 'address'
        | 'poi'

export interface Geocoder {
  forwardGeocode(config: GeocodeRequest): any;
  reverseGeocode(config: GeocodeRequest): GeocodeResponse;
}

type GeocodeMode = | 'mapbox.places' | 'mapbox.places-permanent'

type ReverseMode = | 'distance' | 'score'

export interface GeocodeRequest {
  /**
   * A location. This will be a place name for forward geocoding or a coordinate pair (longitude, latitude) for reverse geocoding.
   */
  query: string | LngLat;
  /**
   * Either  mapbox.places for ephemeral geocoding, or  mapbox.places-permanent for storing results and batch geocoding.
   */
  // mode: GeocodeMode;
  // /**
  //  * Limit results to one or more countries. Options are ISO 3166 alpha 2 country codes
  //  */
  countries?: string[];
  /**
   * Bias local results based on a provided location. Options are  longitude,latitude coordinates.
   */
  proximity?: number[];
  /**
   * Filter results by one or more feature types
   */
  types?: GeocodeQueryType[];
  /**
   * Forward geocoding only. Return autocomplete results or not. Options are  true or  false and the default is  true .
   */
  autocomplete?: boolean;
  /**
   * Forward geocoding only. Limit results to a bounding box. Options are in the format  minX,minY,maxX,maxY .
   */
  bbox?: BoundingBox;
  /**
   * Limit the number of results returned. The default is  5 for forward geocoding and  1 for reverse geocoding.
   */
  limit?: number;
  /**
   * Specify the language to use for response text and, for forward geocoding, query result weighting.
   * Options are IETF language tags comprised of a mandatory ISO 639-1 language code and optionally one or more
   * IETF subtags for country or script.
   */
  language?: string[];
  /**
   * Decides how results are sorted in a reverse geocoding query if multiple results are requested using a limit other than 1.
   */
  reverseMode?: ReverseMode;
  /**
   * Specify whether to request additional metadata about the recommended navigation destination corresponding to the feature or not
   */
  routing?: boolean;
}

export interface GeocodeResponse {
  /**
   * "Feature Collection" , a GeoJSON type from the GeoJSON specification.
   */
  type: string;
  /**
   * An array of space and punctuation-separated strings from the original query.
   */
  query: string[];
  /**
   * An array of feature objects.
   */
  features: GeocodeFeature[];
  /**
   * A string attributing the results of the Mapbox Geocoding API to Mapbox and links to Mapbox's terms of service and data sources.
   */
  attribution: string;
}

interface GeocodeFeature {
  /**
   * A string feature id in the form  {type}.{id} where  {type} is the lowest hierarchy feature in the  place_type field.
   * The  {id} suffix of the feature id is unstable and may change within versions.
   */
  id: string;
  /**
   * "Feature" , a GeoJSON type from the GeoJSON specification.
   */
  type: string;
  /**
   * An array of feature types describing the feature. Options are  country ,  region ,  postcode ,  district ,  place , locality ,  neighborhood ,
   * address ,  poi , and  poi.landmark . Most features have only one type, but if the feature has multiple types,
   * all applicable types will be listed in the array. (For example, Vatican City is a  country , region , and  place .)
   */
  place_type: string[];
  /**
   * A numerical score from 0 (least relevant) to 0.99 (most relevant) measuring how well each returned feature matches the query.
   * You can use the  relevance property to remove results that don't fully match the query.
   */
  relevance: number;
  /**
   * A string of the house number for the returned  address feature. Note that unlike the
   * address property for  poi features, this property is outside the  properties object.
   */
  address?: string;
  /**
   * An object describing the feature. The property object is unstable and only Carmen GeoJSON properties are guaranteed.
   * Your implementation should check for the presence of these values in a response before it attempts to use them.
   */
  properties: GeocodeProperties;
  /**
   * A string representing the feature in the requested language, if specified.
   */
  text: string;
  /**
   * A string representing the feature in the requested language, if specified, and its full result hierarchy.
   */
  place_name: string;
  /**
   * A string analogous to the  text field that more closely matches the query than results in the specified language.
   * For example, querying "Köln, Germany" with language set to English might return a feature with the
   * text "Cologne" and the  matching_text "Köln".
   */
  matching_text?: string;
  /**
   * A string analogous to the  place_name field that more closely matches the query than results in the specified language.
   * For example, querying "Köln, Germany" with language set to English might return a feature with the place_name "Cologne, Germany"
   * and a  matching_place_name of "Köln, North Rhine-Westphalia, Germany".
   */
  matching_place_name?: string;
  /**
   * A string of the IETF language tag of the query's primary language.
   * Can be used to identity text and place_name properties on this object
   * in the format text_{language}, place_name_{language} and language_{language}
   */
  language?: string;
  /**
   * An array bounding box in the form [ minX,minY,maxX,maxY ] .
   */
  bbox?: BoundingBox[]
  /**
   * An array in the form [ longitude,latitude ] at the center of the specified  bbox .
   */
  center: number[];
  /**
   * An object describing the spatial geometry of the returned feature
   */
  geometry: Geometry;
  /**
   * An array representing the hierarchy of encompassing parent features. Each parent feature may include any of the above properties
   */
  context: GeocodeFeature[];
  /**
   * An object with the routable points for the feature.
   */
  routable_points?: [RoutablePoints];
}

type GeocodeAccuracy =
  | 'rooftop'
  | 'parcel'
  | 'point'
  | 'interpolated'
  | 'intersection'
  | 'street'

interface GeocodeProperties extends GeocodeFeature {
  /**
   * A point accuracy metric for the returned address feature
   */
  accuracy?: GeocodeAccuracy
  /**
   * A string of the full street address for the returned poi feature
   */
  address?: string
  /**
   * A string of comma-separated categories for the returned  poi feature.
   */
  category?: string
  /**
   * The name of a suggested Maki icon to visualize a  poi feature based on its  category .
   */
  maki?: string;
  /**
   * A boolean value indicating whether a  poi feature is a landmark. Landmarks are
   * particularly notable or long-lived features like schools, parks, museums and places of worship.
   */
  landmark?: boolean;
  /**
   * The Wikidata identifier for the returned feature.
   */
  wikidata?: string
  /**
   * The ISO 3166-1 country and ISO 3166-2 region code for the returned feature.
   */
  short_code: string;
}
