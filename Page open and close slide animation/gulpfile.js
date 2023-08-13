var gulp = require("gulp");

var sass = require('gulp-sass')(require('sass'));
var sourcemaps = require('gulp-sourcemaps');

var browserify = require("browserify");
var source = require("vinyl-source-stream");
var tsify = require("tsify");


gulp.task('build-sass', function () {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist/css'));
});


gulp.task('build-ts', function () {
    return browserify({
        basedir: ".",
        debug: true,
        entries: ["./src/ts/main.ts"],
        cache: {},
        packageCache: {},
    })
        .plugin(tsify)
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(gulp.dest("./dist/ts"));
});

gulp.task("default", gulp.series(gulp.parallel("build-ts", "build-sass")));