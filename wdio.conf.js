/**
 * Created by sm on 30.07.2015.
 */

'use strict';

exports.config = {

	/**
	 * selenium server configurations
	 */
	seleniumOptions:{
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
	/**
	 * capabilities
	 */
	desiredCapabilities: {
		browserName: 'chrome'
	},
	/**
	 * Reporters
	 */
	reporter: [
		/*{
			name: 'XUnit',
			options: {
				consolidateAll: true,
				filePrefix: 'visualtest-xmloutput',
				savePath: './reports/visual'
			}
		}*/
		/*,{
		 name: 'Dot',
		 options: {
		 verbosity: 2,
		 color: true,
		 showStack: false
		 }
		 }*/
		/*,{
		 name: 'Terminal',
		 options: {
		 isVerbose: 'silent',
		 showColors: true,
		 includeStackTrace: false
		 }
		 }*/
		/*,{
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
		 }*/
	],


	/**
	 * test configurations
	 */
	logLevel: 'log',
	coloredLogs: true,
	screenshotPath: './reports/visual/reference',
	baseUrl: 'http://angular.github.io/angular-phonecat/step-7/app/#/phones',
	timeout: 50000,
	framework: 'jasmine2',
	specs: [
		'usecases/angularJsRegressionTest.js',
		'usecases/regressionTest.js'
	], //we configure it on gulp task or here
	exclude: []
};
