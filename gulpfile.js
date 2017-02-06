var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require("gulp-rename");
var browserSync = require('browser-sync').create();
var uglify = require("gulp-uglify");

gulp.task('browser-sync', ['sass', 'minify-js'], function () {
    browserSync.init({
        server: {
            baseDir: "./",
            index: "app.html"
        },

    });
});

gulp.task('sass', function () {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({stream: true}));
});


gulp.task('minify-js', function () {
    gulp.src('js/app.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('js'));
});

gulp.task('watch', ['browser-sync'], function () {
    gulp.watch("scss/*.scss", ['sass']).on('change', browserSync.reload);
    gulp.watch("js/*.js", ['minify-js']).on('change', browserSync.reload);
    gulp.watch("*.html").on('change', browserSync.reload);
});