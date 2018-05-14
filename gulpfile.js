var gulp = require('gulp');
var gs =require('gulp-sass');
var ap= require('autoprefixer')
var gc= require('gulp-concat');
var gm= require('gulp-minify');
var merge = require('gulp-merge');

gulp.task('default', function() {
	gulp.watch('resources/assets/styles/sass/*.scss',['styles']);
	gulp.watch('resources/assets/scripts/**/*.js',['scripts']);
});

gulp.task('scripts', function(){
	gulp.src('resources/assets/scripts/**/*.js')
		.pipe(gc('output.js'))
		.pipe(gm())
        .pipe(gulp.dest('./public/assets/js'));
})

gulp.task('styles', function(){
                var sassS,cssS;
                sassS=gulp.src('resources/assets/styles/sass/**/*.scss ')
		.pipe(gs().on('error',gs.logError))

                cssS= gulp.src('resources/assets/styles/css/**/*.css')

                merge(sassS,cssS)
                .pipe(gm())
		.pipe(gc('main.css'))
		.pipe(gulp.dest('public/assets/css'));
});
