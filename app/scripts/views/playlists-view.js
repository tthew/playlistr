define([
	'lodash',
  	'backbone',
    'marionette',
  	'collections/playlists-collection',
    'views/playlist-list-item-view'
], function(_, Backbone, Marionette, PlaylistsCollection, PlaylistListItemView){
  return Marionette.CompositeView.extend({
  	template: _.template($('#plstr-tmpl-playlists').html()),
    itemView: PlaylistListItemView,
    itemViewContainer: 'ul'
  });

});
