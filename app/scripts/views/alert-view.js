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
  // Templates
  'text!templates/alert.html'
], 
/**
 * AlertView
 * @name    AlertView
 * @class   AlertView
 * @constructor
 * @return {Object} Backbone.View
 */
function(_, Backbone, Marionette, tpl){
  'use strict';
  return Backbone.View.extend({

    /**
     * template
     * @type {Mixed}
     * @memberOf AlertView
     */
    template: _.template(tpl),

    /**
     * Constructor
     * @memberOf AlertView
     */
    initialize: function() {
      if (_.isUndefined(this.options.message)) {
        throw new Error('AlertView: Expected a message but none was found');
        return;
      }
      this.render();
    },

    /**
     * Render the view
     * @memberOf AlertView
     * @todo implement solution for centered horizontal position (n.b $.width() will only return a width if the el exists in the DOM)
     * @todo refactor using Marionette regions, compositeviews and item views
     */
    render: function() {
      var self = this;

      // Parse template
      this.el = this.template(this.options);

      // Apply CSS
      this.el = $(this.el).hide().css({
        'position': 'fixed',
        'left': '40%',
        'top': '50px'
      });

      // Append to body
      $('body').append(this.el.fadeIn('slow'));

      // Hide
      setTimeout(function(){
        $('.alert').fadeOut();
      },3000);
    }
  });

});
