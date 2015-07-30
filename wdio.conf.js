/**
 * Created by sm on 30.07.2015.
 */

'use strict';

exports.config = {

	/**
	 * selenium server configurations
	 */
	host: 'localhost',
	port: 4444,

	/**
	 * specify test files
	 */
	specs: ['./usecases/angularJsRegressionTest.js'], //we configure it on gulp task or here

	exclude: [],

	/**
	 * capabilities
	 */
	desiredCapabilities: {
		browserName: 'chrome'
	},

	/**
	 * test configurations
	 */
	logLevel: 'log',
	coloredLogs: true,
	screenshotPath: './reports/visual/reference',
	baseUrl: 'http://angular.github.io/angular-phonecat/step-7/app/#/phones',
	timeout: 10000,
	framework: 'jasmine2',

	reporter: [
		/*{
			name: 'XUnit',
			options: {
				consolidateAll: true,
				filePrefix: 'visualtest-xmloutput',
				savePath: './reports'
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

	jasmineNodeOpts: {
		// If true, display spec names.
		isVerbose: true,
		// If true, print colors to the terminal.
		showColors: true,
		// If true, include stack traces in failures.
		includeStackTrace: true,
		// Default time to wait in ms before a test fails.
		defaultTimeoutInterval: 30000
	}
};
