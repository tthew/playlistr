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
      this.model.on('change', this.render, this);
    },

    click: function() {
      var self = this;
      
      
      SC.stream("/tracks/" + this.model.get('id'), function(sound) {
        var stopSound = function() {
          sound.stop();
          self.model.set('playing', false);
        };

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
            stopSound();  
          }
        });

        Vent.bind("sound:stop", function() {
          stopSound();
        });

        Vent.bind("sound:pause", function() {
          sound.pause();
        })

        Vent.bind("sound:resume", function() {
          sound.play();
        });

        if (!self.model.get('playing')) {
          sound.play();
          self.model.set('playing', true);
          Vent.trigger("sound:play", self.model);
        }
          
      })
    }

  });
  
});
