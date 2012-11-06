define([
	'lodash',
  	'backbone',
    'marionette'
], function(_, Backbone, Marionette){
  return Backbone.View.extend({
  	template: _.template($('#plstr-alert').html()),

    initialize: function() {
      if (_.isUndefined(this.options.message)) {
        throw new Error('AlertView: Expected a message but none was found');
        return;
      }

      this.render();      
    },

    render: function() {
      var self = this;
      this.el = this.template(this.options);
      console.log($(this.el).outerWidth());
      this.el = $(this.el).hide().css({
        'position': 'fixed',
        'left': '40%',
        'top': '50px'
      });

      $('body').append(this.el.fadeIn('slow'));

      setTimeout(function(){
        $('.alert').fadeOut();
      },3000);
    }
  });

});
