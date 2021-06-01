const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

function style() {
    return gulp.src('./scss/main.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./css'));
};

function watch() {
    gulp.watch('./scss/**/*.scss', style);
    gulp.watch('./scss/**/*.scss', style);
};

exports.watch = watch;