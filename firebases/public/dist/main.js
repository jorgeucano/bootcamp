"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var core_1 = require('@angular/core');
var _1 = require('./app/');
var router_1 = require('@ngrx/router');
/* FIREBASE */
var angularfire2_1 = require('angularfire2');
var home_page_component_1 = require('./app/home-page/home-page.component');
var blog_page_component_1 = require('./app/blog-page/blog-page.component');
var post_page_component_1 = require('./app/post-page/post-page.component');
var routes = [
    {
        path: '/',
        component: home_page_component_1.HomePageComponent
    },
    {
        path: '/blog',
        component: blog_page_component_1.BlogPageComponent,
        children: [
            {
                path: ':id',
                component: post_page_component_1.PostPageComponent
            }
        ]
    },
    {
        path: '/posts/:id',
        component: post_page_component_1.PostPageComponent
    }
];
if (_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.bootstrap(_1.AppComponent, [
    router_1.provideRouter(routes),
    angularfire2_1.FIREBASE_PROVIDERS,
    angularfire2_1.defaultFirebase({
        apiKey: "AIzaSyBsrJ7QRvOazuKS6WoSzEe0CgKIhPcz81M",
        authDomain: "bootfire-b40fc.firebaseapp.com",
        databaseURL: "https://bootfire-b40fc.firebaseio.com",
        storageBucket: "bootfire-b40fc.appspot.com",
    })
]);
//# sourceMappingURL=main.js.map