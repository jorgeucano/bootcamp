/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { Hightlight } from './hightlight.directive';

describe('Hightlight Directive', () => {
  it('should create an instance', () => {
    let directive = new Hightlight();
    expect(directive).toBeTruthy();
  });
});
