# bootcamp Angular 2 & Firebase

INSTALACION DE TYPESCRIPT:
 npm install -g typescript

Chequear Version:
 tsc --version

Como transpilar:
tsc file.ts

watcher:
tsc -w file.ts


----

Hello Angular

npm run typings install

----

// firebases
firebase init
ng new blogWithFirebase
unzip

----

ngrouter

npm install @ngrx/router @ngrx/core --save


----

angularfire2 (https://github.com/angular/angularfire2)

npm install angularfire2 firebase --save

typings install file:node_modules/angularfire2/firebase3.d.ts --save --global && typings install

"angular-cli-build"
'angularfire2/**/*.js',
'firebase/*.js',

ng build


----
// add
  const itemObservable = this.afi.database.list('/POSTS');
  itemObservable.push({ json });
  
// remove
  const items = this.afi.database.list('/POSTS');
  items.remove(itemKey);
