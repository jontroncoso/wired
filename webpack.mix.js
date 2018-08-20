let mix = require('laravel-mix');
require('laravel-mix-eslint');

mix.react('resources/assets/js/app.js', 'public/js')
    .eslint({
        fix: false,
        cache: false,
    })
   .sass('resources/assets/sass/app.scss', 'public/css');
