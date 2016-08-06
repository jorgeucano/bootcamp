import { Provider } from '@angular/core';
import { AngularFireAuth, firebaseAuthConfig, FirebaseAuth } from './providers/auth';
import { FirebaseListObservable } from './utils/firebase_list_observable';
import { FirebaseObjectObservable } from './utils/firebase_object_observable';
import { FirebaseListFactory, FirebaseListFactoryOpts } from './utils/firebase_list_factory';
import { FirebaseObjectFactoryOpts, FirebaseObjectFactory } from './utils/firebase_object_factory';
import { FirebaseAppConfig } from './interfaces';
import { AuthMethods, AuthProviders, FirebaseAuthState } from './providers/auth_backend';
import { FirebaseDatabase } from './database/database';
export declare class AngularFire {
    private fbUrl;
    auth: AngularFireAuth;
    database: FirebaseDatabase;
    list: (url: string, opts?: FirebaseListFactoryOpts) => FirebaseListObservable<any[]>;
    object: (url: string, opts?: FirebaseObjectFactoryOpts) => FirebaseObjectObservable<any>;
    constructor(fbUrl: string, auth: AngularFireAuth, database: FirebaseDatabase);
}
export declare const COMMON_PROVIDERS: any[];
export declare const FIREBASE_PROVIDERS: any[];
export declare const defaultFirebase: (config: FirebaseAppConfig) => Provider;
export { AngularFireAuth, FirebaseAuth, FirebaseDatabase, FirebaseListObservable, FirebaseObjectObservable, FirebaseListFactory, FirebaseObjectFactory, firebaseAuthConfig, FirebaseAuthState, AuthMethods, AuthProviders };
export { FirebaseConfig, FirebaseApp, FirebaseAuthConfig, FirebaseRef, FirebaseUrl } from './tokens';
export { FirebaseAppConfig } from './interfaces';
declare var _default: {
    providers: any[];
};
export default _default;
