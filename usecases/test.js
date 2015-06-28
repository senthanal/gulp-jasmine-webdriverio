describe('gulp-jasmine-webdriverio test', function () {
    it('checks if title contains the search query', function(done) {
        browser
            .url('https://github.com/senthanal/gulp-jasmine-webdriverio')
            .getTitle(function(err,title) {
                expect(title).toEqual('senthanal/gulp-jasmine-webdriverio · GitHub');
            })
            .call(done);
    });

});
