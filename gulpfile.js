// gulpfile for workflow. Adds a watch task, starts a local server for development and compiles SASS files.


var gulp = require('gulp'),
    connect = require('gulp-connect');
var sass = require('gulp-sass');


var config = { //begins the cofiguration settings for the setup of our front end workflow
    port: 9010,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './*.html',
        js: './js/**/*.js'
    }
};

gulp.task('connect', function() {
    connect.server({
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
});

gulp.task('html', function () {
    gulp.src('./*.html')
        .pipe(connect.reload());
});

gulp.task('js', function () {
    gulp.src('./js/**/*.js')
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(['./*.html']);
    gulp.watch(['./js/**/*.js'], ['js']);
    gulp.watch('./scss/**/*.scss', ['sass']);

});

gulp.task('sass', function () {
    return gulp.src('./scss/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

gulp.task('default', ['connect', 'watch', 'sass']);