// Load plugins
var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    concatcss = require('gulp-concat-css'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    del = require('del');

// Styles
gulp.task('styles', function() {
    return gulp.src('css/**/*.css')
        .pipe(concatcss('styles.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/styles'))
        .pipe(notify({
            message: 'Styles task complete'
        }));
});

// Scripts
gulp.task('scripts', ['lint'], function() {
    return gulp.src('js/**/*.js')
        .pipe(concat('main.js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(notify({
            message: 'Scripts task complete'
        }));
});

// JSHint
gulp.task('lint', function() {
  return gulp.src('js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Images
gulp.task('images', function() {
    return gulp.src('img/**/*')
        .pipe(cache(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
});

// Watch
gulp.task('watch', function() {
    gulp.watch('css/**/*.css', ['styles']);
    gulp.watch('js/**/*.js', ['scripts']);
});

// Clean
gulp.task('clean', function() {
    //del(['dist/images', 'dist/scripts', 'dist/styles'], cb);
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images');
});