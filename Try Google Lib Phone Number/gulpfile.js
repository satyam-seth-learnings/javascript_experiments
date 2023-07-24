// gulpfile.js
const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const babelify = require('babelify');

gulp.task('scripts', function () {
    return browserify({
        entries: 'src/index.js', // Replace 'src/index.js' with the path to your main JavaScript file
        debug: true,
        transform: [babelify.configure({ presets: ['@babel/preset-env'] })],
    })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.series('scripts'));
