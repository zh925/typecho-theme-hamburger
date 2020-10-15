const gulp = require('gulp')
const concat = require('gulp-concat')
const mini = require('gulp-clean-css')
const sass = require('gulp-sass')
const rev = require('gulp-rev')
const revCollector = require('gulp-rev-collector')
const prefixer = require('gulp-autoprefixer')
const del = require('del')

var prefixerOptions = {
    overrideBrowserslist: ['last 2 versions']
}

gulp.task('clean', function(cb) {
    del(['build'])
    cb()
})

// css主包
gulp.task('pack:css:main', function(cb) {
    gulp.src(['./assets/**/*.scss'])
        .pipe(sass())
        .pipe(prefixer(prefixerOptions))
        .pipe(mini())
        .pipe(rev())
        .pipe(gulp.dest('./build/assets'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./temp/rev/css_main'))
    cb()
})

// 第三方库css打包
gulp.task('pack:css:dep', function(cb) {
    gulp.src(['./assets/lib/**/*.css'])
        .pipe(concat('bundle.css'))
        .pipe(mini())
        .pipe(gulp.dest('./build/assets/bundle.css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./temp/rev/css_bundle'))
    cb()
})

// 将文件中的引用按照manifest映射替换路径
gulp.task('hash', function(cb) {
    gulp.src(['./temp/rev/**/*.json', './**/*.php'])
        .pipe(revCollector())
        .pipe(gulp.dest('./build/'))
    cb()
})

// 打包
gulp.task('build', gulp.series('clean', gulp.parallel('pack:css:main', 'pack:css:dep'), 'hash'))

gulp.task('dev', function() {
    gulp.watch(['./assets/**/*.scss'], function(cb) {
        gulp.src('./assets/**/*.scss')
            .pipe(sass())
            .pipe(gulp.dest('./assets'))
        cb()
    })
})
