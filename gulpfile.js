var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('nodemon', function(){
  nodemon({
    script: 'app.js',
    ext: 'js html'
  }).on('restart');
});

gulp.task('default', ['nodemon']);
