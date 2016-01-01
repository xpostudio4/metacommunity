
// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-sass');
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    del = require('del');
    plumber = require('gulp-plumber');
    browserSync = require('browser-sync');


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
    browserSync.init(["assets/css/*.css", "assets/js/*.js", '*views/*.html'], {
        proxy: {
            target: "localhost:3000"
        }
    });
});

// Clean
gulp.task('clean', function(cb) {
    del(['css'], cb)
});

// Default task
gulp.task('default', ['clean', 'browser-sync'], function() {
    gulp.start('styles');
});

// Watch
gulp.task('watch', ['browser-sync'], function() {

  gulp.watch('assets/scss/*.scss', ['styles']);

  gulp.watch('views/*.html');

});
