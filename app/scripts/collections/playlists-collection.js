define([
	'lodash',
  	'backbone',
  	'models/playlist-model'
], function(_, Backbone, PlaylistModel){
  var collection = Backbone.Model.extend({
  	model: PlaylistModel
  });
  // Return the model for the module
  return collection;
});

