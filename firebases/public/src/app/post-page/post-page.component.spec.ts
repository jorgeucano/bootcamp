/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { PostPageComponent } from './post-page.component';

describe('Component: PostPage', () => {
  it('should create an instance', () => {
    let component = new PostPageComponent();
    expect(component).toBeTruthy();
  });
});
