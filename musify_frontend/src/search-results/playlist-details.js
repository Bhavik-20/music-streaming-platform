import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  fetchPlaylistDetails,
  fetchPlaylistTracks,
} from "../spotify-hook/spotifyApi";
import "./album-details.css";
import { useParams } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const PlaylistDetails = () => {
  const [playlist, setPlaylist] = useState(null);
  const [tracks, setTracks] = useState([]);
  const {playlistID} = useParams();
  const [isLiked, setIsLiked] = useState();
  const [likesCount, setLikesCount] = useState();

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
      const playlistLikes = playlist.followers.total;
      setLikesCount(playlistLikes);
      console.log(playlistTracks);
    };
    fetchPlaylistData();
  }, [playlistID]);

  const handleButtonClick = () => {
    // Optimistic UI update
    const newLikesCount = isLiked ? likesCount - 1 : likesCount + 1;
    setLikesCount(newLikesCount);
    setIsLiked(!isLiked);

    // Update data on the server using dispatch
    // dispatch(updateTuitThunk({ ...tuit, liked: !isLiked, likes: newLikesCount }));
  };

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
              <div className="col">
                  <button
                    style={{
                      background: "black",
                      color: "white",
                      border: "none",
                    }}
                    onClick={handleButtonClick}
                  >
                    {isLiked ? <FaHeart color="red" /> : <FaRegHeart />}
                  </button>
                  {likesCount}
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
              {tracks.map((item, i) => (
                <tr key={i} className="clickable-row">
                  <td>  
                    <Link to={`/tracks/${item.track.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {item.track.name}
                    </Link>
                    </td>
                  <td>
                  <Link to={`/tracks/${item.track.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {item.track.artists
                      ? item.track.artists.length > 1
                        ? ` ${item.track.artists
                            .map((artist) => artist.name)
                            .join(", ")}`
                        : `  ${item.track.artists[0].name}`
                      : "No artist information"}
                      </Link>
                  </td>
                  <td>
                  <Link to={`/tracks/${item.track.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {msToMinSec(item.track.duration_ms)}
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

export default PlaylistDetails;
