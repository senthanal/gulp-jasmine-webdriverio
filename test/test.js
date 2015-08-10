/**
 * Created by sm on 10.08.2015.
 */

'use strict';
var should = require('should');
var jasmineWebdriverio = require('../index.js');

describe('jasmineWebdriverio =>', function() {
	it('jasmineWebdriverio should be defined', function (done) {
		var stream = jasmineWebdriverio();
		stream.on('end', function() {
			stream.should.exist();
		});
		stream.end(done);
	});
});
