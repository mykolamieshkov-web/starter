"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import browsersync from "browser-sync";
import watch from "gulp-watch";
import del from "del";

gulp.task("serve", () => {
    browsersync.init({
        server: "./dist/",
        port: 4000,
        notify: true
    });

    gulp.watch(paths.views.watch, gulp.parallel("views"));
    gulp.watch(paths.styles.watch, gulp.parallel("styles"));
    gulp.watch(paths.scripts.watch, gulp.parallel("scripts"));
    
    // Отслеживание с удалением для медиа-файлов
    watch(paths.images.watch, gulp.parallel("images"))
        .on('unlink', (filepath) => {
            const distPath = filepath.replace('src/', 'dist/');
            del.sync(distPath);
        });
    
    watch(paths.video.watch, gulp.parallel("video"))
        .on('unlink', (filepath) => {
            const distPath = filepath.replace('src/', 'dist/');
            del.sync(distPath);
        });
    
    watch(paths.sprites.watch, gulp.parallel("sprites"))
        .on('unlink', (filepath) => {
            const distPath = filepath.replace('src/img/sprites/', 'dist/img/sprites/');
            del.sync(distPath);
        });
    
    watch(paths.fonts.watch, gulp.parallel("fonts"))
        .on('unlink', (filepath) => {
            const distPath = filepath.replace('src/', 'dist/');
            del.sync(distPath);
        });
});