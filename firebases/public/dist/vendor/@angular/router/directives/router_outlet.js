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
var router_outlet_map_1 = require('../router_outlet_map');
var shared_1 = require('../shared');
var RouterOutlet = (function () {
    function RouterOutlet(parentOutletMap, location, name) {
        this.location = location;
        parentOutletMap.registerOutlet(name ? name : shared_1.PRIMARY_OUTLET, this);
    }
    Object.defineProperty(RouterOutlet.prototype, "isActivated", {
        get: function () { return !!this.activated; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RouterOutlet.prototype, "component", {
        get: function () {
            if (!this.activated)
                throw new Error('Outlet is not activated');
            return this.activated.instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RouterOutlet.prototype, "activatedRoute", {
        get: function () {
            if (!this.activated)
                throw new Error('Outlet is not activated');
            return this._activatedRoute;
        },
        enumerable: true,
        configurable: true
    });
    RouterOutlet.prototype.deactivate = function () {
        if (this.activated) {
            this.activated.destroy();
            this.activated = null;
        }
    };
    RouterOutlet.prototype.activate = function (factory, activatedRoute, providers, outletMap) {
        this.outletMap = outletMap;
        this._activatedRoute = activatedRoute;
        var inj = core_1.ReflectiveInjector.fromResolvedProviders(providers, this.location.parentInjector);
        this.activated = this.location.createComponent(factory, this.location.length, inj, []);
    };
    RouterOutlet = __decorate([
        core_1.Directive({ selector: 'router-outlet' }),
        __param(2, core_1.Attribute('name')), 
        __metadata('design:paramtypes', [router_outlet_map_1.RouterOutletMap, core_1.ViewContainerRef, String])
    ], RouterOutlet);
    return RouterOutlet;
}());
exports.RouterOutlet = RouterOutlet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyX291dGxldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kaXJlY3RpdmVzL3JvdXRlcl9vdXRsZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLHFCQUFxSSxlQUFlLENBQUMsQ0FBQTtBQUNySixrQ0FBOEIsc0JBQXNCLENBQUMsQ0FBQTtBQUVyRCx1QkFBNkIsV0FBVyxDQUFDLENBQUE7QUFHekM7SUFRRSxzQkFDSSxlQUFnQyxFQUFVLFFBQTBCLEVBQ2pELElBQVk7UUFEVyxhQUFRLEdBQVIsUUFBUSxDQUFrQjtRQUV0RSxlQUFlLENBQUMsY0FBYyxDQUFDLElBQUksR0FBRyxJQUFJLEdBQUcsdUJBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRUQsc0JBQUkscUNBQVc7YUFBZixjQUE2QixNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUN2RCxzQkFBSSxtQ0FBUzthQUFiO1lBQ0UsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztZQUNoRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7UUFDakMsQ0FBQzs7O09BQUE7SUFDRCxzQkFBSSx3Q0FBYzthQUFsQjtZQUNFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQkFBQyxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7WUFDaEUsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDOUIsQ0FBQzs7O09BQUE7SUFFRCxpQ0FBVSxHQUFWO1FBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN4QixDQUFDO0lBQ0gsQ0FBQztJQUVELCtCQUFRLEdBQVIsVUFDSSxPQUE4QixFQUFFLGNBQThCLEVBQUUsU0FBdUMsRUFDdkcsU0FBMEI7UUFDNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxjQUFjLENBQUM7UUFDdEMsSUFBTSxHQUFHLEdBQUcseUJBQWtCLENBQUMscUJBQXFCLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDOUYsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3pGLENBQUM7SUF2Q0g7UUFBQyxnQkFBUyxDQUFDLEVBQUMsUUFBUSxFQUFFLGVBQWUsRUFBQyxDQUFDO21CQVdoQyxnQkFBUyxDQUFDLE1BQU0sQ0FBQzs7b0JBWGU7SUF3Q3ZDLG1CQUFDO0FBQUQsQ0FBQyxBQXZDRCxJQXVDQztBQXZDWSxvQkFBWSxlQXVDeEIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QXR0cmlidXRlLCBDb21wb25lbnRGYWN0b3J5LCBDb21wb25lbnRSZWYsIERpcmVjdGl2ZSwgUmVmbGVjdGl2ZUluamVjdG9yLCBSZXNvbHZlZFJlZmxlY3RpdmVQcm92aWRlciwgVmlld0NvbnRhaW5lclJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1JvdXRlck91dGxldE1hcH0gZnJvbSAnLi4vcm91dGVyX291dGxldF9tYXAnO1xuaW1wb3J0IHtBY3RpdmF0ZWRSb3V0ZX0gZnJvbSAnLi4vcm91dGVyX3N0YXRlJztcbmltcG9ydCB7UFJJTUFSWV9PVVRMRVR9IGZyb20gJy4uL3NoYXJlZCc7XG5cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAncm91dGVyLW91dGxldCd9KVxuZXhwb3J0IGNsYXNzIFJvdXRlck91dGxldCB7XG4gIHByaXZhdGUgYWN0aXZhdGVkOiBDb21wb25lbnRSZWY8YW55PnxudWxsO1xuICBwcml2YXRlIF9hY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGV8bnVsbDtcbiAgcHVibGljIG91dGxldE1hcDogUm91dGVyT3V0bGV0TWFwO1xuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcGFyZW50T3V0bGV0TWFwOiBSb3V0ZXJPdXRsZXRNYXAsIHByaXZhdGUgbG9jYXRpb246IFZpZXdDb250YWluZXJSZWYsXG4gICAgICBAQXR0cmlidXRlKCduYW1lJykgbmFtZTogc3RyaW5nKSB7XG4gICAgcGFyZW50T3V0bGV0TWFwLnJlZ2lzdGVyT3V0bGV0KG5hbWUgPyBuYW1lIDogUFJJTUFSWV9PVVRMRVQsIHRoaXMpO1xuICB9XG5cbiAgZ2V0IGlzQWN0aXZhdGVkKCk6IGJvb2xlYW4geyByZXR1cm4gISF0aGlzLmFjdGl2YXRlZDsgfVxuICBnZXQgY29tcG9uZW50KCk6IE9iamVjdCB7XG4gICAgaWYgKCF0aGlzLmFjdGl2YXRlZCkgdGhyb3cgbmV3IEVycm9yKCdPdXRsZXQgaXMgbm90IGFjdGl2YXRlZCcpO1xuICAgIHJldHVybiB0aGlzLmFjdGl2YXRlZC5pbnN0YW5jZTtcbiAgfVxuICBnZXQgYWN0aXZhdGVkUm91dGUoKTogQWN0aXZhdGVkUm91dGUge1xuICAgIGlmICghdGhpcy5hY3RpdmF0ZWQpIHRocm93IG5ldyBFcnJvcignT3V0bGV0IGlzIG5vdCBhY3RpdmF0ZWQnKTtcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZhdGVkUm91dGU7XG4gIH1cblxuICBkZWFjdGl2YXRlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmFjdGl2YXRlZCkge1xuICAgICAgdGhpcy5hY3RpdmF0ZWQuZGVzdHJveSgpO1xuICAgICAgdGhpcy5hY3RpdmF0ZWQgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGFjdGl2YXRlKFxuICAgICAgZmFjdG9yeTogQ29tcG9uZW50RmFjdG9yeTxhbnk+LCBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUsIHByb3ZpZGVyczogUmVzb2x2ZWRSZWZsZWN0aXZlUHJvdmlkZXJbXSxcbiAgICAgIG91dGxldE1hcDogUm91dGVyT3V0bGV0TWFwKTogdm9pZCB7XG4gICAgdGhpcy5vdXRsZXRNYXAgPSBvdXRsZXRNYXA7XG4gICAgdGhpcy5fYWN0aXZhdGVkUm91dGUgPSBhY3RpdmF0ZWRSb3V0ZTtcbiAgICBjb25zdCBpbmogPSBSZWZsZWN0aXZlSW5qZWN0b3IuZnJvbVJlc29sdmVkUHJvdmlkZXJzKHByb3ZpZGVycywgdGhpcy5sb2NhdGlvbi5wYXJlbnRJbmplY3Rvcik7XG4gICAgdGhpcy5hY3RpdmF0ZWQgPSB0aGlzLmxvY2F0aW9uLmNyZWF0ZUNvbXBvbmVudChmYWN0b3J5LCB0aGlzLmxvY2F0aW9uLmxlbmd0aCwgaW5qLCBbXSk7XG4gIH1cbn1cbiJdfQ==