var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    notify = require("gulp-notify"),
    bower = require('gulp-bower');
var gsass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var config = {
    sassPath: './resources/sass',
    bowerDir: './bower_components',
    css: './public/css',
    html: './public/*.html'
}
gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest(config.bowerDir))
});
gulp.task('icons', function() {
    return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*')
        .pipe(gulp.dest('./public/fonts'));
});
gulp.task('css', function() {
    return gulp.src(config.sassPath + '/style.scss')
        .pipe(sass({
                style: 'compressed',
                loadPath: [
                    './resources/sass',
                    config.bowerDir + '/bootstrap-sass-official/assets/stylesheets',
                    config.bowerDir + '/fontawesome/scss',
                ]
            })
            .on("error", notify.onError(function(error) {
                return "Error: " + error.message;
            })))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('sass', function() {
    return gulp.src(config.sassPath + '/style.scss')
        .pipe(gsass({
                outputStyle: 'compressed',
                includePaths: [
                    './resources/sass',
                    config.bowerDir + '/bootstrap-sass-official/assets/stylesheets',
                    config.bowerDir + '/fontawesome/scss',
                ]
            })
            .on("error", notify.onError(function(error) {
                return "Error: " + error.message;
            })))
        .pipe(gulp.dest('./public/css'));
});
// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(config.sassPath + '/**/*.scss', ['sass']);
});

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./public"
    });

    gulp.watch(config.sassPath + '/**/*.scss', ['sass']);
    gulp.watch(config.html).on('change', reload);
    gulp.watch(config.css).on('change', reload);
});

gulp.task('default', ['bower', 'icons', 'css']);