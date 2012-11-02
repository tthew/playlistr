define([
	'lodash',
  	'backbone',
    'marionette',
    'vent',
  	'models/playlist-model',
    'views/sound-view',
], function(_, Backbone, Marionette, Vent, Playlist, SoundView){
  return Marionette.CompositeView.extend({
  	template: _.template($('#plstr-tmpl-playlist-detail').html()),
    itemView: SoundView,
    itemViewContainer: 'tbody',
    events: {
      'click li': 'click'
    },
  
    initialize: function() {
      var self = this;
      Vent.on('playlist:show', function(playlist) {
        self.model = playlist;
        self.collection = new Backbone.Collection(playlist.get('sounds'));
        console.log(self.collection);
        self.render();
      })
    },

    click: function() {
      // Vent.trigger('playlist:show', this.model);
    }
  });
  
});
