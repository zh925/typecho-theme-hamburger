const gulp = require('gulp')
const concat = require('gulp-concat')
const mini = require('gulp-clean-css')
const sass = require('gulp-sass')
const rev = require('gulp-rev')
const revCollector = require('gulp-rev-collector')
const prefixer = require('gulp-autoprefixer')
const del = require('del')

var prefixerOptions = {
    browsers: ['last 2 versions']
};

gulp.task('clean', function() {
    return del(['build'])
})

// css主包
gulp.task('pack:css:main', function() {
    return gulp.src(['./assets/sass/**/*.scss'])
        .pipe(sass())
        .pipe(prefixer(prefixerOptions))
        .pipe(mini())
        .pipe(rev())
        .pipe(gulp.dest('./build/bundle.css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./temp/rev/css_main'))
})

// 第三方库css打包
gulp.task('pack:css:dep', function() {
    return gulp.src(['./assets/lib/**/*.css'])
        .pipe(concat('bundle.css'))
        .pipe(mini())
        .pipe(gulp.dest('./build/bundle.css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./temp/rev/css_bundle'))
})

// 将文件中的引用按照manifest映射替换路径
gulp.task('hash', function() {
    return gulp.src(['./temp/rev/**/*.json', './**/*.php'])
        .pipe(revCollector())
        .pipe(gulp.dest('./build/'))
})

// 打包
gulp.task('build', gulp.series('clean', gulp.parallel('pack:css:main', 'pack:css:dep'), 'hash'))

gulp.task('dev', function() {
    return gulp.watch(['./assets/**/*.scss'], function() {
        gulp.src('./assets/**/*.scss')
            .pipe(sass())
            .pipe(gulp.dest('./assets'))
    })
})
