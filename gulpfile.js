'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');
var rename = require('gulp-rename');
var browserify = require('browserify');
var es6ify = require('es6ify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var karma = require('karma').server;
var concat = require('gulp-concat');
var del = require('del');

var config = {
    dist: './dist/app',
    distLib: './dist/lib',

    scripts: "js/**/*.js",
    sass: "assets/**/*.scss",

    cssLib: [
        'lib/bootstrap/dist/css/bootstrap.css',
        'lib/bootstrap/dist/css/bootstrap-theme.css'
    ]
};

gulp.task('lib-js', function () {
    return browserify()
        .require('underscore')
        .require('jquery')
        .require('angular')
        .require('bootstrap')
        .require('angular-bootstrap')
        .bundle()
        .on('error', function(e) { console.log(e) })
        .pipe(source('lib.js'))
        .pipe(gulp.dest(config.distLib + "/js"))
});

gulp.task('lib-css', function () {
    gulp.src(config.cssLib)
        .pipe(concat('lib.css'))
        .pipe(gulp.dest(config.distLib + "/css"));
});

gulp.task('lib', ['lib-js', 'lib-css'], function () {

});

gulp.task('server', function() {
    connect.server({
        livereload: true
    });
});

gulp.task('test', function(done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, function() {
        done();
    });
});

gulp.task('sass', function() {
    gulp.src(config.sass)
        .pipe(sass())
        .pipe(concat('app.css'))
        .pipe(gulp.dest(config.dist + "/css"));
});

gulp.task('compile',['sass'], function() {
    return compileScripts('./js/app.js');
});

gulp.task('dev', ['server', 'lib', 'compile'], function() {
    config.noMock = true;

    registerWatchers();
});

gulp.task('build', ['lib', 'compile'], function() {

});

function registerWatchers() {
    if(config.noMock)
        gulp.watch(config.scripts, ['test', 'compile']);
    else
        gulp.watch(config.scripts, ['test', 'compile-mock']);

    gulp.watch(config.sass, ['sass']);

    gulp.watch(['dist/**']).on('change', function(file) {
        gulp.src( 'dist/**')
            .pipe( connect.reload() );

    });
}

function compileScripts(entryFile) {
    es6ify.traceurOverrides = {experimental: true};

    var bundler = browserify(entryFile);

    bundler.external('underscore');
    bundler.external('jquery');
    bundler.external('angular');
    bundler.external('bootstrap');
    bundler.external('angular-bootstrap');
    bundler.transform(es6ify);


    var stream = bundler.bundle({ debug: true});

    stream.on('error', function (err) { console.error(err) });
    stream = stream.pipe(source(entryFile));
    stream.pipe(rename('app.js'));

    stream.pipe(gulp.dest(config.dist + "/js"));
    return stream;
}