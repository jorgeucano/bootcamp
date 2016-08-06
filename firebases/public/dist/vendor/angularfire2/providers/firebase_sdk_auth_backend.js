"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
var auth_backend_1 = require('./auth_backend');
var tokens_1 = require('../tokens');
var firebase_1 = require('firebase');
var FacebookAuthProvider = firebase_1.auth.FacebookAuthProvider, GithubAuthProvider = firebase_1.auth.GithubAuthProvider, GoogleAuthProvider = firebase_1.auth.GoogleAuthProvider, TwitterAuthProvider = firebase_1.auth.TwitterAuthProvider;
require('rxjs/add/operator/map');
require('rxjs/add/observable/fromPromise');
var FirebaseSdkAuthBackend = (function (_super) {
    __extends(FirebaseSdkAuthBackend, _super);
    function FirebaseSdkAuthBackend(_fbApp, _webWorkerMode) {
        if (_webWorkerMode === void 0) { _webWorkerMode = false; }
        _super.call(this);
        this._webWorkerMode = _webWorkerMode;
        this._fbAuth = _fbApp.auth();
    }
    FirebaseSdkAuthBackend.prototype.createUser = function (creds) {
        return Promise.resolve(this._fbAuth.createUserWithEmailAndPassword(creds.email, creds.password))
            .then(function (user) { return auth_backend_1.authDataToAuthState(user); });
    };
    FirebaseSdkAuthBackend.prototype.getAuth = function () {
        return auth_backend_1.authDataToAuthState(this._fbAuth.currentUser);
    };
    FirebaseSdkAuthBackend.prototype.onAuth = function () {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            return _this._fbAuth.onAuthStateChanged(observer);
        })
            .map(function (user) {
            if (!user)
                return null;
            return auth_backend_1.authDataToAuthState(user);
        });
    };
    FirebaseSdkAuthBackend.prototype.unauth = function () {
        Promise.resolve(this._fbAuth.signOut());
    };
    FirebaseSdkAuthBackend.prototype.authWithCustomToken = function (token) {
        return Promise.resolve(this._fbAuth.signInWithCustomToken(token))
            .then(function (user) { return auth_backend_1.authDataToAuthState(user); });
    };
    FirebaseSdkAuthBackend.prototype.authAnonymously = function () {
        return Promise.resolve(this._fbAuth.signInAnonymously())
            .then(function (user) { return auth_backend_1.authDataToAuthState(user); });
    };
    FirebaseSdkAuthBackend.prototype.authWithPassword = function (creds) {
        return Promise.resolve(this._fbAuth.signInWithEmailAndPassword(creds.email, creds.password))
            .then(function (user) { return auth_backend_1.authDataToAuthState(user); });
    };
    FirebaseSdkAuthBackend.prototype.authWithOAuthPopup = function (provider, options) {
        var providerFromFirebase = this._enumToAuthProvider(provider);
        if (options.scope) {
            options.scope.forEach(function (scope) { return providerFromFirebase.addScope(scope); });
        }
        return Promise.resolve(this._fbAuth.signInWithPopup(providerFromFirebase));
    };
    FirebaseSdkAuthBackend.prototype.authWithOAuthRedirect = function (provider, options) {
        return Promise.resolve(this._fbAuth.signInWithRedirect(this._enumToAuthProvider(provider)));
    };
    FirebaseSdkAuthBackend.prototype.authWithOAuthToken = function (credential) {
        return Promise.resolve(this._fbAuth.signInWithCredential(credential))
            .then(function (user) { return auth_backend_1.authDataToAuthState(user); });
    };
    FirebaseSdkAuthBackend.prototype.getRedirectResult = function () {
        return Observable_1.Observable.fromPromise(Promise.resolve(this._fbAuth.getRedirectResult()));
    };
    FirebaseSdkAuthBackend.prototype._enumToAuthProvider = function (providerId) {
        switch (providerId) {
            case auth_backend_1.AuthProviders.Github:
                return new GithubAuthProvider();
            case auth_backend_1.AuthProviders.Twitter:
                return new TwitterAuthProvider();
            case auth_backend_1.AuthProviders.Facebook:
                return new FacebookAuthProvider();
            case auth_backend_1.AuthProviders.Google:
                return new GoogleAuthProvider();
            default:
                throw new Error("Unsupported firebase auth provider " + providerId);
        }
    };
    FirebaseSdkAuthBackend = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(tokens_1.FirebaseApp)), 
        __metadata('design:paramtypes', [Object, Object])
    ], FirebaseSdkAuthBackend);
    return FirebaseSdkAuthBackend;
}(auth_backend_1.AuthBackend));
exports.FirebaseSdkAuthBackend = FirebaseSdkAuthBackend;
//# sourceMappingURL=firebase_sdk_auth_backend.js.map