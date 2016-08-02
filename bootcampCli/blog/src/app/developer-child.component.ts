import { Component, Input } from '@angular/core';

@Component({
  selector: 'developer-child',
  template: '<p>I, Jorge, am at your service, {{masterName}}.</p>'
})
export class DeveloperChildComponent {
  @Input('master') masterName: string;
}
