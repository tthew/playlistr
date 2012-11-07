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

define([
  // Application.
  "app",
  // Event Aggregator
  "vent",
  // Libraries
  "marionette"
],
/**
 * Application Router
 * @name    Router
 * @class   Router
 * @constructor
 * @return {Backbone.Router} Backbone.Router
 */
function(app, vent, Marionette) {
  'use strict';
  var Router = Marionette.AppRouter.extend({
    /**
     * Application Routes
     * @memberOf Router
     * @type {Object}
     */
    appRoutes: {
      "": "index",
      "playlist/:id": "playlist",
      "add_sound/*uri": "addSound"
    }

  });

  return Router;

});
