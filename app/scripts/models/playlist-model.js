define([
	'lodash',
  	'backbone',
  	'collections/sounds-collection'
  	// '../../components/Backbone.localStorage/backbone.localStorage'
], function(_, Backbone, SoundsCollection){
	return Backbone.Model.extend({
		// localStorage: new Backbone.LocalStorage('plstr-playlists'),
		defaults: {
			'title': '',
			'description': '',
			'sounds': ''
		}
  		
	});
  	
});
