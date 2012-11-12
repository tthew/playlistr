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
   // Libraries
  'lodash',
  'backbone',
  'marionette',
  // Event Aggregator
  'vent',
  // Collections
  'collections/playlists-collection',
  // Views
  'views/application-view',
  // Templates
  'text!templates/playlists-select.html'
], 
/**
 * Application Controller
 * @name    ApplicationController
 * @class   ApplicationController
 * @constructor
 * @return {Object} Controller
 */
function(_, Backbone, Marionette, vent, Playlists, ApplicationView, PlaylistSelectTpl) {
    'use strict';
    
    /**
     * Controller public API
     * @type {Object}
     */
    var Controller = {}

    /**
     * Initialise Application View
     * @type {ApplicationView}
     * @memberOf ApplicationController
     */
    Controller.view = new ApplicationView();

    /**
     * Application index route handler
     * @memberOf ApplicationController
     */
    Controller.index = function() {
      vent.trigger('app:show');
      vent.trigger('app:region:close:main');
    };

    /**
     * Application playlist route handler
     * @param  {String} playlistId [description]
     * @memberOf ApplicationController
     */
    Controller.playlist = function(playlistId) {
      var playlists = new Playlists();
      var model = playlists.get(playlistId);
      if (!_.isUndefined(model)) {
        vent.trigger("playlist:show", model);
      } else {
        vent.trigger("playlist:notfound");
      }
    };

    /**
     * Application add_sound route handler
     * @param {String} uri [description]
     * @memberOf ApplicationController
     */
    Controller.addSound =function(uri) {
      // use route path data to pre-populate form
      $("#plstr-bookmarklet-helper-modal input[name=uri]").val(uri);

      var playlists = new Playlists();
      var template = _.template(PlaylistSelectTpl, {list: playlists.toJSON()});

      // Replace DOM placeholder with parsed template
      $("#plstr-bookmarklet-helper-modal .plstr-playlists-select").replaceWith(template);

      /**
       * Display modal
       * @see http://twitter.github.com/bootstrap/javascript.html#modals
       */
      $("#plstr-bookmarklet-helper-modal").modal("show");
    };

    /** Trigger app:show application event */
    vent.trigger("app:show");

    return Controller;

});