// Native Federation config: defines this MFE's remote name, exposed modules, and shared dependencies.
// Remote name 'mfe-demo' is used by host apps to load this MFE.
// Exposed module './Component' maps to the root component; publicPath is implicit via dev server.
const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  name: 'mfe-demo', // Remote name for host apps to reference this MFE
  exposes: {
    './Component': './src/app/demo/demo.component.ts', // Exposed root component; publicPath handled by dev server
  },
  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
  ],
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto', includeSecondaries: false }),
  },
});