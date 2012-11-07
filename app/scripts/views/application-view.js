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
  'collections/sounds-collection',
  'collections/playlists-collection',  
  // Templates
  'text!templates/bookmarklet.html'
], 
/**
 * Application View
 * @name    ApplicationView
 * @class   ApplicationView
 * @constructor
 * @return {Object} Backbone.View
 */
function(_, Backbone, Marionette, vent, Sounds, Playlists, bookmarkletTpl){
  'use strict';
  return Backbone.View.extend({
    /**
     * View DOM element
     * @type {Mixed}
     * @memberOf ApplicationView
     */
  	el: "body",

    /**
     * DOM event listeners
     * @type {Mixed}
     * @memberOf ApplicationView
     */
  	events: {
  		'submit form#plstr-new-playlist-modal' : 'newPlaylist',
      'submit form#plstr-bookmarklet-helper-modal' : 'addSoundToPlaylist',
  		'click #plstr-new-playlist-modal .plstr-close' : 'closeModal'
  	},

    /**
     * Constructor
     * @memberOf  ApplicationView
     */

    initialize: function() {
      this.$('.plstr-bookmarklet').append(_.template(bookmarkletTpl,{origin: window.location.origin}));
    },

    /**
     * Handle click event & trigger playlist:create global @event
     * @param  {Object} e Event
     * @memberOf ApplicationView
     */
  	newPlaylist: function(e) {
  		e.preventDefault();
  		
      // Trigger playlist:create application event
  		vent.trigger('playlist:create', {
  			title: this.$('form#plstr-new-playlist-modal input[name=title]').val(),
  			description: this.$('form#plstr-new-playlist-modal textarea[name=description]').val()
  		});

      // Close modal dialog
  		this.closeModal();
  	},

    /**
     * [addSoundToPlaylist description]
     */
    addSoundToPlaylist: function(e) {

      e.preventDefault();

      // Initialise Playlists Collection
      var playlists = new Playlists();
      // Retrieve Playlist by ID
      var playlist = playlists.get(this.$('form#plstr-bookmarklet-helper-modal select').val());

      if(!_.isUndefined(playlist)) {
        // Trigger playlist:addsoundbyurl application events
        vent.trigger("playlist:addsoundbyurl", {model: playlist, url: this.$('form#plstr-bookmarklet-helper-modal input[name=uri]').val()});  
        // Trigger playlist:show application event
        vent.trigger("playlist:show", playlist);
        // Hide modal dialog
        this.$('form#plstr-bookmarklet-helper-modal').modal('hide');
      }
      
    },

    /**
     * Close modal dialog
     * @memberOf ApplicationView
     * @see http://twitter.github.com/bootstrap/javascript.html#modals
     */
  	closeModal: function() {
  		this.$('#plstr-new-playlist-modal').modal('hide');
  	}
  });

});
