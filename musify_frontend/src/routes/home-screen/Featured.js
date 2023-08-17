import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchTopTrack } from "../../spotify-hook/spotifyApi";
import { Link } from "react-router-dom";

const Featured = () => {
  const [track, setTrack] = useState({ album: { images: [] }, artists: [] });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopTrack = async () => {
      try {
        const trackData = await searchTopTrack();
        console.log("Fetched top track:", trackData);
        setTrack(trackData);
      } catch (error) {
        console.error("Error fetching top track:", error);
      }
    };
    fetchTopTrack();
  }, []);

  return (
    <div className="featured-container">
      <Link to={`/tracks/${track.id}`}>
        {" "}
        {/* Link to the specific track page */}
        <div className="feature-info">
          <div className="feature-image">
            <img src={track.album.images[0]?.url} alt={track.name} />
          </div>
          <div className="feature-details">
            <h1>{track.name}</h1>
            {track.artists.map((artist, i) => (
              <b key={i}>{artist.name + " "}</b>
            ))}
            <p>{track.album.release_date}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Featured;
