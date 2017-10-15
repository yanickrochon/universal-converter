'use strict';

const browserify = require('browserify');
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const derequire = require('gulp-derequire');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const gutil = require('gulp-util');
const path = require('path');
const pkg = require('./package');
const upperCamelCase = require('uppercamelcase');

const SRC_PATH = path.dirname(pkg.main);
const DIST_PATH = path.dirname(pkg.browser);

const INPUT_FILE = path.basename(pkg.main);
const OUTPUT_FILE = path.basename(pkg.browser);

const MODULE_NAME = upperCamelCase(pkg.name);


gulp.task('default', () => {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: INPUT_FILE,
    basedir: SRC_PATH,
    transform: ['babelify'],
    standalone: MODULE_NAME,
    debug: true
  });

  return b.bundle()
    .pipe(source(OUTPUT_FILE))
    .pipe(buffer())
    .pipe(derequire())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .on('error', gutil.log)
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(DIST_PATH))
  ;
});
