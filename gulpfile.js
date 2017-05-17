'use strict';

var gulp = require('gulp'),
    notify = require('gulp-notify'),
    reporter = require('postcss-browser-reporter'),
    eslint = require('gulp-eslint'),
    stylelint = require('stylelint'),
    browserSync = require('browser-sync').create(),
    postcss = require('gulp-postcss'),
    nested = require('postcss-nested'),
    short = require('postcss-short'),
    autoprefixer = require('gulp-autoprefixer'),
    rimraf = require('rimraf');



gulp.task('styles', function () {

    var processors = [

        nested,
        short,
        stylelint(),
        reporter({
            selector: 'body:before'
        })
    ];

    return gulp.src('./source/css/main.css')
        .pipe(postcss(processors)).on('error', notify.onError({
            title: 'Style'
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('./build/assets/css/'))
        .pipe(browserSync.stream());
});

gulp.task('normalize', () => {
    return gulp.src('node_modules/normalize.css/normalize.css')
        .pipe(gulp.dest('./build/assets/css/'))
});

gulp.task('esLint', () => {
    return gulp.src('./source/js/main.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .on('error', notify.onError({
            message: "JS Debug Mode ON, fix it please"
        }));

});

// gulp.task('js', () => {
//     return gulp.src('./source/js/main.js')
//         .pipe(gulp.dest('./build/assets/js'));
// });

gulp.task('html', () => {
    return gulp.src('./source/index.html')
        .pipe(gulp.dest('./build/'));
});

gulp.task('images', function () {
    return gulp.src('./source/images/**/*.*', {
            since: gulp.lastRun('images')
        })
        .pipe(gulp.dest('./build/assets/images'));
});

gulp.task('serve', () => {
    browserSync.init({
        open: false,
        server: './build'
    });
    browserSync.watch(['./build' + '/**/*.*', '!**/*.css'], browserSync.reload);
});

gulp.task('clean', cb => {
    return rimraf('./build', cb);
});

gulp.task('watch', () => {
    gulp.watch('./source/js/**/*.js', gulp.series('esLint'));
    gulp.watch('./source/css/**/*.css', gulp.series('styles'));
    gulp.watch('./source/index.html', gulp.series('html'));
});

gulp.task('default', gulp.series(
    'clean',
    gulp.parallel(
        'styles',
        'normalize',
        //'js',
        'html',
        'images',
        'esLint'),
    gulp.parallel(
        'watch',
        'serve'
    )
));