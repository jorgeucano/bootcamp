"use strict";
function isPresent(obj) {
    return obj !== undefined && obj !== null;
}
exports.isPresent = isPresent;
function isString(value) {
    return typeof value === 'string';
}
exports.isString = isString;
function isFirebaseRef(value) {
    return typeof value.set === 'function';
}
exports.isFirebaseRef = isFirebaseRef;
function isFirebaseDataSnapshot(value) {
    return typeof value.exportVal === 'function';
}
exports.isFirebaseDataSnapshot = isFirebaseDataSnapshot;
function isAFUnwrappedSnapshot(value) {
    return typeof value.$key === 'string';
}
exports.isAFUnwrappedSnapshot = isAFUnwrappedSnapshot;
function isFirebaseQuery(value) {
    return typeof value.orderByChild === 'function';
}
exports.isFirebaseQuery = isFirebaseQuery;
function isEmptyObject(obj) {
    if (!isPresent(obj)) {
        return false;
    }
    return Object.keys(obj).length === 0 && JSON.stringify(obj) === JSON.stringify({});
}
exports.isEmptyObject = isEmptyObject;
function unwrapMapFn(snapshot) {
    var unwrapped = isPresent(snapshot.val()) ? snapshot.val() : { $value: null };
    if ((/string|number|boolean/).test(typeof unwrapped)) {
        unwrapped = {
            $value: unwrapped
        };
    }
    unwrapped.$key = snapshot.ref.key;
    return unwrapped;
}
exports.unwrapMapFn = unwrapMapFn;
function checkForUrlOrFirebaseRef(urlOrRef, cases) {
    if (isString(urlOrRef)) {
        return cases.isUrl();
    }
    if (isFirebaseRef(urlOrRef)) {
        return cases.isRef();
    }
    if (isFirebaseQuery(urlOrRef)) {
        return cases.isQuery();
    }
    throw new Error('Provide a url or a Firebase database reference');
}
exports.checkForUrlOrFirebaseRef = checkForUrlOrFirebaseRef;
function stripTrailingSlash(value) {
    if (value.substring(value.length - 1, value.length) === '/') {
        return value.substring(0, value.length - 1);
    }
    else {
        return value;
    }
}
exports.stripTrailingSlash = stripTrailingSlash;
function stripLeadingSlash(value) {
    if (value.substring(0, 1) === '/') {
        return value.substring(1, value.length);
    }
    else {
        return value;
    }
}
exports.stripLeadingSlash = stripLeadingSlash;
//# sourceMappingURL=utils.js.map