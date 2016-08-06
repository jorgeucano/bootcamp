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
var core_1 = require('@angular/core');
var angularfire2_1 = require('angularfire2');
var router_1 = require('@ngrx/router');
require('rxjs/add/operator/pluck');
var PostPageComponent = (function () {
    function PostPageComponent(af, routeParams$) {
        var _this = this;
        this.afi = af;
        this.id$ = routeParams$.pluck('id');
        /*this.posts = this.afi.database.list('/POSTS', {
          query: {
            orderByChild: 'id',
            equalTo: 1
          }
        });*/
        this.post$ = routeParams$.pluck('id')
            .distinctUntilChanged()
            .mergeMap(function (id) {
            // Mark that we are loading a new post:
            _this.posts = _this.afi.database.list('/POSTS', {
                query: {
                    orderByChild: 'id',
                    equalTo: parseInt(id)
                }
            });
            return "";
        });
    }
    PostPageComponent.prototype.ngOnInit = function () {
    };
    PostPageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-post-page',
            templateUrl: 'post-page.component.html',
            styleUrls: ['post-page.component.css']
        }), 
        __metadata('design:paramtypes', [angularfire2_1.AngularFire, router_1.RouteParams])
    ], PostPageComponent);
    return PostPageComponent;
}());
exports.PostPageComponent = PostPageComponent;
//# sourceMappingURL=post-page.component.js.map