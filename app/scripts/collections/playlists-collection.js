define([
	'lodash',
  	'backbone',
    'vent',
  	'models/playlist-model',
    'views/alert-view',
  	'../../components/Backbone.localStorage/backbone.localStorage'

], function(_, Backbone, Vent, PlaylistModel, AlertView){
 	return Backbone.Collection.extend({
  		model: PlaylistModel,
  		localStorage: new Backbone.LocalStorage('plstr-playlists'),

  		initialize: function() {
  			var self = this;
        this.fetch();
        Vent.bind('playlist:create', function(playlist) {
          console.log(playlist);
          self.create({
            title: playlist.title,
            description: playlist.description
          },{
            success: function() {
              var alert = new AlertView({'message': '\'<strong>' + playlist.title + '</strong>\' succesfully created','type':'success'});
            }
          });
        })
  		}
  	});
});

