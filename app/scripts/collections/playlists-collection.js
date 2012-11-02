define([
	'lodash',
  	'backbone',
  	'models/playlist-model',
  	'../../components/Backbone.localStorage/backbone.localStorage'

], function(_, Backbone, PlaylistModel){
 	return Backbone.Collection.extend({
  		model: PlaylistModel,
  		localStorage: new Backbone.LocalStorage('plstr-playlists'),

  		initialize: function() {
  			this.fetch();
  		}
  	});
});

