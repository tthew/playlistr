define([
  'lodash',
  'backbone',
  'marionette'
], function(_, Backbone, Marionette){
  
  var region = Marionette.Region.extend({
    el: "#plstr-modal",

    constructor: function(){
      _.bindAll(this);
      Backbone.Marionette.Region.prototype.constructor.apply(this, arguments);
    
      this.on("view:show", this.showModal, this);
    },

    getEl: function(selector){
      var $el = $(selector);
      $el.on("hidden", this.close);
      return $el;
    },

    showModal: function(view){
      console.log(view);
      // console.log('show');
      // view.on("close", this.hideModal, this);
      // this.$el.modal('show');
      // console.log(this.$el.modal);
      // $('#plstr-new-playlist-modal').modal('show');
    },

    hideModal: function(){
      this.$el.modal('hide');
    }
  });

  return region;

});