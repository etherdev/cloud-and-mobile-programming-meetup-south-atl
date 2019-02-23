var gulp = require('gulp'),

    // other plugins
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),


    // css plugins
    sass = require('gulp-ruby-sass'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer-core'),

    // js plugins
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

// Run browser sync
gulp.task('browser-sync', function() {
    browserSync({
        proxy: "http://localhost:9292"
    })
});


// Compile SASS
gulp.task('styles', function() {
  return sass('scss/main.scss', {
    require: "susy",
    style: "expanded"
  })
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 version'] }) ]))
    .pipe(gulp.dest('../public/css'))
    .pipe(reload({stream:true}));
});

// Compile JS
gulp.task('scripts', function() {
  gulp.src('js/*.js')
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(concat('common.js'))
    .pipe(plumber.stop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('../public/js/'))
    .pipe(reload({stream:true}))
});


// Concat Libs
gulp.task('libs', function() {
  return gulp.src([
    '../public/js/libs/slideout.min.js',
    '../public/js/libs/dataTables.min.js',
    '../public/js/libs/dataTables.buttons.min.js',
    '../public/js/libs/buttons.html5.min.js',
    '../public/js/libs/buttons.print.min.js',
    '../public/js/libs/jquery.validate.js',
    '../public/js/libs/cropper.min.js',
    '../public/js/libs/clipboard.min.js',
    '../public/js/libs/dataTables.responsive.min.js'
  ])
    .pipe(concat('libs.js'))
    .pipe(uglify())
    .pipe(gulp.dest('../public/js/'));
});


// Watch for changes
gulp.task('watch', function () {

    // Watch .scss files
    gulp.watch('scss/**/*.scss', ['styles']);

    // Watch .js files
    gulp.watch('js/*.js', ['scripts']);

    gulp.watch([
        '../templates/*.mustache',
        '../templates/**/*.mustache'
        ]).on('change', browserSync.reload);
});


gulp.task('default', ['styles', 'scripts', 'browser-sync', 'watch']);






