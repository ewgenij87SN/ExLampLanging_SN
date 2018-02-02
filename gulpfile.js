var   gulp = require('gulp'),
	browserSync = require("browser-sync").create(),
	less = require("gulp-less"),
      notify = require('gulp-notify'),
      plumber = require('gulp-plumber'),
      pug = require('gulp-pug');

gulp.task("server", ['less', 'pug'], function () {
	browserSync.init({
		server: { baseDir: './app/' }
	});
      gulp.watch('app/**/*.html').on('change', browserSync.reload);
	gulp.watch('app/js/**/*.js').on('change', browserSync.reload);
      gulp.watch('app/less/**/*.less', ['less'] );
      gulp.watch('app/pug/**/*.pug', ['pug'] );
});

gulp.task('less', function() {
    return gulp.src('./app/less/**/main.less')
      .pipe(plumber({
            errorHandler: notify.onError(function(err){
                  return {
                        title: 'Styles',
                        message: err.message
                  }
            })
      }))
      .pipe(less())
      .pipe(gulp.dest('./app/css'))
      .pipe(browserSync.stream());
});

gulp.task('pug', function() {
    return gulp.src('./app/pug/*.pug')
      .pipe(plumber({
            errorHandler: notify.onError(function(err){
                  return {
                        title: 'Pug',
                        message: err.message
                  }
            })
      }))
      .pipe(pug({
            pretty: true
      }))
      .pipe(gulp.dest('./app'))
      .pipe(browserSync.stream());
});

gulp.task('default', ['server']);


