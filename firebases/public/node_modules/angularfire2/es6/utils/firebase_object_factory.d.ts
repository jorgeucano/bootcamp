import { FirebaseObjectObservable } from './firebase_object_observable';
import 'rxjs/add/operator/mergeMap';
import { Query } from './query_observable';
export declare function FirebaseObjectFactory(absoluteUrlOrDbRef: string | firebase.database.Reference, {preserveSnapshot, query}?: FirebaseObjectFactoryOpts): FirebaseObjectObservable<any>;
export interface FirebaseObjectFactoryOpts {
    preserveSnapshot?: boolean;
    query?: Query;
}
