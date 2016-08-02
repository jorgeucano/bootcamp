import { Component } from '@angular/core';
import { Hightlight } from './hightlight.directive';
@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [Hightlight]
})
export class AppComponent {
  title = 'app works!';
}
