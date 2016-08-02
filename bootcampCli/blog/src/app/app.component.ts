import { Component } from '@angular/core';
import { Hightlight } from './hightlight.directive';
import { ExponentialStrengthPipe } from './exponential-strength.pipe';
import { Developer } from './developer';
import { DeveloperService } from './developer.service';
@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [Hightlight],
  pipes: [ExponentialStrengthPipe],
  providers: [DeveloperService]
})
export class AppComponent {
  title = 'app works!';
  today = new Date();

  toggle = true; // start with true == shortDate

  get format()   { return this.toggle ? 'shortDate' : 'fullDate'; }
  toggleFormat() { this.toggle = !this.toggle; }

  power = 5;
  factor = 1;

  developers: Developer[];

  constructor(private developerService: DeveloperService) { }

  getDevelopers() {
    this.developers = this.developerService.getDevelopers();
  }

  ngOnInit() {
    this.getDevelopers();
  }


}
