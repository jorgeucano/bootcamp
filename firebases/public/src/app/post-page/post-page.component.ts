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
  post$: any;

  constructor(af: AngularFire, routeParams$: RouteParams) {
    this.afi = af;
    this.id$ = routeParams$.pluck<string>('id');

    /*this.posts = this.afi.database.list('/POSTS', {
      query: {
        orderByChild: 'id',
        equalTo: 1
      }
    });*/

      this.post$ = routeParams$.pluck<string>('id')
        // only update if `id` changes
        .distinctUntilChanged()
        // Request the post from the server when the ID updates
        .mergeMap(id => {
          // Mark that we are loading a new post:
          this.posts = this.afi.database.list('/POSTS', {
            query: {
              orderByChild: 'id',
              equalTo: parseInt(id)
            }
          });
          return "";

      });
  }



  ngOnInit() {
  }

}
