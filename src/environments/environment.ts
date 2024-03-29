// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCRDjenXYVcPX1G3FIpxOSPqoBDd2jIfEE",
    authDomain: "easytutor-prototype.firebaseapp.com",
    projectId: "easytutor-prototype",
    storageBucket: "easytutor-prototype.appspot.com",
    messagingSenderId: "1094650223829",
    appId: "1:1094650223829:web:8f17f915d7058127a9965c",
    measurementId: "G-01B4ZKM3J0"  
  },
  //socketUrl: 'http://localhost:5000',
  socketUrl: 'https://et-server.herokuapp.com/',
  sessionUrl: 'http://localhost:4200/session/',
  emailjs: {
    serviceID: 'service_vci4p31',
    templateID: 'template_fxjl1l7',
    publicKey: 'FuZufDbLFJPfD1Uuz'
  }
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
// socketUrl: 'http://localhost:5000'
