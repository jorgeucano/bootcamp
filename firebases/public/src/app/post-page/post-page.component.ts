import { Component, OnInit } from '@angular/core';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

import { RouteParams } from '@ngrx/router';
import 'rxjs/add/operator/pluck';

@Component({
  moduleId: module.id,
  selector: 'app-post-page',
  templateUrl: 'post-page.component.html',
  styleUrls: ['post-page.component.css']
})
export class PostPageComponent implements OnInit {

  afi : any;
  id$: Observable<string>;
  posts: FirebaseListObservable<any[]>;
  constructor(af: AngularFire, routeParams$: RouteParams) {
    this.id$ = routeParams$.pluck<string>('id');
    this.afi = af;
    this.posts = this.afi.database.list('/POSTS', {
      query: {
        orderByChild: 'id',
        equalTo: 1
      }
    });
  }

  ngOnInit() {
  }

}
