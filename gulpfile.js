// System modules.
const path = require('path');

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
const shell = require('gulp-shell');
const onlyChangedFiles = require('gulp-changed');

const CWD = process.cwd();

const TEMPORAL_DIR = path.join(CWD, '.tmp');

const ASSETS_DIR = path.join(CWD, 'assets');
const ASSETS_FILES = `${ASSETS_DIR}/**/*`;

const CSS_DIR = `${TEMPORAL_DIR}/css`;

const SCSS_FILES = `${ASSETS_DIR}/scss/**/*.scss`;
const TEMP_SCSS_DIR = `${TEMPORAL_DIR}/scss`;

const ASSETS_FILES_WITHOUT_COMPILABLE_FILES = [
  ASSETS_FILES,
  `!${SCSS_FILES}`
];

gulp.task(
  'copy-assets',
  () => gulp.src(ASSETS_FILES_WITHOUT_COMPILABLE_FILES)
  .pipe(onlyChangedFiles(TEMPORAL_DIR))
  .pipe(gulp.dest(TEMPORAL_DIR))
);

// Styles
gulp.task('build:scss', function() {
  return gulp.src(SCSS_FILES)
  .pipe(onlyChangedFiles(TEMP_SCSS_DIR))
  .pipe(gulp.dest(TEMP_SCSS_DIR))
  .pipe(
    sass({ outputStyle: 'expanded' })
    .on('error', sass.logError)
  )
  .pipe(plumber())
  .pipe(autoprefixer({browsers: ['last 2 version']}))
  .pipe(gulp.dest(CSS_DIR))
  // NOTE: Reloads `*.css` files
  .pipe(browserSync.reload({ stream: true }))
  .pipe(rename({ suffix: '.min' }))
  .pipe(minifycss())
  .pipe(gulp.dest(CSS_DIR))
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

gulp.task('migrate', shell.task([
  'migrate'
]));

gulp.task('migrate:down', shell.task([
  'migrate down'
]));

// Default task
gulp.task('default', ['clean', 'browser-sync', 'copy-assets', 'watch', 'nodemon'], function() {
  gulp.start('build:scss');
});

// Watch
gulp.task('watch', function() {

  gulp.watch('assets/scss/*.scss', ['build:scss']);

  gulp.watch('views/*.html');

});
