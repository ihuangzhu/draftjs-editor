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

const sassSrc = 'src/sass/**/*.scss';
gulp.task('css', function(){
    return gulp.src([sassSrc, './node_modules/draft-js/dist/Draft.css'])
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
    gulp.watch(sassSrc, ['css']);
});

gulp.task('default', [ 'fonts', 'html', 'css']);