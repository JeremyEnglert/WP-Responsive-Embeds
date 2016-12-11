// GULP PACKAGES
// Most packages are lazy loaded
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    plugin = require('gulp-load-plugins')();
    
 
// GULP VARIABLES   
// Modify these variables to match your project needs   
// Select Foundation components, remove components project will not use
const BUILD = {
	scripts: [		
		// Place custom JS here, files will be concantonated, minified if ran with --production
		'build/js/**/*.js',
    ],
   
	// Scss files will be concantonated, minified if ran with --production
	styles: 'build/scss/**/*.scss',
		
	// Images placed here will be optimized
	images: 'build/images/**/*'
};

const ASSETS = {
	styles: 'assets/css/',
	scripts: 'assets/js/',
	images: 'assets/images/'
};

// GULP TASKS
// See package.json for more info on running these tasks

// JSHint, concat, and minify JavaScript
gulp.task('scripts', function() {
	return gulp.src(BUILD.scripts)
		.pipe(plugin.plumber(function(error) {
		    gutil.log(gutil.colors.red(error.message));
		    this.emit('end');
		}))
		.pipe(plugin.babel({
			presets: ['es2015'],
			compact: true
		}))
		.pipe(plugin.jshint())
		.pipe(plugin.jshint.reporter('jshint-stylish'))
		.pipe(plugin.concat('scripts.js'))
		.pipe(gulp.dest(ASSETS.scripts))
});   

// Compile Sass, Autoprefix and minify
gulp.task('styles', function() {
	return gulp.src(BUILD.styles)
		.pipe(plugin.plumber(function(error) {
		    gutil.log(gutil.colors.red(error.message));
		    this.emit('end');
		}))
		.pipe(plugin.sass())
		.pipe(plugin.autoprefixer({
		    browsers: ['last 2 versions'],
		    cascade: false
		}))
		.pipe(plugin.cssnano())
		.pipe(gulp.dest(ASSETS.styles))
}); 

// Optimize images, move into assets directory
gulp.task('images', function() {
	return gulp.src(BUILD.images)
		.pipe(plugin.imagemin())
		.pipe(gulp.dest(ASSETS.images))
});

// Browser-Sync watch files and inject changes
gulp.task('browsersync', function() {
    // Watch files
    var files = [
    	BUILD.styles, 
    	BUILD.scripts,
    	BUILD.images,
    	'**/*.php',
    ];

    browserSync.init(files, {
	    proxy: LOCAL_URL,
    });
    
    gulp.watch(BUILD.styles, gulp.parallel('styles'));
    gulp.watch(BUILD.scripts, gulp.parallel('scripts')).on('change', browserSync.reload);
    gulp.watch(BUILD.images, gulp.parallel('images'));

});

// Watch files for changes (without Browser-Sync)
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch(BUILD.styles, gulp.parallel('styles'));

  // Watch scripts files
  gulp.watch(BUILD.scripts, gulp.parallel('scripts'));

  
}); 

// Run styles, scripts and foundation-js
gulp.task('default', gulp.parallel('styles', 'scripts'));