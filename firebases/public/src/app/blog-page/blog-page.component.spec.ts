/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { BlogPageComponent } from './blog-page.component';

describe('Component: BlogPage', () => {
  it('should create an instance', () => {
    let component = new BlogPageComponent();
    expect(component).toBeTruthy();
  });
});
