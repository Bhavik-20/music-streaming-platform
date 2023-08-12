import React, { useState, useEffect } from "react";
import { fetchAlbumDetails, fetchAlbumTracks } from "../spotify-hook/spotifyApi";
import "./album-details.css";

const AlbumDetails = ({ albumID }) => {
  const [album, setAlbum] = useState(null);
  const [tracks, setTracks] = useState([]);

  const msToMinSec = (durationMs) => {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = ((durationMs % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    const fetchAlbumData = async () => {
      const albumData = await fetchAlbumDetails(albumID);
      setAlbum(albumData);
      const albumTracks = await fetchAlbumTracks(albumID);
      setTracks(albumTracks);
    };
    fetchAlbumData();
  }, [albumID]);

  return (
    <div className="centered-container">
      {album && (
        <>
          <div id="album-info" className="row">
            <div className="album-image col">
              <img src={album.images[0].url} alt={album.name} width="200" height="200" />
            </div>
            <div className="album-details col">
              <h1>{album.name}</h1>
              {album.artists.map((artist, i) => (
                <b key={i}>{artist.name + " "}</b>
              ))}
              {album.release_date}
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
                    {track.artists.length > 1
                      ? ` ${track.artists.map((artist) => artist.name).join(", ")}`
                      : `  ${track.artists[0].name}`}
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

export default AlbumDetails;
