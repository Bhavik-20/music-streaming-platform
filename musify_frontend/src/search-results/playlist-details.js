import React, { useState, useEffect } from "react";
import {
  fetchPlaylistDetails,
  fetchPlaylistTracks,
} from "../spotify-hook/spotifyApi";
import "./album-details.css";

const PlaylistDetails = ({ playlistID }) => {
  const [playlist, setPlaylist] = useState(null);
  const [tracks, setTracks] = useState([]);

  const msToMinSec = (durationMs) => {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = ((durationMs % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    const fetchPlaylistData = async () => {
      const playlistData = await fetchPlaylistDetails(playlistID);
      setPlaylist(playlistData);
      const playlistTracks = await fetchPlaylistTracks(playlistID);
      setTracks(playlistTracks);
    };
    fetchPlaylistData();
  }, [playlistID]);

  return (
    <div className="centered-container">
      {playlist && (
        <>
          <div id="album-info" className="row">
            <div className="album-image col">
              <img
                src={playlist.images[0].url}
                alt={playlist.name}
                width="200"
                height="200"
              />
            </div>
            <div className="album-details col">
              <h1>{playlist.name}</h1>
              <h3>Owner: {playlist.owner.display_name}</h3>
            </div>
          </div>
          <table className="centered-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Artists</th>
                <th>Length</th>
              </tr>
            </thead>
            <tbody>
              {tracks.map((track, i) => (
                <tr key={i} className="clickable-row">
                  <td>{track.name}</td>
                  <td>
                    {track.artists
                      ? track.artists.length > 1
                        ? ` ${track.artists
                            .map((artist) => artist.name)
                            .join(", ")}`
                        : `  ${track.artists[0].name}`
                      : "No artist information"}
                  </td>

                  <td>{msToMinSec(track.duration_ms)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default PlaylistDetails;
