define([

  // import the module to be tested
  'models/playlist-model',
  'models/sound-model',  
  'collections/playlists-collection',
  'collections/sounds-collection',  
    // Plugins
  'localStorage'

], function(Playlist, Sound, Playlists, Sounds) {
  'use strict';

  describe('Playlists', function() {
    beforeEach(function() {
        var self = this;
        localStorage.clear();  
        this.playlists = new Playlists();
        this.options = {
            data: {
                playlists: [
                    {
                        title: 'Test Playlist 1',
                        description: 'Test Playlist 1 Description'
                    },
                    {
                        title: 'Test Playlist 2',
                        description: 'Test Playlist 2 Description'
                    }               
                ],
                sounds: [
                    {
                        "kind": "track",
                        "id": 291,
                        "created_at": "2007/09/22 14:32:59 +0000",
                        "user_id": 183,
                        "duration": 274442,
                        "commentable": true,
                        "state": "finished",
                        "original_content_size": 48408864,
                        "sharing": "public",
                        "tag_list": "jazz",
                        "permalink": "soulhack",
                        "streamable": true,
                        "embeddable_by": "all",
                        "downloadable": true,
                        "purchase_url": "http://sonarkollektiv.com/tracks/DE-P96-02-01001/",
                        "label_id": 1771,
                        "purchase_title": null,
                        "genre": "Electronic",
                        "title": "Soulhack",
                        "description": "From the Soulhack album",
                        "label_name": "sonarkollektiv",
                        "release": "SK006",
                        "track_type": "original",
                        "key_signature": "",
                        "isrc": "DE-P96-02-01001",
                        "video_url": null,
                        "bpm": 92,
                        "release_year": 2003,
                        "release_month": 6,
                        "release_day": 2,
                        "original_format": "aiff",
                        "license": "all-rights-reserved",
                        "uri": "https://api.soundcloud.com/tracks/291",
                        "user": {
                        "id": 183,
                        "kind": "user",
                        "permalink": "forss",
                        "username": "Forss",
                        "uri": "https://api.soundcloud.com/users/183",
                        "permalink_url": "http://soundcloud.com/forss",
                        "avatar_url": "https://i1.sndcdn.com/avatars-000012778523-59quu3-large.jpg?d8c2b3b"
                        },
                        "label": {
                        "id": 1771,
                        "kind": "user",
                        "permalink": "sonar-kollektiv",
                        "username": "Sonar Kollektiv",
                        "uri": "https://api.soundcloud.com/users/1771",
                        "permalink_url": "http://soundcloud.com/sonar-kollektiv",
                        "avatar_url": "https://i1.sndcdn.com/avatars-000002354136-ilz13g-large.jpg?d8c2b3b"
                        },
                        "permalink_url": "http://soundcloud.com/forss/soulhack",
                        "artwork_url": "https://i1.sndcdn.com/artworks-000000001702-b6984d-large.jpg?d8c2b3b",
                        "waveform_url": "https://w1.sndcdn.com/AqFIRCAP7Arw_m.png",
                        "stream_url": "https://api.soundcloud.com/tracks/291/stream",
                        "download_url": "https://api.soundcloud.com/tracks/291/download",
                        "playback_count": 35261,
                        "download_count": 5771,
                        "favoritings_count": 489,
                        "comment_count": 139,
                        "attachments_uri": "https://api.soundcloud.com/tracks/291/attachments"
                    }               
                ]
            },
            helpers: {
                createPlaylistWithDummyData: function() {
                    var playlist = {};
                    self.playlists.create({
                        title: self.options.data.playlists[0].title,
                        description: self.options.data.playlists[0].description
                    }, 
                    {
                        success: function(model) {
                            playlist = model;
                        }
                    });
                    return playlist;
                }
            }
        };
    });

    it('should be initialised', function() {
        expect(this.playlists).to.be.an('object');
    });

    it('playlists can be created', function() {
        var playlist = this.options.helpers.createPlaylistWithDummyData();
        expect(playlist).to.be.an.instanceof(Playlist);
        expect(playlist.get('title')).to.equal(this.options.data.playlists[0].title);
        expect(playlist.get('description')).to.equal(this.options.data.playlists[0].description);
        expect(playlist.get('sounds')).to.be.an.instanceof(Sounds);
    });

    it('playlists can be edited', function() {
        var playlist = this.options.helpers.createPlaylistWithDummyData();

        playlist.set('title', this.options.data.playlists[1].title);
        playlist.set('description', this.options.data.playlists[1].description);        

        expect(playlist.get('title')).to.equal(this.options.data.playlists[1].title);
        expect(playlist.get('description')).to.equal(this.options.data.playlists[1].description);
    });

    it('can add sound', function() {
        var playlist = this.options.helpers.createPlaylistWithDummyData();

        playlist.get('sounds').create(this.options.data.sounds[0]);

        expect(playlist.get('sounds').at(0)).to.be.an.instanceof(Sound);
        expect(playlist.get('sounds').at(0).get('title')).to.equal(this.options.data.sounds[0].title);

    });

  });

});