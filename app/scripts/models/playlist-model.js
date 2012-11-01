define([
	'lodash',
  	'backbone'
], function(_, Backbone){
  var model = Backbone.Model.extend({
  	'title': '',
  	'description': '',
  	'sounds': []
  });
  // Return the model for the module
  return model;
});
