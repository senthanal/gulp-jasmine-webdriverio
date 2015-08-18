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
});
