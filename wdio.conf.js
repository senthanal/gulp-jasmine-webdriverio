/**
 * Created by sm on 30.07.2015.
 */

'use strict';

exports.config = {

// =====================
	// Server Configurations
	// =====================
	// Host address of the running Selenium server. This information is usually obsolete as
	// WebdriverIO automatically connects to localhost. Also if you are using one of the
	// supported cloud services like Sauce Labs, Browserstack or Testing Bot you also don't
	// need to define host and port information because WebdriverIO can figure that our
	// according to your user and key information. However if you are using a private Selenium
	// backend you should define the host address and port here.
	seleniumOptions: {
		port: 4444,
		role: 'hub'
	},
	/*seleniumInstallOptions: {
	 // check for more recent versions of selenium here:
	 // http://selenium-release.storage.googleapis.com/index.html
	 version: '2.45.0',
	 baseURL: 'http://selenium-release.storage.googleapis.com',
	 drivers: {
	 chrome: {
	 version: '2.15',
	 arch: process.arch,
	 baseURL: 'http://chromedriver.storage.googleapis.com'
	 },
	 ie: {
	 version: '2.45.0',
	 arch: process.arch,
	 baseURL: 'http://selenium-release.storage.googleapis.com'
	 }
	 },
	 logger: function(message) {

	 },
	 progressCb: function(totalLength, progressLength, chunkLength) {

	 }
	 },*/

	//
	// =================
	// Service Providers
	// =================
	// WebdriverIO supports Sauce Labs, Browserstack and Testing Bot (other cloud providers
	// should work too though). These services define specific user and key (or access key)
	// values you need to put in here in order to connect to these services.
	//
	//user: 'webdriverio',
	//key:  'xxxxxxxxxxxxxxxx-xxxxxx-xxxxx-xxxxxxxxx',
	//
	// If you are using Sauce Labs WebdriverIO takes care about updating the job information
	// once the test is done. This option is set to `true` per default.
	//
	//updateJob: true,

//
	// ============
	// Capabilities
	// ============
	// Define your capabilities here. WebdriverIO can run multiple capabilties at the same
	// time. Depending on the number of capabilities WebdriverIO launches several test
	// sessions. Within your capabilities you can overwrite the spec and exclude option in
	// order to group specific specs to a specific capability.
	//
	// If you have trouble getting all important capabilities together check out Sauce Labs
	// platform configurator. A great tool to configure your capabilities.
	// https://docs.saucelabs.com/reference/platforms-configurator
	//
	desiredCapabilities: {
		browserName: 'chrome'
	},
	//
	// Initialise the browser instance with a WebdriverIO plugin. The object should have the
	// plugin name as key and the desired plugin options as property. Make sure you have
	// the plugin installed before running any tests. The following plugins are currently
	// available:
	// WebdriverCSS: https://github.com/webdriverio/webdrivercss
	// WebdriverRTC: https://github.com/webdriverio/webdriverrtc
	// Browserevent: https://github.com/webdriverio/browserevent
	plugins:{
		webdrivercss:{
			screenshotRoot: './reports/visual/reference',
			failedComparisonsRoot: './reports/visual/failed',
			misMatchTolerance: 0.05,
			screenHeight: [726],
			screenWidth: [1024]
		}
	},
	//
	// Options to be passed to Jasmine.
	jasmineNodeOpts: {
		//
		// Jasmine default timeout
		defaultTimeoutInterval: 5000,
		//
		// Make use of jasmine specific grep functionality
		grep: null,
		invertGrep: null
	},

	//
	// =====
	// Hooks
	// =====
	// Run functions before or after the test. If one of them return with a promise, WebdriverIO
	// will wait until that promise got resolved to continue.
	// see also: http://webdriver.io/guide/testrunner/hooks.html
	//
	// Gets executed before all workers get launched.
	onPrepare: function() {
		console.log('let\'s go');
	},
	//
	// Gets executed before test execution begins. At this point you will have access to all global
	// variables like `browser`. It is the perfect place to define custom commands.
	before: function() {
		console.log('run the tests');
	},
	//
	// Gets executed after all tests are done. You still have access to all global variables from
	// the test.
	after: function() {
		console.log('finish up the tests');
	},
	//
	// Gets executed after all workers got shut down and the process is about to exit. It is not
	// possible to defer the end of the process using a promise.
	onComplete: function(done) {
		console.log('that\'s it');
		browser.end(done);
	},
	//
	// Test reporter for stdout.
	// The following are supported: dot (default), spec and xunit
	// see also: http://webdriver.io/guide/testrunner/reporters.html
	reporter: [
		{
			name: 'XUnit',
			options: {
				consolidateAll: true,
				filePrefix: 'visualtest-xmloutput',
				savePath: './reports/visual'
			}
		}
		, {
			name: 'Dot',
			options: {
				verbosity: 2,
				color: true,
				showStack: false
			}
		}
		, {
			name: 'Terminal',
			options: {
				isVerbose: 'silent',
				showColors: true,
				includeStackTrace: false
			}
		}
		, {
			name: 'Spec',
			options: {
				displayStacktrace: 'none',
				displayFailuresSummary: true,
				displayPendingSummary: true,
				displaySuccessfulSpec: true,
				displayFailedSpec: true,
				displayPendingSpec: true,
				displaySpecDuration: false,
				displaySuiteNumber: false,
				colors: {
					success: 'green',
					failure: 'red',
					pending: 'yellow'
				},
				prefixes: {
					success: '✓ ',
					failure: '✗ ',
					pending: '* '
				},
				customProcessors: []
			}
		}
	],


	//
	// ===================
	// Test Configurations
	// ===================
	// Define all options that are relevant for the WebdriverIO instance here
	//
	// Level of logging verbosity.
	// Level of logging verbosity.
	logLevel: 'silent',
	//
	// Enables colors for log output
	coloredLogs: true,
	//
	// Saves a screenshot to a given path if a command fails.
	screenshotPath: './reports/visual/reference',
	//
	// Shorten url command calls by setting a base url. If your url parameter starts with "/"
	// the base url gets prepended.
	baseUrl: 'http://angular.github.io/angular-phonecat/step-7/app/#/phones',
	//
	// Default timeout for all waitForXXX commands.
	waitforTimeout: 1000,
	//
	// Framework you want to run your specs with.
	// The following are supported: mocha, jasmine and cucumber
	// see also: http://webdriver.io/guide/testrunner/frameworks.html
	//
	// Make sure you have the node package for the specific framework installed before running
	// any tests. If not please install the following package:
	// Mocha: `$ npm install mocha`
	// Jasmine: `$ npm install jasmine`
	// Cucumber: `$ npm install cucumber`
	framework: 'jasmine2',
	//
	// ==================
	// Specify Test Files
	// ==================
	// Define which test specs should run. The pattern is relative to the location of this
	// file.
	//
	specs: [
		'usecases/*.js'
	],
	// Patterns to exclude.
	exclude: []
};
