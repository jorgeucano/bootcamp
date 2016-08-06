import { FirebaseListObservable } from './firebase_list_observable';
import { database } from 'firebase';
import * as utils from './utils';
import { observeQuery } from './query_observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
export function FirebaseListFactory(absoluteUrlOrDbRef, { preserveSnapshot, query = {} } = {}) {
    let ref;
    utils.checkForUrlOrFirebaseRef(absoluteUrlOrDbRef, {
        isUrl: () => ref = database().refFromURL(absoluteUrlOrDbRef),
        isRef: () => ref = absoluteUrlOrDbRef,
        isQuery: () => ref = absoluteUrlOrDbRef,
    });
    if ((utils.isFirebaseRef(absoluteUrlOrDbRef) ||
        utils.isString(absoluteUrlOrDbRef)) &&
        utils.isEmptyObject(query)) {
        return firebaseListObservable(ref, { preserveSnapshot });
    }
    const queryObs = observeQuery(query);
    const listObs = queryObs
        .map(query => {
        let queried = ref;
        if (query.orderByChild) {
            queried = queried.orderByChild(query.orderByChild);
        }
        else if (query.orderByKey) {
            queried = queried.orderByKey();
        }
        else if (query.orderByPriority) {
            queried = queried.orderByPriority();
        }
        else if (query.orderByValue) {
            queried = queried.orderByValue();
        }
        if (utils.isPresent(query.equalTo)) {
            queried = queried.equalTo(query.equalTo);
            if (utils.isPresent(query.startAt) || query.endAt) {
                throw new Error('Query Error: Cannot use startAt or endAt with equalTo.');
            }
            if (utils.isPresent(query.limitToFirst)) {
                queried = queried.limitToFirst(query.limitToFirst);
            }
            if (utils.isPresent(query.limitToLast)) {
                queried = queried.limitToLast(query.limitToLast);
            }
            return queried;
        }
        if (utils.isPresent(query.startAt)) {
            queried = queried.startAt(query.startAt);
        }
        if (utils.isPresent(query.endAt)) {
            queried = queried.endAt(query.endAt);
        }
        if (utils.isPresent(query.limitToFirst) && query.limitToLast) {
            throw new Error('Query Error: Cannot use limitToFirst with limitToLast.');
        }
        if (utils.isPresent(query.limitToFirst)) {
            queried = queried.limitToFirst(query.limitToFirst);
        }
        if (utils.isPresent(query.limitToLast)) {
            queried = queried.limitToLast(query.limitToLast);
        }
        return queried;
    })
        .mergeMap((queryRef, ix) => {
        return firebaseListObservable(queryRef, { preserveSnapshot });
    });
    return listObs;
}
function firebaseListObservable(ref, { preserveSnapshot } = {}) {
    const listObs = new FirebaseListObservable(ref, (obs) => {
        let arr = [];
        let hasInitialLoad = false;
        ref.once('value', (snap) => {
            hasInitialLoad = true;
            obs.next(preserveSnapshot ? arr : arr.map(utils.unwrapMapFn));
        }).catch(err => {
            obs.error(err);
            obs.complete();
        });
        ref.on('child_added', (child, prevKey) => {
            arr = onChildAdded(arr, child, prevKey);
            if (hasInitialLoad) {
                obs.next(preserveSnapshot ? arr : arr.map(utils.unwrapMapFn));
            }
        }, err => {
            if (err) {
                obs.error(err);
                obs.complete();
            }
        });
        ref.on('child_removed', (child) => {
            arr = onChildRemoved(arr, child);
            if (hasInitialLoad) {
                obs.next(preserveSnapshot ? arr : arr.map(utils.unwrapMapFn));
            }
        }, err => {
            if (err) {
                obs.error(err);
                obs.complete();
            }
        });
        ref.on('child_changed', (child, prevKey) => {
            arr = onChildChanged(arr, child, prevKey);
            if (hasInitialLoad) {
                obs.next(preserveSnapshot ? arr : arr.map(utils.unwrapMapFn));
            }
        }, err => {
            if (err) {
                obs.error(err);
                obs.complete();
            }
        });
        return () => ref.off();
    });
    return listObs;
}
export function onChildAdded(arr, child, prevKey) {
    if (!arr.length) {
        return [child];
    }
    return arr.reduce((accumulator, curr, i) => {
        if (!prevKey && i === 0) {
            accumulator.push(child);
        }
        accumulator.push(curr);
        if (prevKey && prevKey === curr.key) {
            accumulator.push(child);
        }
        return accumulator;
    }, []);
}
export function onChildChanged(arr, child, prevKey) {
    return arr.reduce((accumulator, val, i) => {
        if (!prevKey && i == 0) {
            accumulator.push(child);
            if (val.key !== child.key) {
                accumulator.push(val);
            }
        }
        else if (val.key === prevKey) {
            accumulator.push(val);
            accumulator.push(child);
        }
        else if (val.key !== child.key) {
            accumulator.push(val);
        }
        return accumulator;
    }, []);
}
export function onChildRemoved(arr, child) {
    return arr.filter(c => c.key !== child.key);
}
export function onChildUpdated(arr, child, prevKey) {
    return arr.map((v, i, arr) => {
        if (!prevKey && !i) {
            return child;
        }
        else if (i > 0 && arr[i - 1].key === prevKey) {
            return child;
        }
        else {
            return v;
        }
    });
}
//# sourceMappingURL=firebase_list_factory.js.map