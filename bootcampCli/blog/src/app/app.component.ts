import { Component } from '@angular/core';
import { Hightlight } from './hightlight.directive';
import { ExponentialStrengthPipe } from './exponential-strength.pipe';
import { Developer } from './developer';
import { DeveloperService } from './developer.service';
import { DeveloperChildComponent } from './developer-child.component';
import { SimpleHttpComponent } from './simple-http.component';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [Hightlight, DeveloperChildComponent, SimpleHttpComponent],
  pipes: [ExponentialStrengthPipe],
  providers: [DeveloperService]
})
export class AppComponent {
  title = 'app works!';

  // pipes
  today = new Date();
  toggle = true; // start with true == shortDate
  get format()   { return this.toggle ? 'shortDate' : 'fullDate'; }
  toggleFormat() { this.toggle = !this.toggle; }
  power = 5;
  factor = 1;


  // services & mocks
  developers: Developer[];
  constructor(private developerService: DeveloperService) { }
  getDevelopers() {
    this.developers = this.developerService.getDevelopers();
  }
  ngOnInit() {
    this.getDevelopers();
  }

  // input & output
  master: string = 'Master';


  // ng-life
  firstValue = false;
  changeFirstValue() { this.firstValue = !this.firstValue; }
  secondValue = 'A';
  choice = 1;
  nextChoice() { this.choice = this.choice + 1; }


  // forms
  onSubmit(form: any): void {
  console.log('valores del formulario:', form);
  }



}
