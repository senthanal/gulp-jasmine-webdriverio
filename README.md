# gulp-jasmine-webdriverio [![Build Status](https://travis-ci.org/senthanal/gulp-jasmine-webdriverio.svg?branch=master)](https://travis-ci.org/senthanal/gulp-jasmine-webdriverio)

> gulp-jasmine-webdriver is a Gulp plugin to run Selenium tests with Jasmine and WebdriverIO
> Much of the source code drived from the excellant gulp-webdriver by christian-bromann, only difference is jasmine as the test framework as opposed to Mocha by the later.
  
> The orignal intention is to search for the best gulp task which supports Webdrvercss based css regression testing. The gulp-webdriver is based on Mocha test framework while our expertise based on jasmine. So, I've adopted the source code to
  work with jasmine test framework.

## Install

```
$ npm install --save-dev gulp-jasmine-webdriverio
```


## Usage

```js
var gulp = require('gulp');
var jasmineWebdriverio = require('gulp-jasmine-webdriverio');

gulp.task('default', function () {
	return gulp.src('src/file.ext')
		.pipe(jasmineWebdriverio())
		.pipe(gulp.dest('dist'));
});
```


## API

### jasmineWebdriverio(options)

#### options

##### foo

Type: `boolean`  
Default: `false`

Lorem ipsum.


## License

MIT © [Senthanal Sirpi Manohar](https://github.com/senthanal/gulp-jasmine-webdriverio)
