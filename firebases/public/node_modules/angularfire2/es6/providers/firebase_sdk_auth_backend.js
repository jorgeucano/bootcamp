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
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { authDataToAuthState, AuthBackend, AuthProviders } from './auth_backend';
import { FirebaseApp } from '../tokens';
import { auth } from 'firebase';
const { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, TwitterAuthProvider } = auth;
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
export let FirebaseSdkAuthBackend = class FirebaseSdkAuthBackend extends AuthBackend {
    constructor(_fbApp, _webWorkerMode = false) {
        super();
        this._webWorkerMode = _webWorkerMode;
        this._fbAuth = _fbApp.auth();
    }
    createUser(creds) {
        return Promise.resolve(this._fbAuth.createUserWithEmailAndPassword(creds.email, creds.password))
            .then((user) => authDataToAuthState(user));
    }
    getAuth() {
        return authDataToAuthState(this._fbAuth.currentUser);
    }
    onAuth() {
        return Observable.create((observer) => {
            return this._fbAuth.onAuthStateChanged(observer);
        })
            .map((user) => {
            if (!user)
                return null;
            return authDataToAuthState(user);
        });
    }
    unauth() {
        Promise.resolve(this._fbAuth.signOut());
    }
    authWithCustomToken(token) {
        return Promise.resolve(this._fbAuth.signInWithCustomToken(token))
            .then((user) => authDataToAuthState(user));
    }
    authAnonymously() {
        return Promise.resolve(this._fbAuth.signInAnonymously())
            .then((user) => authDataToAuthState(user));
    }
    authWithPassword(creds) {
        return Promise.resolve(this._fbAuth.signInWithEmailAndPassword(creds.email, creds.password))
            .then((user) => authDataToAuthState(user));
    }
    authWithOAuthPopup(provider, options) {
        var providerFromFirebase = this._enumToAuthProvider(provider);
        if (options.scope) {
            options.scope.forEach(scope => providerFromFirebase.addScope(scope));
        }
        return Promise.resolve(this._fbAuth.signInWithPopup(providerFromFirebase));
    }
    authWithOAuthRedirect(provider, options) {
        return Promise.resolve(this._fbAuth.signInWithRedirect(this._enumToAuthProvider(provider)));
    }
    authWithOAuthToken(credential) {
        return Promise.resolve(this._fbAuth.signInWithCredential(credential))
            .then((user) => authDataToAuthState(user));
    }
    getRedirectResult() {
        return Observable.fromPromise(Promise.resolve(this._fbAuth.getRedirectResult()));
    }
    _enumToAuthProvider(providerId) {
        switch (providerId) {
            case AuthProviders.Github:
                return new GithubAuthProvider();
            case AuthProviders.Twitter:
                return new TwitterAuthProvider();
            case AuthProviders.Facebook:
                return new FacebookAuthProvider();
            case AuthProviders.Google:
                return new GoogleAuthProvider();
            default:
                throw new Error(`Unsupported firebase auth provider ${providerId}`);
        }
    }
};
FirebaseSdkAuthBackend = __decorate([
    Injectable(),
    __param(0, Inject(FirebaseApp)), 
    __metadata('design:paramtypes', [Object, Object])
], FirebaseSdkAuthBackend);
//# sourceMappingURL=firebase_sdk_auth_backend.js.map