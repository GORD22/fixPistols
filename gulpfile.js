const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const avif = require('gulp-avif');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const svgSprite = require('gulp-svg-sprite');
const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');
const include = require('gulp-include');

function pages() {
    return src('src/pages/*.html')
        .pipe(include({
            includePaths: 'src/components'
        }))
        .pipe(dest('src'))
        .pipe(browserSync.stream())
}

function fonts() {
    return src('src/fonts/resources/*.*')
        .pipe(fonter({
            formats: ['woff', 'ttf']
        }))
        .pipe(src('src/fonts/*.ttf'))
        .pipe(ttf2woff2())
        .pipe(dest('src/fonts'))
}

function images() {
    return src(['src/images/resources/*.*', '!src/images/resources/*.svg'])
        .pipe(newer('src/images'))
        .pipe(avif({ quality: 50 }))

        .pipe(src('src/images/resources/*.*'))
        .pipe(newer('src/images'))
        .pipe(webp())

        .pipe(src('src/images/resources/*.*'))
        .pipe(newer('src/images'))
        .pipe(imagemin())

        .pipe(dest('src/images'))
}

function sprite() {
    return src('src/images/*.svg')
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: '../sprite.svg',
                    example: true
                }
            }
        }))
        .pipe(dest('src/images'))
}

function scripts() {
    return src('src/js/componentsScripts/*.js')
        .pipe(concat('main.js'))
        .pipe(dest('src/js'))
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('src/js'))
        .pipe(browserSync.stream())
}

function styles() {
    return src('src/scss/style.scss')
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 version'] }))
        .pipe(concat('style.min.css'))
        .pipe(scss({ outputStyle: 'compressed' }))
        .pipe(dest('src/css'))
        .pipe(browserSync.stream())
}

function watching() {
    browserSync.init({
        server: {
            baseDir: 'src/'
        }
    });
    watch(['src/scss/style.scss', 'src/scss/componentsStyle/*.scss'], styles)
    watch(['src/images/resources'], images)
    watch(['src/js/componentsScripts/*.js'], scripts)
    watch(['src/components/*', 'src/pages/*'], pages)
    watch(['src/*.html']).on('change', browserSync.reload)
}

function cleanDist() {
    return src('build')
        .pipe(clean())
}

function building() {
    return src([
        'src/css/style.min.css',
        'src/images/*.*',
        '!src/images/*.svg',
        'src/images/sprite.svg',
        'src/fonts/*.*',
        'src/js/main.min.js',
        'src/**/*.html'
    ], { base: 'src' })
        .pipe(dest('build'))
}

exports.styles = styles;
exports.images = images;
exports.sprite = sprite;
exports.fonts = fonts;
exports.pages = pages;
exports.building = building;
exports.scripts = scripts;
exports.watching = watching;

exports.build = series(cleanDist, building);

exports.default = parallel(styles, images, scripts, pages, watching)