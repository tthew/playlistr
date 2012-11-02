define([
	'lodash',
  	'backbone',
  	'models/playlist-model'
], function(_, Backbone, Playlist){
  var view = Backbone.View.extend({
  	el: '.detail',
  	model: Playlist,
  	template: _.template($('#plstr-tmpl-playlist-new-modal').html()),
  
  	render: function() {
		$(this.el).html(this.template());
  	}
  });
  // Return the model for the module
  return view;
});
