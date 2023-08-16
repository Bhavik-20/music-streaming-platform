import React, { useState, useEffect } from "react";
import { fetchAlbumDetails, fetchAlbumTracks } from "../spotify-hook/spotifyApi";
import "./album-details.css";
import { useParams, Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { likeAlbumsPlaylistThunk, getLikedAlbumsPlaylistThunk } from "../services/albums-playlist-thunk";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";

const AlbumDetails = () => {
  const {likedAlbums} = useSelector((state) => state.albumsPlaylist);
  const [likedAlbumsState, setlikedAlbumsState] = useState(likedAlbums);

  const [album, setAlbum] = useState(null);
  const [tracks, setTracks] = useState([]);
  const {albumID} = useParams();
  const [isLiked, setIsLiked] = useState();
  const [currentUserCookies, setCurrentUserCookies] = useCookies(["currentUserId"]);

  const dispatch = useDispatch();

  const msToMinSec = (durationMs) => {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = ((durationMs % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  
  const likeAlbums = async () => {
      const currentUserId = currentUserCookies.currentUserId;
      const {payload} = await dispatch(likeAlbumsPlaylistThunk({currentUserId, albumId: album.id}));
      setIsLiked(payload.includes(album.id));
	};

  const getLikedAlbums = async () => {
    if (albumID) { 
      const currentUserId = currentUserCookies.currentUserId;
      const {payload} = await dispatch(getLikedAlbumsPlaylistThunk(currentUserId));
      console.log("Liked Albums: ", payload, payload.includes(albumID));
      setlikedAlbumsState(payload);
      setIsLiked(payload.includes(albumID));
    }
  };

  useEffect(() => {
    const fetchAlbumData = async () => {
      const albumData = await fetchAlbumDetails(albumID);
      setAlbum(albumData);
      const albumTracks = await fetchAlbumTracks(albumID);
      setTracks(albumTracks);
      // const albumLikes = album.followers.total;
      // setLikesCount(albumLikes);
    };
    fetchAlbumData();
    getLikedAlbums();
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
              <div className="col">
                  <button
                    style={{
                      background: "black",
                      color: "white",
                      border: "none",
                    }}
                    onClick={likeAlbums}
                  >
                    {isLiked ? <FaHeart color="red" /> : <FaRegHeart />}
                  </button>
                </div>
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
                  <td>
                  <Link to={`/tracks/${track.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {track.name}
                    </Link>
                    </td>
                  <td>
                  <Link to={`/tracks/${track.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {track.artists.length > 1
                      ? ` ${track.artists.map((artist) => artist.name).join(", ")}`
                      : `  ${track.artists[0].name}`}
                      </Link>
                  </td>
                  <td>
                  <Link to={`/tracks/${track.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {msToMinSec(track.duration_ms)}
                    </Link>
                    </td>
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
