import { Observable } from 'rxjs/Observable';
import { ScalarObservable } from 'rxjs/observable/ScalarObservable';
import { map } from 'rxjs/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/combineLatest';
export var OrderByOptions;
(function (OrderByOptions) {
    OrderByOptions[OrderByOptions["Child"] = 0] = "Child";
    OrderByOptions[OrderByOptions["Key"] = 1] = "Key";
    OrderByOptions[OrderByOptions["Value"] = 2] = "Value";
    OrderByOptions[OrderByOptions["Priority"] = 3] = "Priority";
})(OrderByOptions || (OrderByOptions = {}));
export var LimitToOptions;
(function (LimitToOptions) {
    LimitToOptions[LimitToOptions["First"] = 0] = "First";
    LimitToOptions[LimitToOptions["Last"] = 1] = "Last";
})(LimitToOptions || (LimitToOptions = {}));
export var QueryOptions;
(function (QueryOptions) {
    QueryOptions[QueryOptions["EqualTo"] = 0] = "EqualTo";
    QueryOptions[QueryOptions["StartAt"] = 1] = "StartAt";
    QueryOptions[QueryOptions["EndAt"] = 2] = "EndAt";
})(QueryOptions || (QueryOptions = {}));
export function observeQuery(query) {
    if (!isPresent(query)) {
        return new ScalarObservable(null);
    }
    return Observable.create((observer) => {
        getOrderObservables(query)
            .combineLatest(getStartAtObservable(query), getEndAtObservable(query), getEqualToObservable(query), getLimitToObservables(query))
            .subscribe(([orderBy, startAt, endAt, equalTo, limitTo]) => {
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
export function getOrderObservables(query) {
    var observables = ['orderByChild', 'orderByKey', 'orderByValue', 'orderByPriority']
        .map((key, option) => {
        return ({ key, option });
    })
        .filter(({ key, option }) => {
        return isPresent(query[key]);
    })
        .map(({ key, option }) => mapToOrderBySelection(query[key], option));
    if (observables.length === 1) {
        return observables[0];
    }
    else if (observables.length > 1) {
        return observables[0].merge(observables.slice(1));
    }
    else {
        return new Observable(subscriber => {
            subscriber.next(null);
        });
    }
}
export function getLimitToObservables(query) {
    var observables = ['limitToFirst', 'limitToLast']
        .map((key, option) => ({ key, option }))
        .filter(({ key, option }) => isPresent(query[key]))
        .map(({ key, option }) => mapToLimitToSelection(query[key], option));
    if (observables.length === 1) {
        return observables[0];
    }
    else if (observables.length > 1) {
        const mergedObs = observables[0].merge(observables.slice(1));
        return mergedObs;
    }
    else {
        return new Observable(subscriber => {
            subscriber.next(null);
        });
    }
}
export function getStartAtObservable(query) {
    if (query.startAt instanceof Observable) {
        return query.startAt;
    }
    else if (typeof query.startAt !== 'undefined') {
        return new Observable(subscriber => {
            subscriber.next(query.startAt);
        });
    }
    else {
        return new Observable(subscriber => {
            subscriber.next(null);
        });
    }
}
export function getEndAtObservable(query) {
    if (query.endAt instanceof Observable) {
        return query.endAt;
    }
    else if (typeof query.endAt !== 'undefined') {
        return new Observable(subscriber => {
            subscriber.next(query.endAt);
        });
    }
    else {
        return new Observable(subscriber => {
            subscriber.next(null);
        });
    }
}
export function getEqualToObservable(query) {
    if (query.equalTo instanceof Observable) {
        return query.equalTo;
    }
    else if (typeof query.equalTo !== 'undefined') {
        return new Observable(subscriber => {
            subscriber.next(query.equalTo);
        });
    }
    else {
        return new Observable(subscriber => {
            subscriber.next(null);
        });
    }
}
function mapToOrderBySelection(value, key) {
    if (value instanceof Observable) {
        return map
            .call(value, (value) => {
            return ({ value, key });
        });
    }
    else {
        return new Observable(subscriber => {
            subscriber.next({ key, value });
        });
    }
}
function mapToLimitToSelection(value, key) {
    if (value instanceof Observable) {
        return map
            .call(value, (value) => ({ value, key }));
    }
    else {
        return new Observable(subscriber => {
            subscriber.next({ key, value });
        });
    }
}
function hasObservableProperties(query) {
    if (query.orderByKey instanceof Observable)
        return true;
    return false;
}
function isPresent(val) {
    return val !== undefined && val !== null;
}
//# sourceMappingURL=query_observable.js.map