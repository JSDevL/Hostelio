var gulp = require("gulp");
var uglify = require("gulp-uglify");
var cleanCSS = require('gulp-clean-css');
var sass = require('gulp-sass');
var livereload = require("gulp-livereload");
var concat = require("gulp-concat");

// tasks for vendor script files
gulp.task("vendorScripts", function(){
    console.log("happening");
    gulp.src('public/vendor/js/*.js')
        //.pipe(concat('allVendor.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('public/build/js/'));
});

// tasks for SCSS files
gulp.task("scss", function(){
    gulp.src('public/css/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('public/build/css/'));
});

// tasks for js files
gulp.task("scripts", function(){
    gulp.src("public/js/**/*.js")
        //.pipe(uglify())
        .pipe(gulp.dest("public/build/js/"));
});

// livereload tasks

gulp.task("html:livereload", function(){
    gulp.src('public/**/*.html').pipe(livereload({auto:false}));
});
gulp.task("scss:livereload", function(){
    gulp.src('public/css/**/*.scss').pipe(livereload({auto:false}));
});
gulp.task("scripts:livereload", function(){
    gulp.src('public/js/**/*.js').pipe(livereload({auto:false}));
});

// default task

gulp.task('default', function(){
    gulp.start("build");
    gulp.start("watch");
});

gulp.task("build", function(){
    gulp.start("vendorScripts");
    gulp.start("scripts");
    gulp.start("scss");
});

gulp.task("watch", function(){
    livereload.listen();
    gulp.watch('public/**/*.html', ['html:livereload']);
    gulp.watch('public/css/**/*.scss', ['scss', 'scss:livereload']);
    gulp.watch('public/js/**/*.js', ['scripts', 'scripts:livereload']);
});
