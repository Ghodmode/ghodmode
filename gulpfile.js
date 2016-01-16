var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnext = require('cssnext');
var precss = require('precss');
var nesting = require('postcss-nesting');
var cssnano = require('cssnano');
var htmlmin = require('gulp-htmlmin');

var paths = {
    css: './src/*.css',
    html: './src/*.html'
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
        .pipe(gulp.dest('./css'));
});

gulp.task('htmlmin', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('.'))
});

gulp.task('watch', function(){
    gulp.watch(paths.css, ['css']);
    gulp.watch(paths.html, ['htmlmin']);
});

