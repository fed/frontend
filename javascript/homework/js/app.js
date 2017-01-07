'use strict';

requirejs.config({
  baseUrl: 'js',
  paths: {
    jquery: '../node_modules/jquery/dist/jquery.min'
  }
});

requirejs(['game'], function (game) {
  game.init();
});
