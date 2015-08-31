/**
 * Created by sm on 10.08.2015.
 */

'use strict';
var jasmineWebdriverio = require('../index.js');

describe('jasmineWebdriverio =>', function() {
	it('jasmineWebdriverio should be defined', function (done) {
		var stream = jasmineWebdriverio({
			configFile: './wdio.conf.js',
			args: {
				logLevel: 'verbose',
				desiredCapabilities: {
					browserName: 'phantomjs'
				}
			}
		});
		stream.on('end', function() {
			stream.should.exist();
		});
		stream.end(done);
	});
});
