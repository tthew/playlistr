define([
    'lodash',
  	'backbone',
    'marionette',
    'vent',
    'views/alert-view',
    'models/playlist-model',
    'views/playlist-detail-view',
    
], function(_, Backbone, Marionette, Vent, AlertView, Playlist, PlaylistDetailView){
  return Marionette.ItemView.extend({
  	tagName: 'li',
    template: _.template($('#plstr-tmpl-playlist-list-item').html()),

    events: {
      'click': 'click',
      'click li .delete': 'delete'
    },
  
    initialize: function() {
      console.log(Playlist);
      // var alert = new AlertView({'message': '\'<strong></strong>\' deleted succesfully','type':'success'});
      this.model.on('change', this.render, this);
    },

    click: function() {
      Vent.trigger('playlist:show', this.model);
    },

    delete: function() {
      var self = this;
      var title = this.model.get('title'); 
      if (confirm('Are you sure you want to delete \'' + title + '\'?\n\nThis action can not be un-done.')) {
        this.model.destroy({
          success: function() {
            var alert = new AlertView({'message': '\'<strong>' + title + '</strong>\' deleted succesfully','type':'success'});
          }
        });  
      } 
    }
  });
  
});
