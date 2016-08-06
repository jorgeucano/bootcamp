// SystemJS configuration file, see links for more information
// https://github.com/systemjs/systemjs
// https://github.com/systemjs/systemjs/blob/master/docs/config-api.md
/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
var map = {};
/** User packages configuration. */
var packages = {};
////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
var barrels = [
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
];
var cliSystemConfigPackages = {};
barrels.forEach(function (barrelName) {
    cliSystemConfigPackages[barrelName] = { main: 'index' };
});
// add firebase
cliSystemConfigPackages['angularfire2'] = {
    main: 'angularfire2.js'
};
// add NGRx
cliSystemConfigPackages['@ngrx/store'] = {
    main: 'index'
};
// Apply the CLI SystemJS configuration.
System.config({
    map: {
        '@angular': 'vendor/@angular',
        'rxjs': 'vendor/rxjs',
        'main': 'main.js',
        /* firebase begin*/
        'firebase': 'vendor/firebase/firebase.js',
        'angularfire2': 'vendor/angularfire2',
        /* firebase end */
        /* ngrx/router begin */
        '@ngrx': 'vendor/@ngrx',
        'path-to-regexp': 'vendor/path-to-regexp',
        'isarray': 'vendor/isarray',
        'query-string': 'vendor/query-string',
        'strict-uri-encode': 'vendor/strict-uri-encode',
        'object-assign': 'vendor/object-assign'
    },
    packages: cliSystemConfigPackages
});
// Apply the user's configuration.
System.config({ map: map, packages: packages });
//# sourceMappingURL=system-config.js.map