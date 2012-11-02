// Set the require.js configuration for your application.
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
  },

  shim: {
    // Backbone library depends on lodash and jQuery.
    '../components/Backbone.localStorage/backbone.localStorage' : ['backbone'],
    
    backbone: {
      deps: ["lodash", "jquery"],
      exports: "Backbone"
    },

    marionette: {
      deps: ['backbone'],
      exports: 'Backbone.Marionette'
    },

    // Backbone.LayoutManager depends on Backbone.
    // "plugins/backbone.layoutmanager": ["backbone"],
    // "../components/backbone.marionette/lib/backbone.marionette": ["backbone"]
  }

});
