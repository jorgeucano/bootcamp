import { Observable } from 'rxjs/Observable';
import * as utils from './utils';
export class FirebaseListObservable extends Observable {
    constructor(_ref, subscribe) {
        super(subscribe);
        this._ref = _ref;
    }
    lift(operator) {
        const observable = new FirebaseListObservable(this._ref);
        observable.source = this;
        observable.operator = operator;
        observable._ref = this._ref;
        return observable;
    }
    push(val) {
        if (!this._ref) {
            throw new Error('No ref specified for this Observable!');
        }
        this._ref.ref;
        return this._ref.ref.push(val);
    }
    update(item, value) {
        return this._checkOperationCases(item, {
            stringCase: () => this._ref.ref.child(item).update(value),
            firebaseCase: () => item.update(value),
            snapshotCase: () => item.ref.update(value),
            unwrappedSnapshotCase: () => this._ref.ref.child(item.$key).update(value)
        });
    }
    remove(item = null) {
        if (!item) {
            return this._ref.ref.remove();
        }
        return this._checkOperationCases(item, {
            stringCase: () => this._ref.ref.child(item).remove(),
            firebaseCase: () => item.remove(),
            snapshotCase: () => item.ref.remove(),
            unwrappedSnapshotCase: () => this._ref.ref.child(item.$key).remove()
        });
    }
    _checkOperationCases(item, cases) {
        if (utils.isString(item)) {
            return cases.stringCase();
        }
        else if (utils.isFirebaseRef(item)) {
            return cases.firebaseCase();
        }
        else if (utils.isFirebaseDataSnapshot(item)) {
            return cases.snapshotCase();
        }
        else if (utils.isAFUnwrappedSnapshot(item)) {
            return cases.unwrappedSnapshotCase();
        }
        throw new Error(`FirebaseListObservable.remove requires a key, snapshot, reference, or unwrapped snapshot. Got: ${typeof item}`);
    }
}
//# sourceMappingURL=firebase_list_observable.js.map