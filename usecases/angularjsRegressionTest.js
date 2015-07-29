/**
 * Created by sm on 29.07.2015.
 */

describe('gulp-jasmine-webdriverio test', function () {
	it('checks if title contains the search query', function(done) {
		browser
			.url('http://todomvc.com/examples/angularjs/')
			.getTitle(function(err,title) {
				expect(title).toEqual('AngularJS • TodoMVC');
			})
			.call(done);
	});

});
