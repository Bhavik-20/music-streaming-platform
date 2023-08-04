// src/TrackList.js
import React from 'react';
import { playTrack } from '../spotify-hook/spotifyApi';

const TrackList = ({ tracks }) => {
  const handlePlayTrack = (trackUri) => {
    playTrack(trackUri);
  };

  return (
    <div>
      {tracks.map((track) => (
        <div key={track.id} className="track-item">
          <img src={track.album.images[0].url} alt={track.name} />
          <div className="track-info">
            <p>{track.name}</p>
            <p>{track.artists.map((artist) => artist.name).join(', ')}</p>
          </div>
          <button onClick={() => handlePlayTrack(track.uri)}>Play</button>
        </div>
      ))}
    </div>
  );
};

export default TrackList;
