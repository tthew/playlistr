define([
	'lodash',
  	'backbone',
    'marionette',
    'vent',
  	'models/playlist-model'
], function(_, Backbone, Marionette, Vent, Playlist){
  return Marionette.ItemView.extend({
  	tagName: 'li',
    template: _.template($('#plstr-tmpl-playlist-list-item').html()),

    events: {
      'click li': 'click'
    },
  
    initialize: function() {
      this.model.on('change', this.render, this);
    },

    click: function() {
      Vent.trigger('playlist:show', this.model);
    }
  });
  
});
