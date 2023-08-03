import React, { useState, useEffect } from "react";
import { Container, InputGroup, FormControl, Button, Row, Card } from "react-bootstrap";

const AlbumDetails = ({ albumID, spotifyApi }) => {
  const [album, setAlbum] = useState(null);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    // Function to fetch album details
    const fetchAlbumDetails = async () => {
      try {
        const data = await spotifyApi.getAlbum(albumID);
        setAlbum(data);
        console.log(album);

      } catch (error) {
        console.error("Error fetching album details:", error);
      }
    };
    const fetchAlbumTracks = async () => {
        try {
          const data = await spotifyApi.getAlbumTracks(albumID);
          setTracks(data.items);
        } catch (error) {
          console.error("Error fetching album tracks:", error);
        }
      };

    fetchAlbumDetails();
    fetchAlbumTracks();

  }, [albumID, spotifyApi]);

  const msToMinSec = (durationMs) => {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = ((durationMs % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <>
      {album && (
        <>
        <div id="album-info" className="row">
          <div  className="col-3">
            <img src={album.images[0].url} alt={album.name} width="200" height="200" />
          </div>
          <div className="col">
            Album <br/>
            <h1>{album.name}</h1> <br/>
            {album.artists.map((artist, i) => {
            return (
                <>
                <b>{artist.name + " "}</b>
                </>
            );
          })}
          {album.release_date}
            
          </div>
        </div>
        <table>
         <tr>
            <th>Title</th>
            <th>Artists</th>
            <th>Length</th>
         </tr>
         {tracks.map((track) => (
            <tr>
                <td>
                    {track.name}
                </td>
                <td>
                {track.artists.length > 1
              ? ` ${track.artists.map((artist) => artist.name).join(", ")}`
              : `  ${track.artists[0].name}`}
                </td>
                <td>
                {msToMinSec(track.duration_ms)}
                </td>
                <hr/>
            </tr>
         ))}
         
      </table>
        </>
      )}
    </>
  );
};

export default AlbumDetails;



