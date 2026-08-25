// Entry point: initializes Native Federation (loads shared deps & remote config),
// then dynamically imports bootstrap.ts to start the Angular app.
import { initFederation } from '@angular-architects/native-federation';

initFederation()
  .catch(err => console.error(err))
  .then(_ => import('./bootstrap'))
  .catch(err => console.error(err));