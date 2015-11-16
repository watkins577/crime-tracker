var gulp = require('gulp');
var ts = require('gulp-typescript');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

var tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', function () {
   return gulp.src('App/**/*.ts')
       .pipe(sourcemaps.init())
       .pipe(ts(tsProject))
       .pipe(sourcemaps.write())
       .pipe(gulp.dest('App/'))
       .pipe(browserSync.stream());
});

gulp.task('webServer', ['scripts'], function () {
   browserSync.init({
      server: './'
   });

   gulp.watch('App/**/*.ts', ['scripts']);
   gulp.watch('App/views/**/*.html', browserSync.reload);
});

gulp.task('default', ['webServer']);
