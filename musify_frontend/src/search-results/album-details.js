import React, { useState, useEffect } from "react";
import { Container, InputGroup, FormControl, Button, Row, Card } from "react-bootstrap";
import { fetchAlbumDetails, fetchAlbumTracks } from "../spotify-hook/spotifyApi";

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
    <>
      {album && (
        <>
          <div id="album-info" className="row">
            <div className="col-3">
              <img src={album.images[0].url} alt={album.name} width="200" height="200" />
            </div>
            <div className="col-5">
              Album <br />
              <h1>{album.name}</h1> <br />
              {album.artists.map((artist, i) => (
                <b key={i}>{artist.name + " "}</b>
              ))}
              {album.release_date}
            </div>
          </div>
          <table>
            <tr>
              <th>Title</th>
              <th>Artists</th>
              <th>Length</th>
            </tr>
            {tracks.map((track, i) => (
              <tr key={i}>
                <td>{track.name}</td>
                <td>
                  {track.artists.length > 1
                    ? ` ${track.artists.map((artist) => artist.name).join(", ")}`
                    : `  ${track.artists[0].name}`}
                </td>
                <td>{msToMinSec(track.duration_ms)}</td>
              </tr>
            ))}
          </table>
        </>
      )}
    </>
  );
};

export default AlbumDetails;
