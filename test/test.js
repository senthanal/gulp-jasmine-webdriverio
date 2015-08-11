/**
 * Created by sm on 10.08.2015.
 */

'use strict';
var should = require('should');
var jasmineWebdriverio = require('../index.js');

describe('jasmineWebdriverio =>', function() {
	it('jasmineWebdriverio should be defined', function (done) {
		var stream = jasmineWebdriverio({
			configFile: './wdio.conf.js',
			args: {
				updateSauceJob: true,
				logLevel: 'verbose',
				user: process.env.SAUCE_USERNAME,
				key: process.env.SAUCE_ACCESS_KEY,
				host: 'ondemand.saucelabs.com',
				port: 80,
				desiredCapabilities: {
					browserName: 'chrome',
					platform: 'Windows 8',
					version: '44',
					tags: ['chrome', 'Windows 8', '44'],
					name: 'gulp-jasmine-webdriverio test',
					build: process.env.TRAVIS_BUILD_NUMBER
				}
			}
		});
		stream.on('end', function() {
			stream.should.exist();
		});
		stream.end(done);
	});
});
