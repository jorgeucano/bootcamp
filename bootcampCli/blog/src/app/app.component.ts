import { Component } from '@angular/core';
import { Hightlight } from './hightlight.directive';
import { ExponentialStrengthPipe } from './exponential-strength.pipe';
@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [Hightlight],
  pipes: [ExponentialStrengthPipe]
})
export class AppComponent {
  title = 'app works!';
  today = new Date();

  toggle = true; // start with true == shortDate

  get format()   { return this.toggle ? 'shortDate' : 'fullDate'; }
  toggleFormat() { this.toggle = !this.toggle; }

  power = 5;
  factor = 1;

}
