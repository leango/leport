var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
gulp.task('dev', ['build'], function() {
  nodemon({
    script: 'bin/www',
    watch: ['src/less/app/index.less', 'routes/*.js'],
    ignore: ['build/'],
  }).on('change', 'build')
    .on('restart', function() {
      console.log('nodemon restart');
    });
});
