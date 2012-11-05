define([
	'lodash',
  	'backbone',
  	'marionette',
  	'vent',
], function(_, Backbone, Marionette, Vent){
  return Backbone.View.extend({
  	el: "body",
  	events: {
  		'submit form#plstr-new-playlist-modal' : 'newPlaylist',
  		'click #plstr-new-playlist-modal .plstr-close' : 'closeModal'
  	},
  	newPlaylist: function(e) {
  		e.preventDefault();
  		
  		Vent.trigger('playlist:create', {
  			title: this.$('form#plstr-new-playlist-modal input[name=title]').val(),
  			description: this.$('form#plstr-new-playlist-modal textarea[name=description]').val()
  		});

  		this.closeModal();

  	},

  	closeModal: function() {
  		this.$('#plstr-new-playlist-modal').modal('hide');
  	}
  });

});
