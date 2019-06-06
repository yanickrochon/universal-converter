var gulp = require('gulp');
var browserify = require('gulp-browserify');
var sourcemaps = require('gulp-sourcemaps');
var babelify = require("babelify");
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('default', function () {
  // Single entry point to browserify
  return gulp.src('index.js')
    .pipe(sourcemaps.init())
    .pipe(browserify({
      insertGlobals: true,
      transform: [babelify]
    }))
    .pipe(uglify())
    .pipe(rename('universal-converter.min.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/'))
});