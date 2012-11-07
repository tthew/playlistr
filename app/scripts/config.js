/**
 * Playlistr 
 *
 * A Soundcloud playlisting application
 *
 * @package Playlistr
 * @author Matt Richards
 * @copyright Copyright (c) 2012, Matt Richards
 * @licence http://opensource.org/licenses/MIT
 * @link http://lucidmoon.co.uk
 */
require.config({
  // Initialize the application with the main application file.
  deps: ["main"],
  paths: {
    // JavaScript folders.
    libs: "../scripts/libs",
    plugins: "../scripts/plugins",
    // Libraries.
    jquery: "../scripts/libs/jquery",
    lodash: "../scripts/libs/lodash",
    backbone: "../scripts/libs/backbone",
    underscore: "../scripts/libs/underscore",
    marionette: "../components/backbone.marionette/lib/backbone.marionette",
    // Plugins
    localStorage: "../components/Backbone.localStorage/backbone.localStorage"
  },

  shim: {
    // Backbone library depends on lodash and jQuery.
    backbone: {
      deps: ["lodash", "jquery"],
      exports: "Backbone"
    },
    marionette: {
      deps: ['backbone'],
      exports: 'Backbone.Marionette'
    },
    'localStorage' : ['backbone']
  }
});
