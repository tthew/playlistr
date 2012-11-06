define([
	'lodash',
  	'backbone',
    'marionette',
    'vent',
  	'models/playlist-model',
    'models/sound-model',    
    'views/sound-view',
    'views/alert-view',
    'collections/sounds-collection'
    // 'model/sound-model'
], function(_, Backbone, Marionette, Vent, Playlist, Sound, SoundView, AlertView, SoundsCollection){
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

      self.model.on('change', self.render)
      self.collection.on('change', self.render);

      Vent.on('playlist:next', function(previousSound) {
        // Does next track exist?
        if (_.isObject(self.collection.models[_.indexOf(self.collection.models, previousSound) + 1])) {
          Vent.trigger('sound:stop');
          Vent.trigger('sound:play', self.collection.models[_.indexOf(self.collection.models, previousSound) + 1]);
        }
      });

      /* playlist:play application event listener */
      Vent.on('playlist:play', function() {
        console.log('playlist:play');
        console.log(self.collection);
        Vent.trigger('sound:stop');
        Vent.trigger('sound:play', self.collection.models[0]);
      });

    },

    stop: function() {
      Vent.trigger('sound:stop');
    },

    pause: function() {
      Vent.trigger('sound:pause');
    },

    play: function() {
      Vent.trigger('sound:play', this.collection.models[0]);
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
      var self = this,
          url;
      
      e.preventDefault();
      url = this.$('form#plstr-form-add-sound input[name=uri]').val();

      SC.get('/resolve', {url: url}, function(response) {
        if (_.has(response, 'errors')) {
          var alert = new AlertView({message:'Ohhhhh Snaaaaaaap! There was a problem loading that sound.  Are you sure it was a Soundcloud URL?','type':'error'});
          return;
        }

        if (_.has(response,'kind') && response.kind === 'track') {
          var sounds;
          response.playing = false;
          sounds = self.model.get('sounds') || [];
          sounds.push(response)
          self.model.save({'sounds':sounds});
          self.collection = new SoundsCollection(self.model.get('sounds'));
          Vent.trigger('playlist:show', self.model);
        } else {
          /* TODO: Handle Error */
          console.log('not a sound');
          console.log(response);
        }
      });
    }
  });
  
});
