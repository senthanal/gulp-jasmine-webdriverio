describe('gulp-webdriverjs test', function () {

    it('checks if title contains the search query', function(done) {

        browser
            .url('https://google.com/')
            .getTitle(function(err,title) {
                expect(title).toEqual('Google');
            })
            .call(done);
    });

});