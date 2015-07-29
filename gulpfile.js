var gulp = require('gulp');
var jasmineWebdriverio = require('./index.js');
var jshint = require('gulp-jshint');

gulp.task('regression-test', function() {
    return gulp.src('usecases/regressionTest.js', {
        read: false
    }).pipe(jasmineWebdriverio({
        logLevel: 'verbose',
        desiredCapabilities: {
            browserName: 'phantomjs'
        }
    }));
});

gulp.task('angularjs-regression-test', function() {
    return gulp.src('usecases/angularJsRegressionTest.js', {
        read: false
    }).pipe(jasmineWebdriverio({
        logLevel: 'verbose',
        desiredCapabilities: {
            browserName: 'chrome'
        },
		ngRoot: 'body' // main application selector
    }));
});

gulp.task('test', function() {
    return gulp.src('usecases/test.js', {
        read: false
    }).pipe(jasmineWebdriverio({
        logLevel: 'verbose',
        desiredCapabilities: {
            browserName: 'chrome'
        }
    }));
});

gulp.task('linting', function() {
    return gulp.src('./index.js', {
        read: false
    })
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
});

gulp.task('default', function(){
	gulp.watch("./index.js", ['linting']);
});
