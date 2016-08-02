/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { ListComponentComponent } from './list-component.component';

describe('Component: ListComponent', () => {
  it('should create an instance', () => {
    let component = new ListComponentComponent();
    expect(component).toBeTruthy();
  });
});
