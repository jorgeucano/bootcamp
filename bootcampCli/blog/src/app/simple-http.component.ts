import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'simple-http',
  template: `
            <h2>Request tranqui</h2>
            <button type="button" (click)="makeRequest()">Make Request </button>
            <button type="button" (click)="makePost()">Make POST </button>
            <button type="button" (click)="makeDelete()">Make DELETE </button>

            <div *ngIf="loading">loading...</div>
            <pre> {{data | json }}</pre>
  `
})

export class SimpleHttpComponent{
  data: Object;
  loading: boolean;
  http: Http;

  constructor (http: Http){
    this.http = http;
  }

  makeRequest():void{
    this.loading = true;
    this.http.request('http://jsonplaceholder.typicode.com/posts/1')
      .subscribe( (res:Response) => {
        this.data = res.json();
        this.loading = false;
      });
  }

  makePost():void{
    this.loading = true;
    this.http.post(
      'http://jsonplaceholder.typicode.com/posts',
      JSON.stringify({body:'bar',title: 'foo',userId: 1})
    )
    .subscribe((res: Response)=>{
      this.data = res.json();
      this.loading = false;
    });
  }

  makeDelete():void{
    this.loading = true;
    this.http.delete('http://jsonplaceholder.typicode.com/posts/1')
      .subscribe((res:Response)=>{
        this.data = res.json();
        this.loading = false;
      });
  }


}
