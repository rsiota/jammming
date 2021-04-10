import React, { useState, useEffect } from 'react';
import Spotify from '../../util/Spotify.js';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

function App(props) {

  const [playlistName, setPlaylistName] = useState('My Playlist');
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);

  function addTrack(track) {
    const found = playlistTracks.some(el => el.id === track.id);
    if (found) { return; };
    setPlaylistTracks([...playlistTracks, track]);
  }

  function removeTrack(track) {
    var filteredTracks = playlistTracks.filter(function(el) {
      return el.id != track.id;
    });
    setPlaylistTracks(filteredTracks);
  }

  function updatePlaylistName(name) {
    setPlaylistName(name);
  }

  function savePlaylist() {
    const trackURIs = playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      setPlaylistTracks([]);
      setPlaylistName('New Playlist');
    });
  }

  function search(term) {
    let tracks = playlistTracks;
    Spotify.search(term).then((searchResults) => {
      let difference = searchResults.filter(
        (x) => !tracks.some((track) => track.id === x.id));
      setSearchResults(difference);
    });
  }

  function useEffect() {
    window.addEventListener('load', () => { Spotify.getAccessToken() });
  }

  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar
          onSearch={search}
        />
        <div className="App-playlist">
          <SearchResults
            searchResults={searchResults}
            onAdd={addTrack}
          />
          <Playlist
            playlistName={playlistName}
            onNameChange={updatePlaylistName}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onSave={savePlaylist}
          />

        </div>
      </div>
    </div>

  );
}

export default App;