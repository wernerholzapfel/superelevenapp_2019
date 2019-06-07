// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    apiBaseUrl: 'http://localhost:3000',
    firebase: {
        apiKey: 'AIzaSyCbAKfD1cA5rHmHpHESD-Yen8NVRrTh5ZY',
        authDomain: 'supereleven-2019.firebaseapp.com',
        databaseURL: 'https://supereleven-2019.firebaseio.com',
        projectId: 'supereleven-2019',
        storageBucket: 'supereleven-2019.appspot.com',
        messagingSenderId: '758081457837',
        appId: '1:758081457837:web:f83689e45f2a44af'
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
