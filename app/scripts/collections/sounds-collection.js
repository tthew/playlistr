define([
	'lodash',
  'backbone',
  'vent',
  'models/sound-model',
  '../../components/Backbone.localStorage/backbone.localStorage'

], function(_, Backbone, Vent, Sound){
 	return Backbone.Collection.extend({
  		model: Sound,
  		localStorage: new Backbone.LocalStorage('plstr-playlists'),

  		initialize: function() {
        var self = this;
        this.fetch();
  		}
  	});
});

