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
import { Inject, Injectable, provide } from '@angular/core';
import { AngularFireAuth, firebaseAuthConfig, FirebaseAuth } from './providers/auth';
import { initializeApp } from 'firebase';
import { FirebaseListObservable } from './utils/firebase_list_observable';
import { FirebaseObjectObservable } from './utils/firebase_object_observable';
import { FirebaseListFactory } from './utils/firebase_list_factory';
import { FirebaseObjectFactory } from './utils/firebase_object_factory';
import * as utils from './utils/utils';
import { FirebaseConfig, FirebaseApp } from './tokens';
import { AuthBackend, AuthMethods, AuthProviders } from './providers/auth_backend';
import { FirebaseSdkAuthBackend } from './providers/firebase_sdk_auth_backend';
import { FirebaseDatabase } from './database/database';
export let AngularFire = class AngularFire {
    constructor(fbUrl, auth, database) {
        this.fbUrl = fbUrl;
        this.auth = auth;
        this.database = database;
    }
};
AngularFire = __decorate([
    Injectable(),
    __param(0, Inject(FirebaseConfig)), 
    __metadata('design:paramtypes', [String, AngularFireAuth, FirebaseDatabase])
], AngularFire);
export const COMMON_PROVIDERS = [
    provide(FirebaseAuth, {
        useExisting: AngularFireAuth
    }),
    {
        provide: FirebaseApp,
        useFactory: _getFirebase,
        deps: [FirebaseConfig]
    },
    AngularFireAuth,
    AngularFire,
    FirebaseDatabase
];
function _getFirebase(config) {
    return initializeApp(config);
}
export const FIREBASE_PROVIDERS = [
    COMMON_PROVIDERS,
    {
        provide: AuthBackend,
        useFactory: _getAuthBackend,
        deps: [FirebaseApp]
    }
];
function _getAuthBackend(app) {
    return new FirebaseSdkAuthBackend(app, false);
}
export const defaultFirebase = (config) => {
    config.databaseURL = utils.stripTrailingSlash(config.databaseURL);
    return provide(FirebaseConfig, {
        useValue: config
    });
};
export { AngularFireAuth, FirebaseAuth, FirebaseDatabase, FirebaseListObservable, FirebaseObjectObservable, FirebaseListFactory, FirebaseObjectFactory, firebaseAuthConfig, AuthMethods, AuthProviders };
export { FirebaseConfig, FirebaseApp, FirebaseAuthConfig, FirebaseRef, FirebaseUrl } from './tokens';
export default {
    providers: FIREBASE_PROVIDERS
};
//# sourceMappingURL=angularfire2.js.map