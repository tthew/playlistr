define([
	'lodash',
  	'backbone',
    'marionette',
    'vent',
  	'models/sound-model'
], function(_, Backbone, Marionette, Vent, Sound){
  return Marionette.ItemView.extend({
  	tagName: 'tr',
    template: _.template($('#plstr-tmpl-sound-item').html()),

    events: {
      "click": "click"
    },

    initialize: function() {
      var self = this;
      this.model.on('change', this.render, this);

      Vent.on("sound:play", function(model) {
        if (model.cid == self.model.cid) {
          self.stopSound
          self.streamSound();
        }
      });

      Vent.bind("sound:finished", function() {
        self.model.set("playing", false);
        self.className = '';
      });

      Vent.bind("sound:stop", function() {
        self.stopSound();
      });
    },

    stopSound: function() {
      if (this.sound) {
        this.sound.stop();
        this.model.set('playing', false);  
      }
    },

    streamSound: function() {
      var self = this;
      self.className = 'playing';
      SC.stream("/tracks/" + this.model.get('id'), function(sound) {
        self.sound = sound;
        Vent.bind("sound:play", function(model) {
          if (!model) {
            sound.play(); 
            return;
          }

          if (model.get('id') == self.model.get('id')) {
            if (self.model.get('playing') == false) {
              sound.play();            
            }
          } else {
            self.stopSound();  
          }
        });

        Vent.bind("sound:pause", function() {
          sound.pause();
        })

        Vent.bind("sound:resume", function() {
          sound.play();
        });

        if (!self.model.get('playing')) {
          sound.onPosition(self.model.get('duration') - 1000, function() {
            Vent.trigger("sound:finished");
            Vent.trigger("playlist:next", self.model);
          });

          sound.play();
          self.model.set('playing', true);
        }
          
      });
    },

    click: function() {
      var self = this;
      Vent.trigger("sound:stop");
      self.streamSound()
    }

  });
  
});
