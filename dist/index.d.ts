import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
/**
 * Sets the data at a provided location
 *
 * @param {String} path The location to update with the provided data
 * @param {} data The data to store at the provided location
 * @return {Observable} The return of the promise
 */
export declare function set$<T>(path: string, data: T): Observable<T>;
/**
 * Gets data at the provided lcoation
 *
 * @param {String} path The location of the data
 * @param {T} defaultValue The default value to use if none can be found
 * @return {Observable} The Observable with the data at the provided path
 */
export declare function get$<T>(path: string, defaultValue?: T): Observable<T | null>;
/**
 * Gets data by a query object
 *
 * @param {String} path The location of the parent data
 * @param {Function} query The function that receives a firebase reference as and returns a firebase query
 * @param {T} defaultValue The default value to use if none can be found
 * @return {Observable} The Observable with the data at the provided path
 */
export declare function getByQuery$<T>(path: string, query: (ref: firebase.database.Reference) => firebase.database.Query, defaultValue?: T): Observable<T | null>;
/**
 * Gets a map of children one of its child properties or path
 *
 * @param {String} path The location of the parent data
 * @param {String} property The child property to search
 * @param {String} value The value at that child property to match
 * @param {T} defaultValue The default value to use if none can be found
 * @return {Observable} The Observable with the data at the provided path
 */
export declare function getChildrenByPath$<T>(path: string, childPath: string, value: any, defaultValue?: T): Observable<T[] | null>;
/**
 * Gets data in a continuous stream of data. On unsubscription of this stream, the 'off' function is called
 * to stop retrieving data from the provided path's reference. Also, the stream is completed, effectively
 * closing the stream
 *
 * @param {String} path The location of the data
 * @return {Observable} The continuous Observable with the data at the provided path
 */
export declare function listen$<T>(path: string): Observable<T | null>;
