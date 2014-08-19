var gulp = require('gulp');
gulp.task('publish', function() {
  gulp.src('src/images/**')
    .pipe(gulp.dest('build/images/'));
  gulp.src('src/fonts/**')
    .pipe(gulp.dest('build/fonts/'));
});
