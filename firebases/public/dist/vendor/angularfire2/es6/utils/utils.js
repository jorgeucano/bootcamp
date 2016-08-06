export function isPresent(obj) {
    return obj !== undefined && obj !== null;
}
export function isString(value) {
    return typeof value === 'string';
}
export function isFirebaseRef(value) {
    return typeof value.set === 'function';
}
export function isFirebaseDataSnapshot(value) {
    return typeof value.exportVal === 'function';
}
export function isAFUnwrappedSnapshot(value) {
    return typeof value.$key === 'string';
}
export function isFirebaseQuery(value) {
    return typeof value.orderByChild === 'function';
}
export function isEmptyObject(obj) {
    if (!isPresent(obj)) {
        return false;
    }
    return Object.keys(obj).length === 0 && JSON.stringify(obj) === JSON.stringify({});
}
export function unwrapMapFn(snapshot) {
    var unwrapped = isPresent(snapshot.val()) ? snapshot.val() : { $value: null };
    if ((/string|number|boolean/).test(typeof unwrapped)) {
        unwrapped = {
            $value: unwrapped
        };
    }
    unwrapped.$key = snapshot.ref.key;
    return unwrapped;
}
export function checkForUrlOrFirebaseRef(urlOrRef, cases) {
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
export function stripTrailingSlash(value) {
    if (value.substring(value.length - 1, value.length) === '/') {
        return value.substring(0, value.length - 1);
    }
    else {
        return value;
    }
}
export function stripLeadingSlash(value) {
    if (value.substring(0, 1) === '/') {
        return value.substring(1, value.length);
    }
    else {
        return value;
    }
}
//# sourceMappingURL=utils.js.map