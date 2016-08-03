import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment } from './app/';
import { provideForms } from '@angular/forms';

if (environment.production) {
  enableProdMode();
}

bootstrap(
  AppComponent,
  [
    provideForms()
  ]
);
