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
      // console.log(this);
      Vent.trigger("sound:play");
      this.model.set('playing', true);
      SC.stream("/tracks/" + this.model.get('id'), function(sound) {
        Vent.bind("sound:play", function() {
          sound.stop();
          self.model.set('playing', false);
        });
        sound.play();
      })
    }

  });
  
});
