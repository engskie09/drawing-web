// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // api_url: `http://localhost:8000/`,
  // api_url: `http://api-drawing-prod.sbhe-ume-pm.net/api/v1`,
  api_url: `http://api-drawing-staging.sbhe-ume-pm.net/api/v1`,
  s3_url: "https://s3-ap-southeast-1.amazonaws.com/sbhe-dev/",
  sbhePmUrl: "http://onion.sbhe-ume-pm.net/",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
