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

require([
  // Application.
  "app",
  // Router.
  "router",
  // Views
  "views/application-view"
],
/**
 * Main module
 * @name    Main
 * @class   Main
 * @constructor
 */
function(Playlistr, Router, ApplicationView) {
  /**
   * Start application
   * @see https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.application.md
   */
  Playlistr.start();

  /**
   * Initialise application Router
   * @type {Object}
   */
  Playlistr.router = new Router();

  /**
   * Start backbone History
   */
  Backbone.history.start();

  /**
   * Initialise application view
   */
  var view = new ApplicationView();
});
