import { Injectable } from '@angular/core';
import { Developer } from './developer';
import { DEVELOPERS } from './mock-developers';
@Injectable()
export class DeveloperService {
  getDevelopers() {
    return DEVELOPERS;
  }
}
