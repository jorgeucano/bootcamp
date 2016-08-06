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
var tokens_1 = require('../tokens');
var firebase_list_factory_1 = require('../utils/firebase_list_factory');
var firebase_object_factory_1 = require('../utils/firebase_object_factory');
var utils = require('../utils/utils');
var FirebaseDatabase = (function () {
    function FirebaseDatabase(fbConfig) {
        this.fbConfig = fbConfig;
    }
    FirebaseDatabase.prototype.list = function (urlOrRef, opts) {
        var _this = this;
        return utils.checkForUrlOrFirebaseRef(urlOrRef, {
            isUrl: function () { return firebase_list_factory_1.FirebaseListFactory(getAbsUrl(_this.fbConfig, urlOrRef), opts); },
            isRef: function () { return firebase_list_factory_1.FirebaseListFactory(urlOrRef); }
        });
    };
    FirebaseDatabase.prototype.object = function (urlOrRef, opts) {
        var _this = this;
        return utils.checkForUrlOrFirebaseRef(urlOrRef, {
            isUrl: function () { return firebase_object_factory_1.FirebaseObjectFactory(getAbsUrl(_this.fbConfig, urlOrRef), opts); },
            isRef: function () { return firebase_object_factory_1.FirebaseObjectFactory(urlOrRef); }
        });
    };
    FirebaseDatabase = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(tokens_1.FirebaseConfig)), 
        __metadata('design:paramtypes', [Object])
    ], FirebaseDatabase);
    return FirebaseDatabase;
}());
exports.FirebaseDatabase = FirebaseDatabase;
function getAbsUrl(root, url) {
    if (!(/^[a-z]+:\/\/.*/.test(url))) {
        url = root.databaseURL + '/' + utils.stripLeadingSlash(url);
    }
    return url;
}
//# sourceMappingURL=database.js.map