var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var del = require('del');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sequence = require('run-sequence');
var minifyJs = require('gulp-uglify');
var watch = require('gulp-watch');
var argv = require('yargs').argv;
var production = !!(argv.production);

var project = 'angular-toasty';

gulp.task('scripts', function() {
    return gulp.src(['js/**/module.js', 'js/**/*.js'], { cwd: './src'})
    	.pipe(concat(project + '.js'))
    	.pipe(gulp.dest('./dist'));
});

gulp.task('scripts:prod', function() {
	return gulp.src(['./dist/**/*.js', '!./dist/**/*.min.js'])
		.pipe(minifyJs({preserveComments: 'some'}))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./dist'));
});

gulp.task('styles', function() {
    return gulp.src('less/**/base.less', { cwd: './src'})
    	.pipe(less())
    	.pipe(concat(project + '.css'))
    	.pipe(autoprefixer('last 3 versions', 'ie 9'))
    	.pipe(gulp.dest('./dist'));
});

gulp.task('styles:prod', function() {
	return gulp.src(['./dist/**/*.css', '!./dist/**/*.min.css'])
		.pipe(minifyCss())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./dist'));
});

gulp.task('clean', function() {
	return del([
		'dist/**/*.*'
	]);
});

gulp.task('watch', function() {
    watch('./src/less/**/*.less', function() {
    	gulp.start('styles');
    });
    watch('./src/js/**/*.js', function() {
    	gulp.start('scripts');
    });
});

gulp.task('default', function () {
	if (production) {
		sequence('clean', ['styles', 'scripts'], ['scripts:prod', 'styles:prod']);
	} else {
		sequence(['styles', 'scripts'], 'watch');
	}
});