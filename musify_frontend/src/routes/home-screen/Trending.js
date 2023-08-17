import { Card, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  fetchFeaturedPlaylists,
  fetchNewReleases,
} from "../../spotify-hook/spotifyApi";

const Trending = () => {
  const [playlists, setPlaylists] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const playlistData = await fetchFeaturedPlaylists();
        console.log("Fetched album items:", playlistData); // Add this line
        setPlaylists(playlistData.playlists.items.slice(0, 5));
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };
    fetchPlaylists();
  }, []);

  const cardStyle = {
    background: "transparent",
    border: "none",
    marginBottom: "5px",
  };

  const imageStyle = {
    boxShadow: "0px 0px 10px white", // Add white shadow
  };

  const titleStyle = {
    fontSize: "14px",
    color: "white", // Set title color to white
  };

  return (
    <div>
      <Row className="mx-2 row row-cols-6">
        {playlists.map((playlist, i) => {
          return (
              <Card
                style={cardStyle}
                className="card"
                onClick={(e) => {
                    e.preventDefault();
                      navigate(`/playlists/${playlist.id}`);
                  
                  }}
              >
                <Card.Img src={playlist.images[0].url} style={imageStyle} />
                <Card.Body>
                  <Card.Title style={titleStyle}>{playlist.name} </Card.Title>
                </Card.Body>
              </Card>
          );
        })}
      </Row>
    </div>
  );
};

export default Trending;
