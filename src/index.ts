import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import * as firebase from 'firebase';

import 'rxjs/add/observable/fromPromise'
import 'rxjs/add/operator/map'

/**
 * Sets the data at a provided location
 *
 * @param {String} path The location to update with the provided data
 * @param {} data The data to store at the provided location
 * @return {Observable} The return of the promise
 */
export function set$<T>(path: string, data: T): Observable<T> {
    return Observable
        .fromPromise(firebase.database().ref(path).set(data)).map(res => data)
}

/**
 * Gets data at the provided lcoation
 *
 * @param {String} path The location of the data
 * @param {T} defaultValue The default value to use if none can be found
 * @return {Observable} The Observable with the data at the provided path
 */
export function get$<T>(path: string, defaultValue?: T): Observable<T | null> {
    return Observable
        .fromPromise(firebase.database().ref(path).once('value'))
        .map(snapshot => snapshot.val())
        .map(val => isValid(val) ? val :
            isValid(defaultValue) ? defaultValue : null)
}

/**
 * Gets data by a query object
 *
 * @param {String} path The location of the parent data
 * @param {Function} query The function that receives a firebase reference as and returns a firebase query
 * @param {T} defaultValue The default value to use if none can be found
 * @return {Observable} The Observable with the data at the provided path
 */
export function getByQuery$<T>(path: string, query: (ref: firebase.database.Reference) => firebase.database.Query, defaultValue?: T): Observable<T | null> {
    return Observable
        .fromPromise(query(firebase.database().ref(path)).once('value'))
        .map(snapshot => snapshot.val())
        .map(val => isValid(val) ? val :
            isValid(defaultValue) ? defaultValue : null)
}

/**
 * Gets a map of children one of its child properties or path
 *
 * @param {String} path The location of the parent data
 * @param {String} property The child property to search
 * @param {String} value The value at that child property to match
 * @param {T} defaultValue The default value to use if none can be found
 * @return {Observable} The Observable with the data at the provided path
 */
export function getChildrenByPath$<T>(path: string, childPath: string, value: any, defaultValue?: T): Observable<T[] | null> {
    return Observable
        .fromPromise(firebase.database().ref(path).orderByChild(childPath).equalTo(value).once('value'))
        .map(snapshot => snapshot.val())
        .map(val => isValid(val) ? val :
            isValid(defaultValue) ? defaultValue : null)
}

/**
 * Gets data in a continuous stream of data. On unsubscription of this stream, the 'off' function is called
 * to stop retrieving data from the provided path's reference. Also, the stream is completed, effectively
 * closing the stream
 *
 * @param {String} path The location of the data
 * @return {Observable} The continuous Observable with the data at the provided path
 */
export function listen$<T>(path: string): Observable<T | null> {
    const ref = firebase.database().ref(path);
    const on$ = Observable.create((on$$: Observer<T | null>) => {
        ref.on('value', snapshot => {
            const value = !!snapshot ? snapshot.val() as T : null

            // Push next value
            on$$.next(value)
        }); 
        return () => {
            on$$.complete();
            ref.off();
        }
    });
    return on$;
}

function isValid(obj: any): boolean {
    return obj !== undefined && obj !== null;
} 
