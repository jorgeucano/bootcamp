import { Provider } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/skip';
import 'rxjs/add/observable/of';
import { AuthBackend, EmailPasswordCredentials, AuthConfiguration, FirebaseAuthState } from './auth_backend';
export declare const firebaseAuthConfig: (config: AuthConfiguration) => Provider;
export declare class AngularFireAuth extends ReplaySubject<FirebaseAuthState> {
    private _authBackend;
    private _config;
    private _credentialCache;
    constructor(_authBackend: AuthBackend, _config?: AuthConfiguration);
    login(config?: AuthConfiguration): firebase.Promise<FirebaseAuthState>;
    login(credentials?: EmailPasswordCredentials | firebase.auth.AuthCredential | string): firebase.Promise<FirebaseAuthState>;
    login(credentials: EmailPasswordCredentials | firebase.auth.AuthCredential | string, config?: AuthConfiguration): firebase.Promise<FirebaseAuthState>;
    logout(): void;
    getAuth(): FirebaseAuthState;
    createUser(credentials: EmailPasswordCredentials): firebase.Promise<FirebaseAuthState>;
    private _mergeConfigs(config);
    private _reject(msg);
    private _scrubConfig(config, scrubProvider?);
    private _emitAuthData(authData);
}
export declare class FirebaseAuth extends AngularFireAuth {
}
