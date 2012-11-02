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
      'click .stop': 'stop',
      'click .pause': 'pause',
      'click .play': 'play'      
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

    stop: function() {
      Vent.trigger('sound:stop');
    },

    pause: function() {
      Vent.trigger('sound:pause');
    },

    play: function() {
      Vent.trigger('sound:play');
    }
  });
  
});
