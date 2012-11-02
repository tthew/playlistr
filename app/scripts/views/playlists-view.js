define([
	'lodash',
  	'backbone',
  	'collections/playlists-collection'
], function(_, Backbone, PlaylistsCollection){
  var view = Backbone.View.extend({
  	el: '.sidebar',
  	collection: PlaylistsCollection,
  	template: _.template($('#plstr-tmpl-playlists').html()),
  
  	render: function() {
		$(this.el).html(this.template({
			playlists: this.collection.toJSON()
		}));
  	}
  });
  // Return the model for the module
  return view;
});
