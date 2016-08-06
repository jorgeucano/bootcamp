import { Observable } from 'rxjs/Observable';
export class FirebaseObjectObservable extends Observable {
    constructor(subscribe, _ref) {
        super(subscribe);
        this._ref = _ref;
    }
    lift(operator) {
        const observable = new FirebaseObjectObservable();
        observable.source = this;
        observable.operator = operator;
        observable._ref = this._ref;
        return observable;
    }
    set(value) {
        if (!this._ref) {
            throw new Error('No ref specified for this Observable!');
        }
        return this._ref.set(value);
    }
    update(value) {
        if (!this._ref) {
            throw new Error('No ref specified for this Observable!');
        }
        return this._ref.update(value);
    }
    remove() {
        if (!this._ref) {
            throw new Error('No ref specified for this Observable!');
        }
        return this._ref.remove();
    }
}
//# sourceMappingURL=firebase_object_observable.js.map