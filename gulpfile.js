var gulp = require('gulp');
var webpack = require('webpack-stream');
var jshint = require('gulp-jshint');

gulp.task('webpack:test', function() {
  return gulp.src('./app/js/client.js')
             .pipe(webpack({
                             output: {
                                       filename: 'nibbles.js'
                                     }
                           }))
             .pipe(gulp.dest('build/'));
});

gulp.task('staticfiles:dev', function() {
  return gulp.src(['./app/**/*.html', './app/**/*.css'])
             .pipe(gulp.dest('build/'));
});

gulp.task('jshint', function() {
  return gulp.src(['!./node_modules/**/*', '**/*.js'])
             .pipe(jshint())
             .pipe(jshint.reporter('default'));
});

gulp.task('jscs',function() {
  return gulp.src('app/**/*.js')
             .pipe(jscs({fix: true}))
             .pipe(gulp.dest('app'));
});

gulp.task('watch', function() {
  return gulp.watch(['app/**/*'], ['build:dev']);
});

gulp.task('build:dev', ['staticfiles:dev', 'webpack:dev']);
gulp.task('default', ['lint', 'build:dev']);
gulp.task('lint', ['jshint', 'jscs']);
