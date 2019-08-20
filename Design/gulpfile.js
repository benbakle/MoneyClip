/// <binding ProjectOpened='default' />
const gulp = require('gulp'),
    pug = require('gulp-pug'), //https://www.npmjs.com/package/gulp-pug
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    fs = require("fs"),
    colors = require('colors'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    express = require('express'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    exec = require("child_process").exec,
    cleanCSS = require('gulp-clean-css');

const config = {
    vendors: [],
    browser_sync: {
        port: 8000,
        ui: 8080
    },
}

const log = (o, level = 0) => {
    if (level > 2)
        return;
    for (var p in o) {
        console.log(`${colors.red('prop:')}${p}: ${o[p]}`);
        if (o[p] != null && typeof o[p] == 'object') {
            try {
                console.log("DETAILS")
                log(o[p], level + 1);
            } catch (err) {
                console.log('CANT GET INFO')
            }
        }
    }
}

let router = express.Router();
let jsonServer = require("json-server");
let server = null;

const templateDistributionLocation = "./dist";
const webDistributionLocation = "../Web/wwwroot/src/assets/";

const html = (callback) => {
    console.log(colors.cyan('[HTML] Transpiling PUG'));

    return gulp.src(['./src/markup/**/*.pug', '!src/markup/content/**/*.pug', '!src/markup/grids/**/*.pug', '!src/markup/mixins/**/*.pug'])
        .pipe(
            pug({
                pretty: true,
                debug: false,
                compileDebug: false,
            }).on('error', function (err) {
                console.log('[HTML] ' + colors.bgWhite.red(err.toString()));
                console.log('[HTML] ' + colors.red(err.message));
                callback();
            })
        )
        .pipe(gulp.dest(templateDistributionLocation + '/'))
        .on('end', function () {
            console.log(colors.green('[HTML] Transpilation complete'));
            callback();
        });
};
const img = (callback) => {
    console.log(colors.cyan('[IMAGE] Copying Images'));
    return gulp.src('./src/img/**/*.*')
        .pipe(gulp.dest(templateDistributionLocation + '/img'))
        .on('error', function (err) {
            console.log('[IMAGE] ' + colors.red(err.toString()));
            callback();
        }).on('end', function () {
            callback();
        });
};
const font = () => {
    console.log('[FONT] ' + colors.cyan('Copying Fonts'));
    return gulp.src('./src/fonts/**/*.*')
        .pipe(gulp.dest(templateDistributionLocation + '/fonts'))
        .pipe(gulp.dest(webDistributionLocation + '/fonts'));
};
const js = (callback) => {
    console.log(colors.cyan('[JS] Bundling and Babeling JS'));
    var b = browserify({
        entries: './src/js/app.js',
        debug: true
    })
        .external(config.vendors)
        .transform('babelify', {
            presets: ['@babel/preset-env']
        });

    return b
        .bundle((err) => {
            if (err)
                console.log('[JS] ' + colors.red(err.toString()));

            if (callback)
                callback();
        })
        .pipe(source('app.min.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(uglify())
        .on('error', function (err) {
            console.log('[JS] ' + colors.red(err.toString()));
            callback();
        })
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(templateDistributionLocation + '/js'))
        .on('end', function () {
            callback();
        });
};
const jsv = (callback) => {
    console.log(colors.cyan('[JS V] Bundling and Babeling Vendor JS'));
    var b = browserify({
        debug: true
    }).transform('babelify', {
        presets: ['@babel/preset-env']
    });

    config.vendors.forEach(lib => {
        b.require(lib);
    });

    return b
        .bundle((err) => {
            if (err)
                console.log('[JS V] ' + colors.red(err.toString()));

            if (callback)
                callback();
        })
        .pipe(source('vendors.min.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(uglify())
        .on('error', function (err) {
            console.log('[JS V] ' + colors.red(err.toString()));
            callback();
        })
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(templateDistributionLocation + '/js'))
};
const scss = (callback) => {
    console.log(colors.cyan('[SCSS] Transpiling Sass to Css'));
    var postcss = require('gulp-postcss');
    var autoprefixer = require('autoprefixer');

    return bundle([
        './src/styles/global.scss'
    ], 'bundle.min.css');

    function bundle(source, dest) {
        return gulp.src(source)
            .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(concat(dest))
            .pipe(postcss([autoprefixer()]))
            .pipe(cleanCSS({
                compatibility: 'ie8'
            }))
            .pipe(sourcemaps.write('.'))
            .on('error', function (err) {
                console.log(colors.red('[SCSS] ' + err.toString()));
                callback();
            })
            .pipe(gulp.dest(templateDistributionLocation + '/css'))
            .pipe(gulp.dest(webDistributionLocation + '/css'))
            .pipe(browserSync.stream())
            .on('end', function () {
                callback();
            });

    }
};
const serve = (callback) => {
    console.log(colors.cyan('[SERVE] Says: standing up your server'));
    build_routes();
    browserSync.init({
        open: true,
        notify: true,
        logPrefix: 'Server Says:',
        server: {
            baseDir: "./dist/",
            index: "index.html"
        },
        browser: ["chrome"],
        middleware: [function (req, res, next) {
            router(req, res, next)
        }]
    }, function (err, bs) {
        console.log(colors.cyan('[SERVE] Says: hello'));
        callback();
    });
};
const build_routes = (cb) => {
    if (cb) cb();
};
const watch = (callback) => {
    console.log(colors.cyan('[WATCH] Watching...'));
    gulp.watch(['./src/markup/**/*.pug']).on('all', function (event, path, stats) {
        console.log(colors.yellow('File ' + path + ' ' + event));
        html(reload);
    });

    gulp.watch(['./src/styles/**/*.scss']).on('all', function (event, path, stats) {
        console.log(colors.yellow('File ' + path + ' ' + event));
        scss(() => {
            console.log(browserSync);
        });
    });

    gulp.watch(['./src/js/**/*.js']).on('all', function (event, path, stats) {
        console.log(colors.yellow('File ' + path + ' ' + event));
        js(reload);
    });

    gulp.watch(['./src/data/generate.js']).on('change', function (event, path, stats) {
        console.log(colors.yellow('File ' + path + ' ' + event));
        json(build_routes(createModels(reload)));
    });

    gulp.watch(['./src/img/**/*']).on('add', function (event, path, stats) {
        console.log(colors.yellow('File ' + path + ' ' + event));
        img(reload);
    });

    callback();
};

gulp.task('serve', gulp.series(gulp.parallel(html, scss, js, img, font), gulp.parallel(serve, watch)));
gulp.task('default', gulp.series(gulp.parallel(html, scss, js, img, font)));