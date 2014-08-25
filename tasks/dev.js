var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
gulp.task('dev', ['build'], function() {
  nodemon({
    script: 'bin/www',
    watch: ['src', 'src/css', 'src/js', './', 'lib'],
    ignore: ['build/'],
  }).on('change', 'build');
});
