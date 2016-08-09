const gulp = require('gulp');
const eslint = require('gulp-eslint');
const webpack = require('webpack-stream');
const sass = require('gulp-sass');
const minifyCss = require('gulp-minify-css');


const files = ['**.js'];

gulp.task('webpack:dev', () => {
  gulp.src('js/entry.js')
    .pipe(webpack({
      devtool: 'source-map',
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('./build'));
});


gulp.task('static:dev', ['webpack:dev'], () => {
  gulp.src(['./**/**.html'])
   .pipe(gulp.dest('./build'));
});


gulp.task('lint', () => {
  return gulp.src(files)
    .pipe(eslint())
    .pipe(eslint.format());
});


gulp.task('sass:dev', () => {
  return gulp.src('sass/**/*.scss')
    .pipe(maps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCss())
    .pipe(maps.write())
    .pipe(gulp.dest('./build/css'));
});


gulp.task('image:dev', () => {
  gulp.src('images/*')
    .pipe(gulp.dest('./build/images'));
});

gulp.task('build:dev', ['webpack:dev', 'static:dev', 'sass:dev']);
gulp.task('style:dev', ['sass:dev', 'image:dev', 'build:dev']);

gulp.task('default', ['style:dev', 'build:dev', 'lint'])
