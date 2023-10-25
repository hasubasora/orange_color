const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass')); // 引入 Sass 编译器
const rename = require('gulp-rename'); // 引入 gulp-rename 插件
function compileSass() {
  return gulp.src('css/*.scss') // 要监视的 SCSS 文件路径
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError)) // 编译 SCSS 到压缩格式
    .pipe(rename('bootstrap.min.css')) // 指定输出的文件名
    .pipe(gulp.dest('css')); // 保存编译后的文件到指定目录
}

function watch() {
  gulp.watch('css/*.scss', compileSass); // 监视 SCSS 文件的更改
}

exports.compileSass = compileSass;
exports.watch = watch;

gulp.task('default', gulp.series(compileSass, watch));
