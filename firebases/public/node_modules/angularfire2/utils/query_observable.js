"use strict";
var Observable_1 = require('rxjs/Observable');
var ScalarObservable_1 = require('rxjs/observable/ScalarObservable');
var map_1 = require('rxjs/operator/map');
require('rxjs/add/operator/merge');
require('rxjs/add/operator/combineLatest');
(function (OrderByOptions) {
    OrderByOptions[OrderByOptions["Child"] = 0] = "Child";
    OrderByOptions[OrderByOptions["Key"] = 1] = "Key";
    OrderByOptions[OrderByOptions["Value"] = 2] = "Value";
    OrderByOptions[OrderByOptions["Priority"] = 3] = "Priority";
})(exports.OrderByOptions || (exports.OrderByOptions = {}));
var OrderByOptions = exports.OrderByOptions;
(function (LimitToOptions) {
    LimitToOptions[LimitToOptions["First"] = 0] = "First";
    LimitToOptions[LimitToOptions["Last"] = 1] = "Last";
})(exports.LimitToOptions || (exports.LimitToOptions = {}));
var LimitToOptions = exports.LimitToOptions;
(function (QueryOptions) {
    QueryOptions[QueryOptions["EqualTo"] = 0] = "EqualTo";
    QueryOptions[QueryOptions["StartAt"] = 1] = "StartAt";
    QueryOptions[QueryOptions["EndAt"] = 2] = "EndAt";
})(exports.QueryOptions || (exports.QueryOptions = {}));
var QueryOptions = exports.QueryOptions;
function observeQuery(query) {
    if (!isPresent(query)) {
        return new ScalarObservable_1.ScalarObservable(null);
    }
    return Observable_1.Observable.create(function (observer) {
        getOrderObservables(query)
            .combineLatest(getStartAtObservable(query), getEndAtObservable(query), getEqualToObservable(query), getLimitToObservables(query))
            .subscribe(function (_a) {
            var orderBy = _a[0], startAt = _a[1], endAt = _a[2], equalTo = _a[3], limitTo = _a[4];
            var serializedOrder = {};
            if (isPresent(orderBy) && isPresent(orderBy.value)) {
                switch (orderBy.key) {
                    case OrderByOptions.Key:
                        serializedOrder = { orderByKey: orderBy.value };
                        break;
                    case OrderByOptions.Priority:
                        serializedOrder = { orderByPriority: orderBy.value };
                        break;
                    case OrderByOptions.Value:
                        serializedOrder = { orderByValue: orderBy.value };
                        break;
                    case OrderByOptions.Child:
                        serializedOrder = { orderByChild: orderBy.value };
                        break;
                }
            }
            if (isPresent(limitTo) && isPresent(limitTo.value)) {
                switch (limitTo.key) {
                    case LimitToOptions.First:
                        serializedOrder.limitToFirst = limitTo.value;
                        break;
                    case LimitToOptions.Last: {
                        serializedOrder.limitToLast = limitTo.value;
                        break;
                    }
                }
            }
            if (isPresent(startAt)) {
                serializedOrder.startAt = startAt;
            }
            if (isPresent(endAt)) {
                serializedOrder.endAt = endAt;
            }
            if (isPresent(equalTo)) {
                serializedOrder.equalTo = equalTo;
            }
            observer.next(serializedOrder);
        });
    });
}
exports.observeQuery = observeQuery;
function getOrderObservables(query) {
    var observables = ['orderByChild', 'orderByKey', 'orderByValue', 'orderByPriority']
        .map(function (key, option) {
        return ({ key: key, option: option });
    })
        .filter(function (_a) {
        var key = _a.key, option = _a.option;
        return isPresent(query[key]);
    })
        .map(function (_a) {
        var key = _a.key, option = _a.option;
        return mapToOrderBySelection(query[key], option);
    });
    if (observables.length === 1) {
        return observables[0];
    }
    else if (observables.length > 1) {
        return observables[0].merge(observables.slice(1));
    }
    else {
        return new Observable_1.Observable(function (subscriber) {
            subscriber.next(null);
        });
    }
}
exports.getOrderObservables = getOrderObservables;
function getLimitToObservables(query) {
    var observables = ['limitToFirst', 'limitToLast']
        .map(function (key, option) { return ({ key: key, option: option }); })
        .filter(function (_a) {
        var key = _a.key, option = _a.option;
        return isPresent(query[key]);
    })
        .map(function (_a) {
        var key = _a.key, option = _a.option;
        return mapToLimitToSelection(query[key], option);
    });
    if (observables.length === 1) {
        return observables[0];
    }
    else if (observables.length > 1) {
        var mergedObs = observables[0].merge(observables.slice(1));
        return mergedObs;
    }
    else {
        return new Observable_1.Observable(function (subscriber) {
            subscriber.next(null);
        });
    }
}
exports.getLimitToObservables = getLimitToObservables;
function getStartAtObservable(query) {
    if (query.startAt instanceof Observable_1.Observable) {
        return query.startAt;
    }
    else if (typeof query.startAt !== 'undefined') {
        return new Observable_1.Observable(function (subscriber) {
            subscriber.next(query.startAt);
        });
    }
    else {
        return new Observable_1.Observable(function (subscriber) {
            subscriber.next(null);
        });
    }
}
exports.getStartAtObservable = getStartAtObservable;
function getEndAtObservable(query) {
    if (query.endAt instanceof Observable_1.Observable) {
        return query.endAt;
    }
    else if (typeof query.endAt !== 'undefined') {
        return new Observable_1.Observable(function (subscriber) {
            subscriber.next(query.endAt);
        });
    }
    else {
        return new Observable_1.Observable(function (subscriber) {
            subscriber.next(null);
        });
    }
}
exports.getEndAtObservable = getEndAtObservable;
function getEqualToObservable(query) {
    if (query.equalTo instanceof Observable_1.Observable) {
        return query.equalTo;
    }
    else if (typeof query.equalTo !== 'undefined') {
        return new Observable_1.Observable(function (subscriber) {
            subscriber.next(query.equalTo);
        });
    }
    else {
        return new Observable_1.Observable(function (subscriber) {
            subscriber.next(null);
        });
    }
}
exports.getEqualToObservable = getEqualToObservable;
function mapToOrderBySelection(value, key) {
    if (value instanceof Observable_1.Observable) {
        return map_1.map
            .call(value, function (value) {
            return ({ value: value, key: key });
        });
    }
    else {
        return new Observable_1.Observable(function (subscriber) {
            subscriber.next({ key: key, value: value });
        });
    }
}
function mapToLimitToSelection(value, key) {
    if (value instanceof Observable_1.Observable) {
        return map_1.map
            .call(value, function (value) { return ({ value: value, key: key }); });
    }
    else {
        return new Observable_1.Observable(function (subscriber) {
            subscriber.next({ key: key, value: value });
        });
    }
}
function hasObservableProperties(query) {
    if (query.orderByKey instanceof Observable_1.Observable)
        return true;
    return false;
}
function isPresent(val) {
    return val !== undefined && val !== null;
}
//# sourceMappingURL=query_observable.js.map