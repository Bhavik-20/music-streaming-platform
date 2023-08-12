import React, { useState, useEffect } from "react";
import { fetchTrackDetails, fetchArtistAlbums
} from "../spotify-hook/spotifyApi";
import "./album-details.css";
import {
    Container,
    Row,
    Card,
  } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";

const TrackDetails = () => {
  const [track, setTrack] = useState(null);
  const [albums, setAlbums] = useState([]);
  const {trackID} = useParams();

  const msToMinSec = (durationMs) => {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = ((durationMs % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    const fetchTrackData = async () => {
      const trackData = await fetchTrackDetails(trackID);
      setTrack(trackData);
    };
    
    const fetchAlbums = async () => {
      if (track && track.artists) {
        const albumsData = await fetchArtistAlbums(track.artists[0].id);
        setAlbums(albumsData);
      }
    };
  
    fetchTrackData();
    fetchAlbums();
  }, [trackID, track]);
  

  return (
    <div className="centered-container">
      {track && (
        <>
          <div id="album-info" className="row">
            <div className="album-details">
                Track <br/>
              <h1>{track.name}</h1>
              {track.artists.map((artist, i) => (
                <b key={i}>{artist.name + " "}</b>
              ))}
            </div>
          </div>
          <div className="album-details">
          <h3>More by {track.artists[0].name}</h3>
          <Container style={{ marginTop: "10px" }}>
        <Row className="mx-2 row row-cols-6">
          {albums.map((album, i) => {
            return (
                <Link to={`/albums/${album.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Card
                  style={{
                    margin: "5px",
                  }}
                  className="card"
                >
                  <Card.Img src={album.images[0].url} />
                  <Card.Body>
                    <Card.Title>{album.name} </Card.Title>
                  </Card.Body>
                </Card>
                </Link>
            );
          })}
        </Row>
      </Container>
          </div>
          

        </>
      )}
    </div>
  );
};

export default TrackDetails;
