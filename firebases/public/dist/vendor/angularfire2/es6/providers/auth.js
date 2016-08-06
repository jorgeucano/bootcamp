var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Inject, provide, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/skip';
import 'rxjs/add/observable/of';
import { FirebaseAuthConfig } from '../tokens';
import { isPresent } from '../utils/utils';
import { authDataToAuthState, AuthBackend, AuthMethods, stripProviderId } from './auth_backend';
const kBufferSize = 1;
export const firebaseAuthConfig = (config) => {
    return provide(FirebaseAuthConfig, {
        useValue: config
    });
};
export let AngularFireAuth = class AngularFireAuth extends ReplaySubject {
    constructor(_authBackend, _config) {
        super(kBufferSize);
        this._authBackend = _authBackend;
        this._config = _config;
        this._credentialCache = {};
        let firstPass = true;
        this._authBackend.onAuth()
            .mergeMap((authState) => {
            if (firstPass) {
                firstPass = false;
                return this._authBackend.getRedirectResult()
                    .map((userCredential) => {
                    if (userCredential && userCredential.credential) {
                        authState = attachCredentialToAuthState(authState, userCredential.credential, userCredential.credential.provider);
                        this._credentialCache[userCredential.credential.provider] = userCredential.credential;
                    }
                    return authState;
                });
            }
            return Observable.of(authState);
        })
            .subscribe((authData) => this._emitAuthData(authData));
    }
    login(obj1, obj2) {
        let config = null;
        let credentials = null;
        if (arguments.length > 2) {
            return this._reject('Login only accepts a maximum of two arguments.');
        }
        else if (arguments.length == 2) {
            credentials = obj1;
            config = obj2;
        }
        else if (arguments.length == 1) {
            if (obj1.password && obj1.email) {
                credentials = obj1;
                config = {};
            }
            else {
                config = obj1;
            }
        }
        config = this._mergeConfigs(config);
        if (!isPresent(config.method)) {
            return this._reject('You must provide a login method');
        }
        let providerMethods = [AuthMethods.Popup, AuthMethods.Redirect, AuthMethods.OAuthToken];
        if (providerMethods.indexOf(config.method) != -1) {
            if (!isPresent(config.provider)) {
                return this._reject('You must include a provider to use this auth method.');
            }
        }
        let credentialsMethods = [AuthMethods.Password, AuthMethods.OAuthToken, AuthMethods.CustomToken];
        if (credentialsMethods.indexOf(config.method) != -1) {
            if (!credentials) {
                return this._reject('You must include credentials to use this auth method.');
            }
        }
        switch (config.method) {
            case AuthMethods.Popup:
                return this._authBackend.authWithOAuthPopup(config.provider, this._scrubConfig(config))
                    .then((userCredential) => {
                    this._credentialCache[userCredential.credential.provider] = userCredential.credential;
                    return authDataToAuthState(userCredential.user, userCredential.credential);
                });
            case AuthMethods.Redirect:
                return this._authBackend.authWithOAuthRedirect(config.provider, this._scrubConfig(config));
            case AuthMethods.Anonymous:
                return this._authBackend.authAnonymously(this._scrubConfig(config));
            case AuthMethods.Password:
                return this._authBackend.authWithPassword(credentials);
            case AuthMethods.OAuthToken:
                return this._authBackend.authWithOAuthToken(credentials, this._scrubConfig(config));
            case AuthMethods.CustomToken:
                return this._authBackend.authWithCustomToken(credentials);
        }
    }
    logout() {
        this._authBackend.unauth();
    }
    getAuth() {
        console.warn(`WARNING: the getAuth() API has changed behavior since adding support for Firebase 3.
    This will return null for the initial value when the page loads, even if the user is actually logged in.
    Please observe the actual authState asynchronously by subscribing to the auth service: af.auth.subscribe().
    The getAuth method will be removed in future releases`);
        return this._authBackend.getAuth();
    }
    createUser(credentials) {
        return this._authBackend.createUser(credentials);
    }
    _mergeConfigs(config) {
        if (this._config == null)
            return config;
        return Object.assign({}, this._config, config);
    }
    _reject(msg) {
        return (new Promise((res, rej) => {
            return rej(msg);
        }));
    }
    _scrubConfig(config, scrubProvider = true) {
        let scrubbed = Object.assign({}, config);
        if (scrubProvider) {
            delete scrubbed.provider;
        }
        delete scrubbed.method;
        return scrubbed;
    }
    _emitAuthData(authData) {
        if (authData == null) {
            this.next(null);
        }
        else {
            if (authData.auth && authData.auth.providerData && authData.auth.providerData[0]) {
                let providerId = authData.auth.providerData[0].providerId;
                let providerCredential = this._credentialCache[providerId];
                if (providerCredential) {
                    authData = attachCredentialToAuthState(authData, providerCredential, providerId);
                }
            }
            this.next(authData);
        }
    }
};
AngularFireAuth = __decorate([
    Injectable(),
    __param(1, Optional()),
    __param(1, Inject(FirebaseAuthConfig)), 
    __metadata('design:paramtypes', [AuthBackend, Object])
], AngularFireAuth);
function attachCredentialToAuthState(authState, credential, providerId) {
    if (!authState)
        return authState;
    authState[stripProviderId(providerId)] = credential;
    return authState;
}
export class FirebaseAuth extends AngularFireAuth {
}
//# sourceMappingURL=auth.js.map