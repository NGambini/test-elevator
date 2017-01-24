import 'reflect-metadata';
import 'zone.js/dist/zone';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import 'zone.js/dist/proxy';
import 'zone.js/dist/jasmine-patch';

import { inject, async, TestBed } from '@angular/core/testing';

import { 
  BrowserDynamicTestingModule, 
  platformBrowserDynamicTesting 
} 
from '@angular/platform-browser-dynamic/testing';
const testContext = (<{ context?: Function }>require).context('./app', true, /\.spec\.ts/);
testContext.keys().forEach(testContext);

// const coverageContext = (<{ context?: Function }>require).context(
//   './app',
//   true,
//   /^(?=(?!.*[.]spec\.ts))(?=(?!.*[.]d\.ts))(?=(?!\.\/bootstrap\.ts$))(?=(?!\.\/vendor\.ts$)).*\.ts$/
// );
// coverageContext.keys().forEach(coverageContext);