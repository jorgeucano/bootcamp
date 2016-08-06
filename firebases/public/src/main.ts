import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment } from './app/';
import { provideRouter } from '@ngrx/router';

/* FIREBASE */
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';

/* NGRX Router */
import { Routes } from '@ngrx/router';
import { HomePageComponent } from './app/home-page/home-page.component';
import { BlogPageComponent } from './app/blog-page/blog-page.component';
import { PostPageComponent } from './app/post-page/post-page.component';

const routes: Routes = [
  {
    path: '/',
    component: HomePageComponent
  },
  {
    path: '/blog',
    component: BlogPageComponent,
    children: [
      {
        path: ':id',
        component: PostPageComponent
      }
    ]
  },
  {
    path: '/posts/:id',
    component: PostPageComponent
  }
]



if (environment.production) {
  enableProdMode();
}

bootstrap(
  AppComponent,
  [
      provideRouter(routes),
      FIREBASE_PROVIDERS,
      defaultFirebase({
        apiKey: "AIzaSyBsrJ7QRvOazuKS6WoSzEe0CgKIhPcz81M",
        authDomain: "bootfire-b40fc.firebaseapp.com",
        databaseURL: "https://bootfire-b40fc.firebaseio.com",
        storageBucket: "bootfire-b40fc.appspot.com",
      })
  ]
);
