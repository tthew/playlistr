define([
	'lodash',
  	'backbone',
  	'../../components/Backbone.localStorage/backbone.localStorage'
], function(_, Backbone){
  return Backbone.Model.extend({
  	localStorage: new Backbone.LocalStorage('plstr-playlists'),
  	defaults: {
      playing: false
    }
  });
  
});
