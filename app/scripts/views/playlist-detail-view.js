define([
	'lodash',
  	'backbone',
    'marionette',
    'vent',
  	'models/playlist-model',
    'models/sound-model',    
    'views/sound-view',
    'views/alert-view',
    // 'model/sound-model'
], function(_, Backbone, Marionette, Vent, Playlist, Sound, SoundView, AlertView){
  return Marionette.CompositeView.extend({
  	template: _.template($('#plstr-tmpl-playlist-detail').html()),
    itemView: SoundView,
    itemViewContainer: 'tbody',
    events: {
      'click .stop': 'stop',
      'click .pause': 'pause',
      'click .play': 'play',
      'submit form#plstr-playlist-details': 'updateDetails',
      'submit form#plstr-form-add-sound': 'addSoundToPlaylist'
    },
  
    initialize: function() {
      var self = this;

      Vent.on('playlist:show', function(playlist) {
        console.log('show!');
        self.model = playlist;
        self.collection = new Backbone.Collection(playlist.get('sounds'));
        self.collection.on('change', self.render);
        self.model.on('change', self.render);
        // self.model.get('sounds').on('change', self.render);
        self.render();
      });




    },

    stop: function() {
      Vent.trigger('sound:stop');
    },

    pause: function() {
      Vent.trigger('sound:pause');
    },

    play: function() {
      Vent.trigger('sound:play');
    },

    updateDetails: function(e) {
      e.preventDefault();
      this.model.save(
        {
          title: this.$('#plstr-playlist-details input[name=title]').val(),
          description: this.$('#plstr-playlist-details textarea[name=description]').val()
        },
        {
          success: function() {
            var alert = new AlertView({message: 'Playlist details saved', type:'success'});
          }
        }
      );
    },

    addSoundToPlaylist: function(e) {
      var self = this;
      e.preventDefault();
      var url = this.$('form#plstr-form-add-sound input[name=uri]').val();
      SC.get('/resolve', {url: url}, function(response) {
        if (_.has(response, 'errors')) {
          var alert = new AlertView({message:'Ohhhhh Snaaaaaaap! There was a problem loading that sound.  Are you sure it was a Soundcloud URL?','type':'error'});
          return;
        }

        if (_.has(response,'kind') && response.kind === 'track') {
          
          response.playing = false;

          var sounds = self.model.get('sounds');
          sounds.push(response)
          self.model.save({'sounds':sounds});
          Vent.trigger('playlist:show', self.model);
          
         
          

        } else {
          console.log('not a sound');
          console.log(response);
        }
        
      });
    }
  });
  
});
