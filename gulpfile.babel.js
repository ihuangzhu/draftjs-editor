import gulp from 'gulp';
import pug from 'gulp-pug';
import sass from 'gulp-sass';
import minifyCSS from 'gulp-csso';

const pugSrc = 'src/templates/*.pug';
gulp.task('html', function(){
    return gulp.src(pugSrc)
        .pipe(pug())
        .pipe(gulp.dest('dist/html'));
});

const stylesSrc = [
    'src/sass/**/*.scss',
    './node_modules/draft-js/dist/Draft.css'
];
gulp.task('styles', function(){
    return gulp.src(stylesSrc)
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/css'));
});

const fontsSrc = 'node_modules/font-awesome/fonts/**/*';
gulp.task('fonts', function(){
    return gulp.src(fontsSrc)
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('watch', () => {
    gulp.watch(pugSrc, ['html']);
    gulp.watch(stylesSrc, ['styles']);
});

gulp.task('default', ['html', 'styles', 'fonts']);