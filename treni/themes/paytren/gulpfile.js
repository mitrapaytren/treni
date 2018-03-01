'use strict';

var gulp = require('gulp');

// gulp plugins and utils
var gutil = require('gulp-util');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// postcss plugins
var cssnext = require("postcss-cssnext");
var cssnano = require('cssnano');
var lost = require('lost');
var atImport = require('postcss-import');

var swallowError = function swallowError(error) {
    gutil.log(error.toString());
    gutil.beep();
    this.emit('end');
};



gulp.task('css', function () {
    var plugins = [
        atImport,
        lost(),
        cssnext({
            'browsers': ['last 2 version'],
        }),
        //cssnano({ autoprefixer: false })
    ];
    gulp.src('src/postcss/*.css')
        .on('error', swallowError)
        .pipe(sourcemaps.init())
        .pipe(postcss(plugins))
        .pipe(sourcemaps.write('.'))
        .pipe(rename("theme.min.css"))
        .pipe(gulp.dest('static/css/'))
        .pipe(reload({
            stream: true
        }));
});
gulp.task('amp', function () {
    var plugins = [
        atImport,
        lost(),
        cssnext({
            'browsers': ['last 2 version'],
        }),
        //cssnano({ autoprefixer: false })
    ];
    gulp.src('src/postcss/amp.css')
        .on('error', swallowError)
        .pipe(sourcemaps.init())
        .pipe(postcss(plugins))
        .pipe(sourcemaps.write('.'))
        .pipe(rename("style.html"))
        .pipe(gulp.dest('layouts/partials/'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('scripts', function() {
	return gulp.src(['src/js/plugin/*.js', 'src/js/base.js'])
		.pipe(uglify())
		.pipe(concat('theme.min.js'))
		.pipe(gulp.dest('static/js'));
});


/*gulp.task('ghost_config', ['scripts'], function() {
	return gulp.src(['src/js/config.js', 'static/js/theme.min.js'])
		.pipe(concat('theme.min.js'))
		.pipe(gulp.dest('static/js'));
});*/

/* Reload task */
gulp.task('bs-reload', function () {
    browserSync.reload();
});

/* Prepare Browser-sync for localhost */
gulp.task('browser-sync', function () {
    browserSync({
        proxy : 'http://localhost:1313',
    });
});


gulp.task('watch', function () {
    gulp.watch('src/postcss/**', ['css', 'amp']);
    gulp.watch('src/js/*.js', ['scripts']);

    /* Watch .hbs files, run the bs-reload task on change. */
    gulp.watch(['./**/*.html'], ['bs-reload']);
});

/*gulp.task('default', ['css', 'scripts', 'ghost_config', 'browser-sync', 'watch']);*/
gulp.task('default', ['css', 'amp', 'scripts', 'browser-sync', 'watch']);