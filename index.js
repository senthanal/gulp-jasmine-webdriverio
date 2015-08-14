'use strict';

var fs = require('fs');
var path = require('path');
var gs = require('glob-stream');
var through = require('through2');
var gutil = require('gulp-util');
var SauceLabs = require('saucelabs');
var SauceTunnel = require('sauce-tunnel');
var selenium = require('selenium-standalone');
var webdriverio = require('webdriverio');
var webdriverjsAngular = require('webdriverjs-angular');
var http = require('http');
var async = require('async');
var merge = require('deepmerge');
var phantomjs = require('phantomjs');

var server = null;
var isSeleniumServerRunning = false;
var seleniumServer = null;
var tunnel = null;
var isSauceTunnelRunning = false;

var Jasmine = require('jasmine');
var jasmineReporters = require('jasmine-reporters');
var Reporter = require('jasmine-terminal-reporter');
var SpecReporter = require('jasmine-spec-reporter');

module.exports = function (args) {
	args = typeof args === 'undefined' ? {configFile: undefined, args: {}} : args;
	var configs = typeof args.configFile === 'undefined' ? {} : require(args.configFile).config;
	var argsArgs = typeof args.args === 'undefined' ? {} : args.args;
	var mergedOptions = merge(configs, argsArgs);
	var options = mergedOptions || {},
		sessionID = null,
		seleniumOptions = merge((options.seleniumOptions || {}), {
			host: 'localhost',
			port: 4444,
			role: 'hub',
			path: '/wd/hub/status'
		}),
		seleniumInstallOptions = options.seleniumInstallOptions || {},
		tunnelIdentifier = options.desiredCapabilities && options.desiredCapabilities['tunnel-identifier'] ? options.desiredCapabilities['tunnel-identifier'] : null,
		tunnelFlags = options.desiredCapabilities && options.desiredCapabilities['tunnel-flags'] ? options.desiredCapabilities['tunnel-flags'] : [];

	// Setup phantomjs binary path manually
	if (typeof options.desiredCapabilities != 'undefined'
		&& options.desiredCapabilities.browserName == 'phantomjs') {
		options.desiredCapabilities['phantomjs.binary.path'] = phantomjs.path
	}

	/**
	 * initialise tunnel
	 */
	if (!tunnel && options.user && options.key && tunnelIdentifier) {
		gutil.log('initialise test session using sauce tunnel from user ' + options.user);
		tunnel = new SauceTunnel(options.user, options.key, tunnelIdentifier, true, tunnelFlags);
		tunnel.on('verbose:debug', gutil.log);

		seleniumOptions.host = undefined;
		seleniumOptions.port = 4445;
	}

	/**
	 * initialize WebdriverIO
	 */
	gutil.log('run webdriverio with following capabilities: ' + JSON.stringify(options));
	options.logLevel = options.quiet ? 'silent' : options.logLevel;
	GLOBAL.browser = typeof options.ngRoot === 'undefined' ? webdriverio.remote(options) : webdriverjsAngular.remote(options);

	/**
	 * initialize Jasmine
	 */
	var jasmine = new Jasmine();
	if (options.timeout) {
		jasmine.jasmine.DEFAULT_TIMEOUT_INTERVAL = options.timeout;
	}
	var color = process.argv.indexOf('--no-color') === -1;
	var reporter = options.reporter;
	if (reporter) {
		(Array.isArray(reporter) ? reporter : [reporter]).forEach(function (el) {
			jasmine.addReporter(getReporter(el));
		});
	} else {
		jasmine.addReporter(new Reporter({
			isVerbose: options.verbose,
			showColors: color,
			includeStackTrace: options.includeStackTrace || false
		}));
	}

	/**
	 * Returns relevant jasmine reporter instance
	 * @param type
	 * @returns {*}
	 */
	function getReporter(type) {
		var reporter;
		switch (type.name) {
			case 'XUnit':
				reporter = new jasmineReporters.JUnitXmlReporter(type.options);
				break;
			case 'Terminal':
				reporter = new Reporter(type.options);
				break;
			case 'Spec':
				reporter = new SpecReporter(type.options);
				break;
			case 'Dot':
				reporter = new jasmineReporters.TerminalReporter(type.options);
				break;
		}
		return reporter;
	}

	/**
	 * helper function for asyncjs
	 */
	var next = function (cb, param) {
		return function () {
			var args = Array.prototype.slice.call(arguments, 1);

			if (typeof param !== 'undefined') {
				args.unshift(param);
			} else if (arguments.length === 1) {
				args.unshift(arguments[0]);
			}

			args.unshift(null);
			cb.apply(null, args);
		};
	};

	/**
	 * check if selenium server is already running
	 */
	var pingSelenium = function (callback) {
		if (tunnel) {
			return callback(null);
		}

		gutil.log('checking if selenium is running');

		return http.get(seleniumOptions, function (res) {
			gutil.log('selenium is running');
			isSeleniumServerRunning = true;
			// Gulp seems to hang when HTTP requests are made, and that's how selenium is queried.
			// https://github.com/gulpjs/gulp/issues/167
			res.on('end', function () {
				return callback(null);
			});
			res.resume();
		}).on('error', function () {
			gutil.log('selenium is not running');
			isSeleniumServerRunning = false;
			return callback(null);
		});
	};

	/**
	 *  install drivers if needed
	 */
	var installDrivers = function (callback) {
		if (tunnel || isSeleniumServerRunning) {
			return callback(null);
		}

		gutil.log('installing driver if needed');
		selenium.install(seleniumInstallOptions, function (err) {
			if (err) {
				return callback(err);
			}

			gutil.log('driver installed');
			return callback(null);
		});
	};

	/**
	 * start selenium server or sauce tunnel (if not already started)
	 */
	var startServer = function (callback) {

		if (tunnel) {

			if (isSauceTunnelRunning) {
				gutil.log('sauce tunnel is already running');
				return callback(null, isSauceTunnelRunning);
			}

			gutil.log('start sauce tunnel');

			/**
			 * start sauce tunnel
			 */
			tunnel.start(function (hasTunnelStarted) {
				// output here means if tunnel was created successfully
				if (hasTunnelStarted === false) {
					callback(new Error('Sauce-Tunnel couldn\'t created successfully'));
				}

				gutil.log('tunnel created successfully');
				isSauceTunnelRunning = true;
				return callback(null, isSauceTunnelRunning);
			});

		} else if (!server && !isSeleniumServerRunning && !options.nospawn) {

			gutil.log('start selenium standalone server');

			/**
			 * starts selenium standalone server if its not running
			 */

			server = selenium.start({seleniumArgs :seleniumOptions}, function (err, child) {
				if (err) {
					return callback(err);
				}

				gutil.log('selenium successfully started');
				seleniumServer = child;
				isSeleniumServerRunning = true;
				return callback(null, true);
			});

		} else {
			gutil.log('standalone server or sauce tunnel is running');
			return callback(null, true);
		}

	};

	var initWebdriver = function () {
		var callback = arguments[arguments.length - 1];
		gutil.log('init WebdriverIO instance');

		GLOBAL.browser.init(function (err) {
			/**
			 *  Allow for adding custom commands
			 */
			if ('function' === typeof args.applyExtensions) {
				args.applyExtensions.call(null, this);
			}

			/**
			 * gracefully kill process if init fails
			 */
			callback(err);
		});
	};

	var runJasmine = function (callback) {
		gutil.log('run jasmine tests');

		/**
		 * save session ID
		 */
		sessionID = GLOBAL.browser.requestHandler.sessionID;

		jasmine.onComplete(next(callback));
		jasmine.execute();
	};

	var endSeleniumSession = function (callback) {
		if (GLOBAL.browser) {
			// Close Remote sessions if needed
			return GLOBAL.browser.end(function () {
				gutil.log('ended selenium session');
				callback();
			});
		} else {
			return callback();
		}
	};

	/**
	 * destroy sauce tunnel if connected (once all tasks were executed)
	 */
	var killSauceTunnel = function (done) {
		if (isSauceTunnelRunning) {
			gutil.log('destroy sauce tunnel if connected (once all tasks were executed)');
			return tunnel.stop(function () {
				gutil.log('tunnel closed successfully');
				done();
			});
		}

		return done();
	};

	/**
	 * kill selenium server process if created
	 * @param callback
	 * @returns {*}
	 */
	var killSeleniumServer = function (callback) {
		if (seleniumServer) {
			gutil.log('killing selenium server');
			seleniumServer.kill();
		}

		return callback();
	};

	/**
	 * update job on Sauce Labs
	 */
	var updateSauceJob = function (result) {
		var callback = arguments[arguments.length - 1];

		gutil.log('update job on Sauce Labs');
		var sauceAccount = new SauceLabs({
			username: options.user,
			password: options.key
		});

		sauceAccount.updateJob(sessionID, {
			passed: result,
			public: true
		}, next(callback, result));
	};

	var runWebdriverIOTests = function (callback) {
		var stream = this;
		var tasks = [
			pingSelenium.bind(stream),
			installDrivers.bind(stream),
			startServer.bind(stream),
			initWebdriver.bind(stream),
			runJasmine.bind(stream)
		];

		if (options.updateSauceJob) {
			tasks.push(updateSauceJob.bind(stream));
		}

		async.waterfall(tasks, function (err) {
			//if no error happened and no test failures, we are good
			if (err) {
				stream.emit('error', new gutil.PluginError('gulp-jasmine-webdriverio', err));
			}

			async.waterfall([
				endSeleniumSession.bind(stream),
				killSauceTunnel.bind(stream),
				killSeleniumServer.bind(stream)
			], callback);
		});

		return stream;
	};

	function addFileToJasmine(file, enc, callback) {
		console.log(file);
		this.push(file);
		jasmine.addSpecFile(file.path);
		callback();
	}

	var outputStream;
	if(typeof options.specs === 'undefined'){
		outputStream = through.obj(addFileToJasmine, runWebdriverIOTests);
	}
	else{
		outputStream = gs.create(options.specs);
		return outputStream
			.pipe(through.obj(addFileToJasmine, runWebdriverIOTests));
	}
	return outputStream;

};
