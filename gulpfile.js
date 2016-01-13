var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnext = require('cssnext');
var precss = require('precss');
var nesting = require('postcss-nesting');

var paths = {
    css: './src/*.css'
};

gulp.task('css', function() {
    var processors = [
        nesting,
        autoprefixer,
        cssnext,
        precss
    ];
    return gulp.src(paths.css)
        .pipe(postcss(processors))
        .pipe(gulp.dest('./css'));
});

gulp.task('watch', function(){
    gulp.watch(paths.css, ['css']);
});

