define([
	'lodash',
  	'backbone',
    'marionette'
], function(_, Backbone, Marionette){
  return Backbone.View.extend({
  	template: _.template($('#plstr-alert').html()),

    initialize: function() {
      if (_.isUndefined(this.options.message)) {
        throw new Error('Alert expected a message to display');
        return;
      }

      this.render();      
    },

    render: function() {
      var self = this;
      this.el = this.template(this.options);
      this.el = $(this.el).hide();
      $('body').append(this.el.fadeIn('slow'));

      setTimeout(function(){
        $('.alert').fadeOut();
      },3000);
    }
  });

});
