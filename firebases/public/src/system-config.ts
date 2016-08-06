// SystemJS configuration file, see links for more information
// https://github.com/systemjs/systemjs
// https://github.com/systemjs/systemjs/blob/master/docs/config-api.md

/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
};

/** User packages configuration. */
const packages: any = {
};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/http',
  
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'app',
  'app/shared',
  'app/home-page',
  'app/blog-page',
  'app/post-page',
  /** @cli-barrel */

  /* ngrx/router begin */
 '@ngrx/core',
 '@ngrx/router',
 'path-to-regexp',
 'isarray',
 'query-string',
 'strict-uri-encode',
 'object-assign'
 /* ngrx/router end */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

// add NGRx
cliSystemConfigPackages['@ngrx/store'] = {
  main: 'index'
}

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js',
    /* ngrx/router begin */
     '@ngrx': 'vendor/@ngrx',
     'path-to-regexp': 'vendor/path-to-regexp',
     'isarray': 'vendor/isarray',
     'query-string': 'vendor/query-string',
     'strict-uri-encode': 'vendor/strict-uri-encode',
     'object-assign': 'vendor/object-assign'
     /* ngrx/router end */
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
