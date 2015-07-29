var gulp = require('gulp');
var jasmineWebdriverio = require('./index.js');
var jshint = require('gulp-jshint');
var bump = require('gulp-bump');
var yargs = require('yargs').argv;
var git = require('gulp-git');
var fs = require('fs');
var run = require('gulp-run');
var getPackageJson = function () {
	return JSON.parse(fs.readFileSync('./package.json', 'utf8'));
};


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
		logLevel: 'log',
		desiredCapabilities: {
			browserName: 'chrome'
		},
		ngRoot: 'html' // main application selector
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

gulp.task('bump', function(){
	return gulp.src('./package.json')
		.pipe(bump({type: yargs.type}))
		.pipe(gulp.dest('./'));
});

gulp.task('commit', ['bump'], function(){
	// reget package
	var pkg = getPackageJson();

	return gulp.src('./package.json')
		.pipe(git.commit('Release version ' + pkg.version));
});

gulp.task('push', ['tag'], function(){
	git.push('origin', 'master', function (err) {
		if (err) throw err;
	});
});

// Tag the repo with a version
gulp.task('tag', ['commit'], function(){
	// reget package
	var pkg = getPackageJson();
	git.tag(pkg.version, yargs.type + ' release version', function (err) {
		if (err) throw err;
	});
});

gulp.task('npmPublish', ['push'], function (done) {
	run('npm publish').exec();
});

gulp.task('release', ['bump', 'tag', 'push', 'commit', 'npmPublish'], function(){});

gulp.task('default', function(){
	gulp.watch("./index.js", ['linting']);
});
