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
  .pipe(rename({ suffix: '.min' }))
  .pipe(minifycss())
  .pipe(gulp.dest('assets/css/'))
  .pipe(notify({ message: 'Styles task complete' }));
});

// Static server
gulp.task('browser-sync', function() {
  browserSync.init(['assets/css/*.css', 'assets/js/*.js', '*views/*.html'], {
    proxy:  'localhost:3004'
  });
});

// Clean
gulp.task('clean', function(cb) {
  del(['css'], cb);
});

// Reload server when html js, css or scss files change
gulp.task('nodemon', function(){
  nodemon({
    script: 'app.js',
    ext: 'js html scss css'
  }).on('restart');
});


// Default task
gulp.task('default', ['clean', 'browser-sync', 'nodemon'], function() {
  gulp.start('styles');
});

// Watch
gulp.task('watch', ['browser-sync'], function() {

  gulp.watch('assets/scss/*.scss', ['styles']);

  gulp.watch('views/*.html');

});
