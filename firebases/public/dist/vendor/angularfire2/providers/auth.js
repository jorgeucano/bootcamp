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
var ReplaySubject_1 = require('rxjs/ReplaySubject');
require('rxjs/add/operator/mergeMap');
require('rxjs/add/operator/take');
require('rxjs/add/operator/concat');
require('rxjs/add/operator/skip');
require('rxjs/add/observable/of');
var tokens_1 = require('../tokens');
var utils_1 = require('../utils/utils');
var auth_backend_1 = require('./auth_backend');
var kBufferSize = 1;
exports.firebaseAuthConfig = function (config) {
    return core_1.provide(tokens_1.FirebaseAuthConfig, {
        useValue: config
    });
};
var AngularFireAuth = (function (_super) {
    __extends(AngularFireAuth, _super);
    function AngularFireAuth(_authBackend, _config) {
        var _this = this;
        _super.call(this, kBufferSize);
        this._authBackend = _authBackend;
        this._config = _config;
        this._credentialCache = {};
        var firstPass = true;
        this._authBackend.onAuth()
            .mergeMap(function (authState) {
            if (firstPass) {
                firstPass = false;
                return _this._authBackend.getRedirectResult()
                    .map(function (userCredential) {
                    if (userCredential && userCredential.credential) {
                        authState = attachCredentialToAuthState(authState, userCredential.credential, userCredential.credential.provider);
                        _this._credentialCache[userCredential.credential.provider] = userCredential.credential;
                    }
                    return authState;
                });
            }
            return Observable_1.Observable.of(authState);
        })
            .subscribe(function (authData) { return _this._emitAuthData(authData); });
    }
    AngularFireAuth.prototype.login = function (obj1, obj2) {
        var _this = this;
        var config = null;
        var credentials = null;
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
        if (!utils_1.isPresent(config.method)) {
            return this._reject('You must provide a login method');
        }
        var providerMethods = [auth_backend_1.AuthMethods.Popup, auth_backend_1.AuthMethods.Redirect, auth_backend_1.AuthMethods.OAuthToken];
        if (providerMethods.indexOf(config.method) != -1) {
            if (!utils_1.isPresent(config.provider)) {
                return this._reject('You must include a provider to use this auth method.');
            }
        }
        var credentialsMethods = [auth_backend_1.AuthMethods.Password, auth_backend_1.AuthMethods.OAuthToken, auth_backend_1.AuthMethods.CustomToken];
        if (credentialsMethods.indexOf(config.method) != -1) {
            if (!credentials) {
                return this._reject('You must include credentials to use this auth method.');
            }
        }
        switch (config.method) {
            case auth_backend_1.AuthMethods.Popup:
                return this._authBackend.authWithOAuthPopup(config.provider, this._scrubConfig(config))
                    .then(function (userCredential) {
                    _this._credentialCache[userCredential.credential.provider] = userCredential.credential;
                    return auth_backend_1.authDataToAuthState(userCredential.user, userCredential.credential);
                });
            case auth_backend_1.AuthMethods.Redirect:
                return this._authBackend.authWithOAuthRedirect(config.provider, this._scrubConfig(config));
            case auth_backend_1.AuthMethods.Anonymous:
                return this._authBackend.authAnonymously(this._scrubConfig(config));
            case auth_backend_1.AuthMethods.Password:
                return this._authBackend.authWithPassword(credentials);
            case auth_backend_1.AuthMethods.OAuthToken:
                return this._authBackend.authWithOAuthToken(credentials, this._scrubConfig(config));
            case auth_backend_1.AuthMethods.CustomToken:
                return this._authBackend.authWithCustomToken(credentials);
        }
    };
    AngularFireAuth.prototype.logout = function () {
        this._authBackend.unauth();
    };
    AngularFireAuth.prototype.getAuth = function () {
        console.warn("WARNING: the getAuth() API has changed behavior since adding support for Firebase 3.\n    This will return null for the initial value when the page loads, even if the user is actually logged in.\n    Please observe the actual authState asynchronously by subscribing to the auth service: af.auth.subscribe().\n    The getAuth method will be removed in future releases");
        return this._authBackend.getAuth();
    };
    AngularFireAuth.prototype.createUser = function (credentials) {
        return this._authBackend.createUser(credentials);
    };
    AngularFireAuth.prototype._mergeConfigs = function (config) {
        if (this._config == null)
            return config;
        return Object.assign({}, this._config, config);
    };
    AngularFireAuth.prototype._reject = function (msg) {
        return (new Promise(function (res, rej) {
            return rej(msg);
        }));
    };
    AngularFireAuth.prototype._scrubConfig = function (config, scrubProvider) {
        if (scrubProvider === void 0) { scrubProvider = true; }
        var scrubbed = Object.assign({}, config);
        if (scrubProvider) {
            delete scrubbed.provider;
        }
        delete scrubbed.method;
        return scrubbed;
    };
    AngularFireAuth.prototype._emitAuthData = function (authData) {
        if (authData == null) {
            this.next(null);
        }
        else {
            if (authData.auth && authData.auth.providerData && authData.auth.providerData[0]) {
                var providerId = authData.auth.providerData[0].providerId;
                var providerCredential = this._credentialCache[providerId];
                if (providerCredential) {
                    authData = attachCredentialToAuthState(authData, providerCredential, providerId);
                }
            }
            this.next(authData);
        }
    };
    AngularFireAuth = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Optional()),
        __param(1, core_1.Inject(tokens_1.FirebaseAuthConfig)), 
        __metadata('design:paramtypes', [auth_backend_1.AuthBackend, Object])
    ], AngularFireAuth);
    return AngularFireAuth;
}(ReplaySubject_1.ReplaySubject));
exports.AngularFireAuth = AngularFireAuth;
function attachCredentialToAuthState(authState, credential, providerId) {
    if (!authState)
        return authState;
    authState[auth_backend_1.stripProviderId(providerId)] = credential;
    return authState;
}
var FirebaseAuth = (function (_super) {
    __extends(FirebaseAuth, _super);
    function FirebaseAuth() {
        _super.apply(this, arguments);
    }
    return FirebaseAuth;
}(AngularFireAuth));
exports.FirebaseAuth = FirebaseAuth;
//# sourceMappingURL=auth.js.map