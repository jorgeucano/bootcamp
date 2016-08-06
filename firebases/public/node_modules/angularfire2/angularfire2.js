"use strict";
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
var auth_1 = require('./providers/auth');
exports.AngularFireAuth = auth_1.AngularFireAuth;
exports.firebaseAuthConfig = auth_1.firebaseAuthConfig;
exports.FirebaseAuth = auth_1.FirebaseAuth;
var firebase_1 = require('firebase');
var firebase_list_observable_1 = require('./utils/firebase_list_observable');
exports.FirebaseListObservable = firebase_list_observable_1.FirebaseListObservable;
var firebase_object_observable_1 = require('./utils/firebase_object_observable');
exports.FirebaseObjectObservable = firebase_object_observable_1.FirebaseObjectObservable;
var firebase_list_factory_1 = require('./utils/firebase_list_factory');
exports.FirebaseListFactory = firebase_list_factory_1.FirebaseListFactory;
var firebase_object_factory_1 = require('./utils/firebase_object_factory');
exports.FirebaseObjectFactory = firebase_object_factory_1.FirebaseObjectFactory;
var utils = require('./utils/utils');
var tokens_1 = require('./tokens');
var auth_backend_1 = require('./providers/auth_backend');
exports.AuthMethods = auth_backend_1.AuthMethods;
exports.AuthProviders = auth_backend_1.AuthProviders;
var firebase_sdk_auth_backend_1 = require('./providers/firebase_sdk_auth_backend');
var database_1 = require('./database/database');
exports.FirebaseDatabase = database_1.FirebaseDatabase;
var AngularFire = (function () {
    function AngularFire(fbUrl, auth, database) {
        this.fbUrl = fbUrl;
        this.auth = auth;
        this.database = database;
    }
    AngularFire = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(tokens_1.FirebaseConfig)), 
        __metadata('design:paramtypes', [String, auth_1.AngularFireAuth, database_1.FirebaseDatabase])
    ], AngularFire);
    return AngularFire;
}());
exports.AngularFire = AngularFire;
exports.COMMON_PROVIDERS = [
    core_1.provide(auth_1.FirebaseAuth, {
        useExisting: auth_1.AngularFireAuth
    }),
    {
        provide: tokens_1.FirebaseApp,
        useFactory: _getFirebase,
        deps: [tokens_1.FirebaseConfig]
    },
    auth_1.AngularFireAuth,
    AngularFire,
    database_1.FirebaseDatabase
];
function _getFirebase(config) {
    return firebase_1.initializeApp(config);
}
exports.FIREBASE_PROVIDERS = [
    exports.COMMON_PROVIDERS,
    {
        provide: auth_backend_1.AuthBackend,
        useFactory: _getAuthBackend,
        deps: [tokens_1.FirebaseApp]
    }
];
function _getAuthBackend(app) {
    return new firebase_sdk_auth_backend_1.FirebaseSdkAuthBackend(app, false);
}
exports.defaultFirebase = function (config) {
    config.databaseURL = utils.stripTrailingSlash(config.databaseURL);
    return core_1.provide(tokens_1.FirebaseConfig, {
        useValue: config
    });
};
var tokens_2 = require('./tokens');
exports.FirebaseConfig = tokens_2.FirebaseConfig;
exports.FirebaseApp = tokens_2.FirebaseApp;
exports.FirebaseAuthConfig = tokens_2.FirebaseAuthConfig;
exports.FirebaseRef = tokens_2.FirebaseRef;
exports.FirebaseUrl = tokens_2.FirebaseUrl;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    providers: exports.FIREBASE_PROVIDERS
};
//# sourceMappingURL=angularfire2.js.map