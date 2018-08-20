let mix = require('laravel-mix');
require('laravel-mix-eslint');

mix.react('resources/assets/js/index.jsx', 'public/js')
    .eslint({
        fix: false,
        cache: false,
    })
   .sass('resources/assets/sass/app.scss', 'public/css');
