var elixir = require('laravel-elixir');

elixir.config.assetsPath = 'src/styles';

elixir((mix) => {
  mix.sass([
    'app.scss'
  ], 'src/styles/css/3rd-party.css');
  mix.styles([
    '3rd-party.css'
  ], 'public/css/app.css');
});
