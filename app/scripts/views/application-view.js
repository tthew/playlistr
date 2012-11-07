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
  'collections/sounds-collection'
], 
/**
 * Application View
 * @name    ApplicationView
 * @class   ApplicationView
 * @constructor
 * @return {Object} Backbone.View
 */
function(_, Backbone, Marionette, vent, Sounds){
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
  		'click #plstr-new-playlist-modal .plstr-close' : 'closeModal'
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
     * Close modal dialog
     * @memberOf ApplicationView
     * @see http://twitter.github.com/bootstrap/javascript.html#modals
     */
  	closeModal: function() {
  		this.$('#plstr-new-playlist-modal').modal('hide');
  	}
  });

});
