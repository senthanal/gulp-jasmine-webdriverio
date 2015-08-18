/**
 * Created by sm on 15.08.2015.
 */
var webdrivercss = require('webdrivercss');

describe('gulp-jasmine-webdriverio test', function () {
	webdrivercss.init(browser);
	it('checks if title contains the search query', function(done) {
		browser
			.url('http://localhost:63342/gulp-jasmine-webdriverio/app/')
			.getTitle(function(err,title) {
				expect(title).toEqual('Hello World');
			})
			.call(done);
	});

	it('checks if page contains hello world text', function(done) {
		var testName = "test";
		browser
			.url('http://localhost:63342/gulp-jasmine-webdriverio/app/')
			.webdrivercss(testName, {
				name: testName,
				elem: '#text'
			}, function(err, res) {
				expect(res[testName][0].isWithinMisMatchTolerance).toBeTruthy();
			})
			.call(done);
	});
});
