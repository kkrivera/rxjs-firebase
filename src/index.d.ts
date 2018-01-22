import { Observable } from 'rxjs/Observable';

declare namespace rxfirebase {
  interface RxFirebase {
    /**
     * Sets the data at a provided location
     *
     * @param {String} path The location to update with the provided data
     * @param {} data The data to store at the provided location
     * @return {Observable} The return of the promise
     */
    set$: <T>(path: string, data: T) => Observable<T>

    /**
     * Gets data at the provided lcoation
     *
     * @param {String} path The location of the data
     * @param {T} defaultValue The default value to use if none can be found
     * @return {Observable} The Observable with the data at the provided path
     */
    get$: <T>(path: string, defaultValue?: T) => Observable<T>

    /**
     * Gets data by a query object
     *
     * @param {String} path The location of the parent data
     * @param {Function} query The function that receives a firebase reference as and returns a firebase query
     * @param {T} defaultValue The default value to use if none can be found
     * @return {Observable} The Observable with the data at the provided path
     */
    getByQuery$: <T>(path: string, query: (ref: firebase.database.Reference) => firebase.database.Query, defaultValue?: T) => Observable<T>

    /**
     * Gets a single child based of one of its child properties or path
     *
     * @param {String} path The location of the parent data
     * @param {String} property The child property to search
     * @param {String} value The value at that child property to match
     * @param {T} defaultValue The default value to use if none can be found
     * @return {Observable} The Observable with the data at the provided path
     */
    getChildByPath$: <T>(path: string, childPath: string, value: any, defaultValue?: T) => Observable<T>

    /**
     * Gets a map of children one of its child properties or path
     *
     * @param {String} path The location of the parent data
     * @param {String} property The child property to search
     * @param {String} value The value at that child property to match
     * @param {T} defaultValue The default value to use if none can be found
     * @return {Observable} The Observable with the data at the provided path
     */
    getChildrenByPath$: <T>(path: string, childPath: string, value: any, defaultValue?: T) => Observable<T>

    /**
     * Gets data in a continuous stream of data. On unsubscription of this stream, the 'off' function is called
     * to stop retrieving data from the provided path's reference. Also, the stream is completed, effectively
     * closing the stream
     *
     * @param {String} path The location of the data
     * @return {Observable} The continuous Observable with the data at the provided path
     */
    listen$: <T>(path: string) => Observable<T>
  }
}