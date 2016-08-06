import { FirebaseAppConfig } from '../angularfire2';
import { FirebaseListObservable } from '../utils/firebase_list_observable';
import { FirebaseObjectObservable } from '../utils/firebase_object_observable';
import { FirebaseListFactoryOpts } from '../utils/firebase_list_factory';
import { FirebaseObjectFactoryOpts } from '../utils/firebase_object_factory';
export declare class FirebaseDatabase {
    private fbConfig;
    constructor(fbConfig: FirebaseAppConfig);
    list(urlOrRef: string | firebase.database.Reference, opts?: FirebaseListFactoryOpts): FirebaseListObservable<any[]>;
    object(urlOrRef: string | firebase.database.Reference, opts?: FirebaseObjectFactoryOpts): FirebaseObjectObservable<any>;
}
