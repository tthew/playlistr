define([
	'lodash',
  	'backbone',
  	'marionette',
  	'vent',
    'collections/sounds-collection'
], function(_, Backbone, Marionette, vent, Sounds){
  return Backbone.View.extend({
  	el: "body",
  	events: {
  		'submit form#plstr-new-playlist-modal' : 'newPlaylist',
  		'click #plstr-new-playlist-modal .plstr-close' : 'closeModal'
  	},
  	newPlaylist: function(e) {
  		e.preventDefault();
  		
  		vent.trigger('playlist:create', {
  			title: this.$('form#plstr-new-playlist-modal input[name=title]').val(),
  			description: this.$('form#plstr-new-playlist-modal textarea[name=description]').val(),
        // sounds: new Sounds()
  		});

  		this.closeModal();

  	},

  	closeModal: function() {
  		this.$('#plstr-new-playlist-modal').modal('hide');
  	}
  });

});
