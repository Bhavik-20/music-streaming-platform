import React, { useState, useEffect } from "react";
import {
  fetchTrackDetails,
  fetchArtistAlbums,
} from "../spotify-hook/spotifyApi";
import "./album-details.css";
import { Container, Row, Card } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {likeSongThunk, getLikedSongsThunk} from "../services/song-thunk"
import { useCookies } from "react-cookie";

const TrackDetails = () => {
  const {likedSongs} = useSelector((state) => state.songs);
  const [likedSongsState, setLikedSongsState] = useState(likedSongs);
  const [track, setTrack] = useState();
  const [albums, setAlbums] = useState([]);
  const [isLiked, setIsLiked] = useState(likedSongsState.includes(track?.id));
  const [currentUserCookies, setCurrentUserCookies] = useCookies(["currentUserId"]);

  const { trackID } = useParams();
  const dispatch = useDispatch();

  const msToMinSec = (durationMs) => {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = ((durationMs % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const fetchAlbums = async () => {
    console.log("here: ", track, track.artists);
    if (track && track.artists) {
      const albumsData = await fetchArtistAlbums(track.artists[0].id);
      console.log("fetch albums: ", albumsData);
      setAlbums(albumsData);
    } else {
      console.log("no track");
    }
  };

  const likeSong = async () => {
      const currentUserId = currentUserCookies.currentUserId;
      const {payload} = await dispatch(likeSongThunk({currentUserId, songId: track.id}));
      setIsLiked(payload.includes(track.id));
	};

  const getLikedSongs = async () => {
    if (trackID) { 
      const currentUserId = currentUserCookies.currentUserId;
      const {payload} = await dispatch(getLikedSongsThunk(currentUserId));
      console.log("Liked Songs: ", payload, payload.includes(trackID));
      setLikedSongsState(payload);
      setIsLiked(payload.includes(trackID));
    }
  };

  const fetchTrackData = async () => {
    const trackData = await fetchTrackDetails(trackID);
    setTrack(trackData);
  };

  useEffect(() => {
    fetchTrackData()
    getLikedSongs(); 
  }, []);

  return (
    <div className="centered-container">
      {track && (
        <>
          <div id="album-info">
            <div className="album-details col">
              Track <br />
              <h1>{track.name}</h1>
              <div className="row">
                <div className="col">
                  {track.artists.map((artist, i) => (
                    <b key={i}>{artist.name + " "}</b>
                  ))}
                </div>
                <div className="col">
                  <button
                    style={{
                      background: "black",
                      color: "white",
                      border: "none",
                    }}
                    onClick={likeSong}
                  >
                    {isLiked ? <FaHeart color="red" /> : <FaRegHeart />}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="album-details">
            <h3>More by {track.artists[0].name}</h3>
            <Container style={{ marginTop: "10px" }}>
              <Row className="mx-2 row row-cols-6">
                {albums.map((album, i) => {
                  return (
                    <Link
                      to={`/albums/${album.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
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
