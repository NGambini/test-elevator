import 'core-js/es6';
import 'core-js/es7/reflect';

import 'hammerjs/hammer';

require('zone.js/dist/zone');

let isProduction = false;

if (!isProduction) {
    Error['stackTraceLimit'] = Infinity;
    require('zone.js/dist/long-stack-trace-zone');
}
