// Load plugins
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const minifycss = require('gulp-minify-css');
const rename = require('gulp-rename');
const notify = require('gulp-notify');
const del = require('del');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');

// Styles
gulp.task('styles', function() {
  return gulp.src('assets/scss/main.scss', { style: 'expanded' })
  .pipe(sass().on('error', sass.logError))
  .pipe(plumber())
  .pipe(autoprefixer({browsers: ['last 2 version']}))
  .pipe(gulp.dest('assets/css/'))
  // NOTE: Reloads `*.css` files
  .pipe(browserSync.reload({ stream: true }))
  .pipe(rename({ suffix: '.min' }))
  .pipe(minifycss())
  .pipe(gulp.dest('assets/css/'))
  // NOTE: Reloads `*.min.css` files
  .pipe(browserSync.reload({ stream: true }))
  .pipe(notify({ message: 'Styles task complete' }));
});

// Static server
gulp.task('browser-sync', function(done) {
  // HACK: Wait .5 seconds before opening browser tab to avoid the situation in which we're in
  // the middle of a server restart (triggered by nodemon) and the server hasn't been fired up yet.
  setTimeout(() => {
    browserSync.init({
      proxy: 'localhost:3004'
    }, done);
  }, 500);
});

// Clean
gulp.task('clean', function(cb) {
  del(['css'], cb);
});

// Reload server when server-side scripts and views change.
gulp.task('nodemon', function() {
  nodemon({
    ext: 'js html',
    script: 'app.js',
    ignore: [
      'gulpfile.js',
      'assets/js/*',
      'node_modules/*'
    ]
  });
});


// Default task
gulp.task('default', ['clean', 'browser-sync', 'watch', 'nodemon'], function() {
  gulp.start('styles');
});

// Watch
gulp.task('watch', function() {

  gulp.watch('assets/scss/*.scss', ['styles']);

  gulp.watch('views/*.html');

});
