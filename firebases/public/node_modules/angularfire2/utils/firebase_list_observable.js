"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('rxjs/Observable');
var utils = require('./utils');
var FirebaseListObservable = (function (_super) {
    __extends(FirebaseListObservable, _super);
    function FirebaseListObservable(_ref, subscribe) {
        _super.call(this, subscribe);
        this._ref = _ref;
    }
    FirebaseListObservable.prototype.lift = function (operator) {
        var observable = new FirebaseListObservable(this._ref);
        observable.source = this;
        observable.operator = operator;
        observable._ref = this._ref;
        return observable;
    };
    FirebaseListObservable.prototype.push = function (val) {
        if (!this._ref) {
            throw new Error('No ref specified for this Observable!');
        }
        this._ref.ref;
        return this._ref.ref.push(val);
    };
    FirebaseListObservable.prototype.update = function (item, value) {
        var _this = this;
        return this._checkOperationCases(item, {
            stringCase: function () { return _this._ref.ref.child(item).update(value); },
            firebaseCase: function () { return item.update(value); },
            snapshotCase: function () { return item.ref.update(value); },
            unwrappedSnapshotCase: function () { return _this._ref.ref.child(item.$key).update(value); }
        });
    };
    FirebaseListObservable.prototype.remove = function (item) {
        var _this = this;
        if (item === void 0) { item = null; }
        if (!item) {
            return this._ref.ref.remove();
        }
        return this._checkOperationCases(item, {
            stringCase: function () { return _this._ref.ref.child(item).remove(); },
            firebaseCase: function () { return item.remove(); },
            snapshotCase: function () { return item.ref.remove(); },
            unwrappedSnapshotCase: function () { return _this._ref.ref.child(item.$key).remove(); }
        });
    };
    FirebaseListObservable.prototype._checkOperationCases = function (item, cases) {
        if (utils.isString(item)) {
            return cases.stringCase();
        }
        else if (utils.isFirebaseRef(item)) {
            return cases.firebaseCase();
        }
        else if (utils.isFirebaseDataSnapshot(item)) {
            return cases.snapshotCase();
        }
        else if (utils.isAFUnwrappedSnapshot(item)) {
            return cases.unwrappedSnapshotCase();
        }
        throw new Error("FirebaseListObservable.remove requires a key, snapshot, reference, or unwrapped snapshot. Got: " + typeof item);
    };
    return FirebaseListObservable;
}(Observable_1.Observable));
exports.FirebaseListObservable = FirebaseListObservable;
//# sourceMappingURL=firebase_list_observable.js.map