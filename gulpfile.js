var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnext = require('cssnext');
var precss = require('precss');
var nesting = require('postcss-nesting');
var cssnano = require('cssnano');
var htmlmin = require('gulp-htmlmin');
var smoosher = require('gulp-smoosher');
var sequence = require('run-sequence');

var paths = {
    css: 'src/*.css',
    html: 'src/*.html'
};

gulp.task('css', function() {
    var processors = [
        nesting,
        autoprefixer,
        cssnext,
        precss,
        cssnano
    ];
    return gulp.src(paths.css)
        .pipe(postcss(processors))
        .pipe(gulp.dest('css'));
});

gulp.task('html',  function() {
    return gulp.src('src/*.html')
        .pipe(smoosher({ base: '.' }))
        .pipe(htmlmin({
            collapseWhitespace: true,
            conservativeCollapse: true,
            removeComments: true,
            collapseInlineTagWhitespace: true,
            collapseBooleanAttributes: true,
            removeAttributeQuotes: true,
            removeRedundantAttributes: true,
            removeEmptyAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            removeOptionalTags: true,
            minifyCSS: true
        }))
        .pipe(gulp.dest('.'));
});

gulp.task('csshtml', function() {
    sequence('css', 'html');
});

gulp.task('watch', function(){
    gulp.watch(paths.css, ['csshtml']);
    gulp.watch(paths.html, ['html']);
});

