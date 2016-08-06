import { Observable } from 'rxjs/Observable';
import { Operator } from 'rxjs/Operator';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
export declare class FirebaseObjectObservable<T> extends Observable<T> {
    private _ref;
    constructor(subscribe?: <R>(subscriber: Subscriber<R>) => Subscription | Function | void, _ref?: firebase.database.Reference);
    lift<T, R>(operator: Operator<T, R>): Observable<R>;
    set(value: any): firebase.Promise<void>;
    update(value: Object): firebase.Promise<void>;
    remove(): firebase.Promise<void>;
}
