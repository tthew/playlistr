/**
 * Playlistr 
 *
 * A Soundcloud playlisting application
 *
 * @package Playlistr
 * @author Matt Richards
 * @copyright Copyright (c) 2012, Matt Richards
 * @licence http://opensource.org/licenses/MIT
 * @link http://lucidmoon.co.uk
 */

define([
  // Libraries.
  "jquery",
  "lodash",
  "marionette",
  // Event Aggregator
  "vent",
  // Collections
  "collections/playlists-collection",
  "collections/sounds-collection",  
  // Views
  "views/playlists-view",
  "views/playlist-detail-view",
  "views/alert-view",
  // Plugins.
  "../components/bootstrap-js/bootstrap.js"
],
/**
 * Application
 * @name    App
 * @class   App
 * @constructor
 * @return {Object} Marionette.Application
 * @see https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.application.md
 */
function($, _, Marionette, Vent, PlaylistsCollection, SoundsCollection, PlaylistsView, PlaylistDetailView, AlertView) {

  // Initialise Application
  var app = new Marionette.Application();
  var playlistsCollection = new PlaylistsCollection();

  if (playlistsCollection.length == 0) {
    $("#plstr-new-playlist-modal").modal("show");
  }
  
  /**
   * Add regions to application
   * @see https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.region.md
   */
  app.addRegions({
    nav: '#plstr-nav',
    sidebar: '#plstr-sidebar',
    main: '#plstr-main'
  });

  /**
   * Add application initializer
   * @see https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.application.md
   */
  app.addInitializer(function() {
    var viewOptions = {
      collection: playlistsCollection
    }
    // Show Sidebar
    app.sidebar.show(new PlaylistsView(viewOptions));
  });

  /**
   * playlist:show application event listener
   * @see https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.eventaggregator.md   
   */
  Vent.on("playlist:show", function(playlist) {
    app.main.show(new PlaylistDetailView({
      model: playlist,
      collection: new SoundsCollection(playlist.get('sounds') || [])
    }));
  });

  /**
   * playlist:create application event listener
   * @see https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.eventaggregator.md   
   */
  Vent.bind('playlist:create', function(playlist) {
    playlistsCollection.create(playlist, {
      success: function() {
        var alert = new AlertView({'message': '\'<strong>' + playlist.title + '</strong>\' succesfully created','type':'success'});
      }
    });
  });

  // Development Helpers
  window.playlists = playlistsCollection;
  window.initDummyData = function() {
    window.clearDummyData();
    playlistsCollection.create({title:'Playlist 1', description: 'A soundcloud playlist', 'sounds': [{"playing":false,"kind":"track","id":65377514,"created_at":"2012/10/30 17:11:52 +0000","user_id":111752,"duration":373350,"commentable":true,"state":"finished","original_content_size":14924750,"sharing":"public","tag_list":"house housemusic bass 4x4 sexy jacking deep acid","permalink":"deficit-false-pretenses","streamable":true,"embeddable_by":"all","downloadable":false,"purchase_url":null,"label_id":null,"purchase_title":null,"genre":"House","title":"Deficit - False Pretences","description":"","label_name":"","release":"","track_type":"","key_signature":"","isrc":"","video_url":null,"bpm":null,"release_year":null,"release_month":null,"release_day":null,"original_format":"mp3","license":"all-rights-reserved","uri":"https://api.soundcloud.com/tracks/65377514","user":{"id":111752,"kind":"user","permalink":"deficit","username":"deficit","uri":"https://api.soundcloud.com/users/111752","permalink_url":"http://soundcloud.com/deficit","avatar_url":"https://i1.sndcdn.com/avatars-000024392908-jsbekr-large.jpg?f6d22d0"},"permalink_url":"http://soundcloud.com/deficit/deficit-false-pretenses","artwork_url":"https://i1.sndcdn.com/artworks-000033170738-hke9zb-large.jpg?f6d22d0","waveform_url":"https://w1.sndcdn.com/MEeL2t1fY6Uu_m.png","stream_url":"https://api.soundcloud.com/tracks/65377514/stream","playback_count":80,"download_count":0,"favoritings_count":4,"comment_count":8,"attachments_uri":"https://api.soundcloud.com/tracks/65377514/attachments"},{"playing":false,"kind":"track","id":60417523,"created_at":"2012/09/19 14:09:28 +0000","user_id":111752,"duration":221695,"commentable":true,"state":"finished","original_content_size":8865958,"sharing":"public","tag_list":"","permalink":"headhunter","streamable":true,"embeddable_by":"all","downloadable":false,"purchase_url":null,"label_id":null,"purchase_title":null,"genre":"","title":"Deficit - Headhunter","description":"","label_name":"","release":"","track_type":"","key_signature":"","isrc":"","video_url":null,"bpm":127,"release_year":null,"release_month":null,"release_day":null,"original_format":"mp3","license":"all-rights-reserved","uri":"https://api.soundcloud.com/tracks/60417523","user":{"id":111752,"kind":"user","permalink":"deficit","username":"deficit","uri":"https://api.soundcloud.com/users/111752","permalink_url":"http://soundcloud.com/deficit","avatar_url":"https://i1.sndcdn.com/avatars-000024392908-jsbekr-large.jpg?f6d22d0"},"permalink_url":"http://soundcloud.com/deficit/headhunter","artwork_url":"https://i1.sndcdn.com/artworks-000030614212-kdgp72-large.jpg?f6d22d0","waveform_url":"https://w1.sndcdn.com/4OiEVBZ5ee7n_m.png","stream_url":"https://api.soundcloud.com/tracks/60417523/stream","playback_count":264,"download_count":0,"favoritings_count":15,"comment_count":11,"attachments_uri":"https://api.soundcloud.com/tracks/60417523/attachments"},{"playing":false,"kind":"track","id":43566513,"created_at":"2012/04/18 18:34:49 +0000","user_id":111752,"duration":485818,"commentable":true,"state":"finished","original_content_size":19472732,"sharing":"public","tag_list":"","permalink":"2222-identity-crisis","streamable":true,"embeddable_by":"all","downloadable":true,"purchase_url":null,"label_id":null,"purchase_title":null,"genre":"","title":"Deficit - 2222 (Identity Crisis) (FREE D/L: MP3 320Kbps)","description":"","label_name":"","release":"","track_type":"","key_signature":"","isrc":"","video_url":null,"bpm":null,"release_year":null,"release_month":null,"release_day":null,"original_format":"mp3","license":"all-rights-reserved","uri":"https://api.soundcloud.com/tracks/43566513","user":{"id":111752,"kind":"user","permalink":"deficit","username":"deficit","uri":"https://api.soundcloud.com/users/111752","permalink_url":"http://soundcloud.com/deficit","avatar_url":"https://i1.sndcdn.com/avatars-000024392908-jsbekr-large.jpg?f6d22d0"},"permalink_url":"http://soundcloud.com/deficit/2222-identity-crisis","artwork_url":"https://i1.sndcdn.com/artworks-000021874154-3kxyqy-large.jpg?f6d22d0","waveform_url":"https://w1.sndcdn.com/6pT3qQCrX474_m.png","stream_url":"https://api.soundcloud.com/tracks/43566513/stream","download_url":"https://api.soundcloud.com/tracks/43566513/download","playback_count":206,"download_count":1,"favoritings_count":6,"comment_count":10,"attachments_uri":"https://api.soundcloud.com/tracks/43566513/attachments"}]});
    playlistsCollection.create({title:'Playlist 2', description: 'A soundcloud playlist', 'sounds': [{"playing":false,"kind":"track","id":60417523,"created_at":"2012/09/19 14:09:28 +0000","user_id":111752,"duration":221695,"commentable":true,"state":"finished","original_content_size":8865958,"sharing":"public","tag_list":"","permalink":"headhunter","streamable":true,"embeddable_by":"all","downloadable":false,"purchase_url":null,"label_id":null,"purchase_title":null,"genre":"","title":"Deficit - Headhunter","description":"","label_name":"","release":"","track_type":"","key_signature":"","isrc":"","video_url":null,"bpm":127,"release_year":null,"release_month":null,"release_day":null,"original_format":"mp3","license":"all-rights-reserved","uri":"https://api.soundcloud.com/tracks/60417523","user":{"id":111752,"kind":"user","permalink":"deficit","username":"deficit","uri":"https://api.soundcloud.com/users/111752","permalink_url":"http://soundcloud.com/deficit","avatar_url":"https://i1.sndcdn.com/avatars-000024392908-jsbekr-large.jpg?f6d22d0"},"permalink_url":"http://soundcloud.com/deficit/headhunter","artwork_url":"https://i1.sndcdn.com/artworks-000030614212-kdgp72-large.jpg?f6d22d0","waveform_url":"https://w1.sndcdn.com/4OiEVBZ5ee7n_m.png","stream_url":"https://api.soundcloud.com/tracks/60417523/stream","playback_count":264,"download_count":0,"favoritings_count":15,"comment_count":11,"attachments_uri":"https://api.soundcloud.com/tracks/60417523/attachments"},{"playing":false,"kind":"track","id":43566513,"created_at":"2012/04/18 18:34:49 +0000","user_id":111752,"duration":485818,"commentable":true,"state":"finished","original_content_size":19472732,"sharing":"public","tag_list":"","permalink":"2222-identity-crisis","streamable":true,"embeddable_by":"all","downloadable":true,"purchase_url":null,"label_id":null,"purchase_title":null,"genre":"","title":"Deficit - 2222 (Identity Crisis) (FREE D/L: MP3 320Kbps)","description":"","label_name":"","release":"","track_type":"","key_signature":"","isrc":"","video_url":null,"bpm":null,"release_year":null,"release_month":null,"release_day":null,"original_format":"mp3","license":"all-rights-reserved","uri":"https://api.soundcloud.com/tracks/43566513","user":{"id":111752,"kind":"user","permalink":"deficit","username":"deficit","uri":"https://api.soundcloud.com/users/111752","permalink_url":"http://soundcloud.com/deficit","avatar_url":"https://i1.sndcdn.com/avatars-000024392908-jsbekr-large.jpg?f6d22d0"},"permalink_url":"http://soundcloud.com/deficit/2222-identity-crisis","artwork_url":"https://i1.sndcdn.com/artworks-000021874154-3kxyqy-large.jpg?f6d22d0","waveform_url":"https://w1.sndcdn.com/6pT3qQCrX474_m.png","stream_url":"https://api.soundcloud.com/tracks/43566513/stream","download_url":"https://api.soundcloud.com/tracks/43566513/download","playback_count":206,"download_count":1,"favoritings_count":6,"comment_count":10,"attachments_uri":"https://api.soundcloud.com/tracks/43566513/attachments"}]});
    playlistsCollection.create({title:'Playlist 3', description: 'A soundcloud playlist', 'sounds': [{"playing":false,"kind":"track","id":43566513,"created_at":"2012/04/18 18:34:49 +0000","user_id":111752,"duration":485818,"commentable":true,"state":"finished","original_content_size":19472732,"sharing":"public","tag_list":"","permalink":"2222-identity-crisis","streamable":true,"embeddable_by":"all","downloadable":true,"purchase_url":null,"label_id":null,"purchase_title":null,"genre":"","title":"Deficit - 2222 (Identity Crisis) (FREE D/L: MP3 320Kbps)","description":"","label_name":"","release":"","track_type":"","key_signature":"","isrc":"","video_url":null,"bpm":null,"release_year":null,"release_month":null,"release_day":null,"original_format":"mp3","license":"all-rights-reserved","uri":"https://api.soundcloud.com/tracks/43566513","user":{"id":111752,"kind":"user","permalink":"deficit","username":"deficit","uri":"https://api.soundcloud.com/users/111752","permalink_url":"http://soundcloud.com/deficit","avatar_url":"https://i1.sndcdn.com/avatars-000024392908-jsbekr-large.jpg?f6d22d0"},"permalink_url":"http://soundcloud.com/deficit/2222-identity-crisis","artwork_url":"https://i1.sndcdn.com/artworks-000021874154-3kxyqy-large.jpg?f6d22d0","waveform_url":"https://w1.sndcdn.com/6pT3qQCrX474_m.png","stream_url":"https://api.soundcloud.com/tracks/43566513/stream","download_url":"https://api.soundcloud.com/tracks/43566513/download","playback_count":206,"download_count":1,"favoritings_count":6,"comment_count":10,"attachments_uri":"https://api.soundcloud.com/tracks/43566513/attachments"}]});
    
  };
  window.clearDummyData = function() {
    playlistsCollection.each(function(model) {
      model.destroy();
    });
  };

  return app;

});
