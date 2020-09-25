// gulp version 4.0.0
// npm install --save-dev gulp-less gulp-sass gulp-watch gulp-autoprefixer gulp-cssmin gulp-rename browser-sync gulp-sourcemaps gulp-cheerio gulp-replace gulp-svg-sprite gulp-svgmin gulp.spritesmith gulp-babel

const gulp = require('gulp');
//const sass = require('gulp-sass');
const less = require('gulp-less');
const sourcemap = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const watch = require('gulp-watch');
const browserSync = require('browser-sync').create();
//-------------- svg
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
// ------------- png 
// const spritesmith = require('gulp.spritesmith');
// ------------- bable
const babel = require('gulp-babel');
// Static server
function lacal_host(done){
	browserSync.init({
		server: {
			baseDir: "./"
		},
		port: 300
	});
}
// less
function function_less(done){
	gulp.src('less/style.less')
	.pipe(less({errorLogToConsole: true}))
	.on('error', console.error.bind(console))
	.pipe(autoprefixer({
		overrideBrowserslist: ['last 4 versions'],
		cascade: false
	}))
	.pipe(gulp.dest('css/'))
	.pipe(cssmin())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('css/'))
	.pipe(browserSync.stream());
	// init
	done();
}
// reload function
function browerReload(done){
	browserSync.reload();
	// init
	done();
}
// svg sprite
function svg_icons(done){
	gulp.src('img/svg-icone/icons/*.svg')
	.pipe(svgmin({
		js2svg: {
			pretty: true
		}
	}))
	.pipe(
		cheerio({
		run: function($) {
				$('[fill]').removeAttr('fill');
				$('[stroke]').removeAttr('stroke');
				$('[style]').removeAttr('style');
			},
			parserOptions: {xmlMode: true}
		})
	)
	.pipe(replace('&gt;', '>'))
	.pipe(svgSprite(
		config = {
			mode: {
				symbol: {
					sprite: "icons_sprite.svg"
				}
			}
		}
	))
	.pipe(gulp.dest('img/'));
	// init
	done();
}
// bable
function bable_fun(done){
	gulp.src('js/*.js')
	.pipe(babel({
		presets: ['@babel/env']
	}))
	.pipe(gulp.dest('js/babel/'))
	// init
	done();
}
// watch function
function watch_fun(){
	// gulp.watch('scss/*.scss', function_css);
	gulp.watch('less/*.less', function_less);
	// reload browe
	gulp.watch('./**/*.html', browerReload);
	gulp.watch('./**/*.js', browerReload);
	gulp.watch('./**/*.php', browerReload);
	// svg
	gulp.watch('img/svg-icone/*/*.svg', svg_icons);
	// bable
	gulp.watch('js/*.js', bable_fun);
}
// init tasks
gulp.task('default', gulp.parallel(lacal_host, watch_fun));



// ----- not used
/*//scss
function function_css(done){
	gulp.src('scss/style.scss')
	.pipe(sass({errorLogToConsole: true}))
	.on('error', console.error.bind(console))
	.pipe(autoprefixer({cascade: false}))
	.pipe(gulp.dest('css/'))
	.pipe(cssmin())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('css/'))
	.pipe(browserSync.stream());
	// init
	done();
}
//png sprite
function png_icons(done){
	gulp.src('img/png-initial/*.png').pipe(spritesmith({
		imgName: 'sprite.png',
		cssName: 'sprite.css'
	}))
	.pipe(gulp.dest('img/png-sprite/'));
	// init
	done();
}*/