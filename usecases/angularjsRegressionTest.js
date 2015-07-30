/**
 * Created by sm on 29.07.2015.
 */

var webdrivercss = require('webdrivercss');
var webdrivercssConfig = require('../webdrivercss.conf.js').config;

// All configuration goes here, to allow easier boilerplating.
var options = {
	test: {
		title: 'Body_win7-chrome',
		name: 'angularjs',
		url: 'http://angular.github.io/angular-phonecat/step-7/app/#/phones', // this needs to be a real URL
		selector: 'body'
	}
};

describe('gulp-jasmine-webdriverio test', function () {
	beforeEach(function(){
		// Initialize webdrivercss
		webdrivercss.init(browser, webdrivercssConfig);
	});

	it('checks if page contains motorola xoom phone', function(done) {
		browser
			.url('http://angular.github.io/angular-phonecat/step-7/app/#/phones')
			.webdrivercss(options.test.title, {
				name: options.test.name,
				elem: '/html/body/div/div/div/div[2]/ul/li[1]'
			}, function(err, res) {
				expect(res[options.test.name][0].isWithinMisMatchTolerance).toBeTruthy();
			})
			.call(done);
	});

	it('checks if url of the navigated page matches', function(done) {
		browser
			.url('http://angular.github.io/angular-phonecat/step-7/app/#/phones')
			.click('/html/body/div/div/div/div[2]/ul/li[1]/a[2]')
			.url(function(err,res) {
				expect(res.value).toEqual('http://angular.github.io/angular-phonecat/step-7/app/#/phones/motorola-xoom-with-wi-fi');
			})
			.isExisting('/html/body/div/span[2]')
			.then(function(isExisting) {
				expect(isExisting).toBeTruthy();
			})
			.call(done);
	});

	it('checks if the navigated page contains info', function(done) {
		browser
			.url('http://angular.github.io/angular-phonecat/step-7/app/#/phones')
			.click('/html/body/div/div/div/div[2]/ul/li[1]/a[2]')
			.webdrivercss(options.test.title, {
				name: "motorola",
				elem: '/html/body/div/span[2]'
			}, function(err, res) {
				expect(res["motorola"][0].isWithinMisMatchTolerance).toBeTruthy();
			})
			.call(done);
	});

	afterAll(function (done) {
		browser.end(done);
	});

});
