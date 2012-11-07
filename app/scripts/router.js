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
  // Views
  "views/playlists-view"
],
/**
 * Application Router
 * @name    Router
 * @class   Router
 * @constructor
 * @return {Backbone.Router} Backbone.Router
 */
function(app, vent, PlaylistsView, PlaylistView) {

  var Router = Backbone.Router.extend({
    /**
     * Routes
     * @memberOf Router
     * @type {Object}
     */
    routes: {
      "": "index",
      "add_sound/*uri": "add_sound"
    },

    /**
     * Index route handler
     * @memberOf Router
     */
    index: function() {
      console.log(this);
    },

    /**
     * add_sound route handler
     * @memberOf Router
     */
    add_sound: function(uri) {
      // use route path data to pre-populate form
      $("#plstr-bookmarklet-helper-modal input[name=uri]").val(uri);

      /**
       * Display modal
       * @see http://twitter.github.com/bootstrap/javascript.html#modals
       */
      $("#plstr-bookmarklet-helper-modal").modal("show");
    }
  });

  return Router;

});
