var gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    livereload = require('gulp-livereload'),
    plumber = require('gulp-plumber'),
    imagemin = require('gulp-imagemin'),
    browserify = require('gulp-browserify'),
    pump = require('pump');

//JS compression
gulp.task('js', function () {
  gulp.src('src/script/main.js')
  .pipe(plumber())
  .pipe(browserify({
    insertGlobals : true,
  }))
  .pipe(uglify())
  .pipe(gulp.dest('dist/script'))
  .pipe(browserSync.reload({stream:true}));
});

//Sass compression
gulp.task('sass', function() {
  gulp.src('src/scss/*.scss')
  .pipe(plumber())
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(gulp.dest('src/style'))
  .pipe(gulp.dest('dist/style'))
  .pipe(browserSync.reload({stream:true}));
});

//Image compression
gulp.task('image', function() {
  gulp.src('src/images/*')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/images'))
  .pipe(browserSync.reload({stream:true}));
});

//HTML compression
gulp.task('htmlmin', function() {
  gulp.src('src/*.html')
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest('dist'))
  .pipe(browserSync.reload({stream:true}));
});

//Gulp watch
gulp.task('watch', function() {
  var server = livereload();
  gulp.watch('src/script/*.js', ['js']);
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch("src/*.html", ['htmlmin'])
});

//Browser-sync
gulp.task('browser-sync', function() {
    browserSync.init(null, {
        server: {
            baseDir: "dist"
        }
    });
});



//"One to rule them all"
gulp.task('default', ['htmlmin', 'sass', 'js', 'image', 'watch', 'browser-sync']);
