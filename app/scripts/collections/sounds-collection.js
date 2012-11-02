define([
	'lodash',
  'backbone',
  'models/sound-model',
  '../../components/Backbone.localStorage/backbone.localStorage'

], function(_, Backbone, Sound){
 	return Backbone.Collection.extend({
  		model: Sound,
  		localStorage: new Backbone.LocalStorage('plstr-playlists'),

  		initialize: function() {
  			this.fetch();
  		}
  	});
});

