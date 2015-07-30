/**
 * Created by sm on 27.06.2015.
 */

var webdrivercss = require('webdrivercss');
// All configuration goes here, to allow easier boilerplating.
var options = {
	test: {
		title: 'Body_win7-chrome',
		name: 'body',
		url: 'https://www.google.com', // this needs to be a real URL
		selector: 'body'
	},
	webdrivercss: {
    screenshotRoot: 'reports/visual/reference',
    failedComparisonsRoot: 'reports/visual/failed',
		misMatchTolerance: 0.05,
		screenWidth: [1024]
	}
};

describe('example', function () {
	beforeEach(function(){
		// Initialize webdrivercss
		webdrivercss.init(browser, options.webdrivercss);
	});

	it('should look the same', function (done) {
		browser
			.url(options.test.url)
			.webdrivercss(options.test.title, {
				name: options.test.name,
				elem: options.test.selector
			}, function(err, res) {
				expect(res[options.test.name][0].isWithinMisMatchTolerance).toBeTruthy();
			})
			.end()
			.call(done);
	});

	afterEach(function (done) {
		browser.end(done);
	});
});
