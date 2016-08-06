/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';

describe('Component: HomePage', () => {
  it('should create an instance', () => {
    let component = new HomePageComponent();
    expect(component).toBeTruthy();
  });
});
