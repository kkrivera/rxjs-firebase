"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var firebase = require("firebase");
require("rxjs/add/observable/fromPromise");
require("rxjs/add/operator/map");
/**
 * Sets the data at a provided location
 *
 * @param {String} path The location to update with the provided data
 * @param {} data The data to store at the provided location
 * @return {Observable} The return of the promise
 */
function set$(path, data) {
    return Observable_1.Observable
        .fromPromise(firebase.database().ref(path).set(data)).map(function (res) { return data; });
}
exports.set$ = set$;
/**
 * Gets data at the provided lcoation
 *
 * @param {String} path The location of the data
 * @param {T} defaultValue The default value to use if none can be found
 * @return {Observable} The Observable with the data at the provided path
 */
function get$(path, defaultValue) {
    return Observable_1.Observable
        .fromPromise(firebase.database().ref(path).once('value'))
        .map(function (snapshot) { return snapshot.val(); })
        .map(function (val) { return isValid(val) ? val :
        isValid(defaultValue) ? defaultValue : null; });
}
exports.get$ = get$;
/**
 * Gets data by a query object
 *
 * @param {String} path The location of the parent data
 * @param {Function} query The function that receives a firebase reference as and returns a firebase query
 * @param {T} defaultValue The default value to use if none can be found
 * @return {Observable} The Observable with the data at the provided path
 */
function getByQuery$(path, query, defaultValue) {
    return Observable_1.Observable
        .fromPromise(query(firebase.database().ref(path)).once('value'))
        .map(function (snapshot) { return snapshot.val(); })
        .map(function (val) { return isValid(val) ? val :
        isValid(defaultValue) ? defaultValue : null; });
}
exports.getByQuery$ = getByQuery$;
/**
 * Gets a map of children one of its child properties or path
 *
 * @param {String} path The location of the parent data
 * @param {String} property The child property to search
 * @param {String} value The value at that child property to match
 * @param {T} defaultValue The default value to use if none can be found
 * @return {Observable} The Observable with the data at the provided path
 */
function getChildrenByPath$(path, childPath, value, defaultValue) {
    return Observable_1.Observable
        .fromPromise(firebase.database().ref(path).orderByChild(childPath).equalTo(value).once('value'))
        .map(function (snapshot) { return snapshot.val(); })
        .map(function (val) { return isValid(val) ? val :
        isValid(defaultValue) ? defaultValue : null; });
}
exports.getChildrenByPath$ = getChildrenByPath$;
/**
 * Gets data in a continuous stream of data. On unsubscription of this stream, the 'off' function is called
 * to stop retrieving data from the provided path's reference. Also, the stream is completed, effectively
 * closing the stream
 *
 * @param {String} path The location of the data
 * @return {Observable} The continuous Observable with the data at the provided path
 */
function listen$(path) {
    var ref = firebase.database().ref(path);
    var on$ = Observable_1.Observable.create(function (on$$) {
        ref.on('value', function (snapshot) {
            var value = !!snapshot ? snapshot.val() : null;
            // Push next value
            on$$.next(value);
        });
        return function () {
            on$$.complete();
            ref.off();
        };
    });
    return on$;
}
exports.listen$ = listen$;
function isValid(obj) {
    return obj !== undefined && obj !== null;
}
//# sourceMappingURL=index.js.map