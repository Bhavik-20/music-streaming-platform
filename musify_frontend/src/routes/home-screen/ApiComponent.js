import NewReleases from "./NewReleases";
import Trending from "./Trending";
import { getProfileThunk } from "../../services/profile-thunks";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";
import { Row, Card } from "react-bootstrap";
import { fetchItems, fetchTracks } from "../../spotify-hook/spotifyApi";

const ApiComponent = () => {
  const [cookies, setCookie] = useCookies(["token"]);
  const profile = useSelector((state) => state.myProfile);
  const [likedTracks, setLikedTracks] = useState([]);
  const [likedAlbums, setLikedAlbums] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loadLikedContent = async () => {
    try {
      const { payload } = await dispatch(getProfileThunk(cookies.token));

      const liked_tracks = await fetchTracks(payload.likedSongs);
      console.log(payload.likedSongs);
      setLikedTracks(liked_tracks);
      console.log(liked_tracks);

      const liked_albums = await fetchItems(payload.likedAlbums);
      setLikedAlbums(liked_albums);
      //console.log(liked_albums);
    } catch (error) {
      console.log("loadContent Error: ", error);
    }
  };
  useEffect(() => {
    loadLikedContent();
  }, []);

  const cardStyle = {
    background: "transparent",
    border: "none",
    marginBottom: "5px",
  };

  const imageStyle = {
    boxShadow: "0px 0px 10px white", // Add white shadow

  }

  const titleStyle = {
    fontSize: "14px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: "white", // Set title color to white
  };

  return (
    <div className="container-fluid">
      <div id="welcome" className="w-100">
        <div className="row">
          <div className="jumbotron col-9">
            <h1 className="text-success">Welcome to Musify!</h1>
            <p className="text-success">
              Your personalized online music streaming
            </p>
          </div>
          <div className="col-3">
            <h2 className="text-success">Hi, Shreyas</h2>
          </div>
        </div>
      </div>

      {/* Logged In user */}
      
      <div id="recently-played">
        <h2 className="text-success">Liked Albums</h2>
        {likedAlbums.length === 0 ? (
          ""
        ) : (
          <Row className="mx-2 row row-cols-6">
            {likedAlbums.map((album) => (
              <Card
                style={cardStyle}
                className="card"
                onClick={(e) => {
                  e.preventDefault();
                  if (album.type === "album") {
                    navigate(`/albums/${album.id}`);
                  } else {
                    navigate(`/playlists/${album.id}`);
                  }
                }}
              >
                <Card.Img style={imageStyle} src={album.images[0]?.url} />
                <Card.Body>
                  <Card.Title
                    style={titleStyle}
                  >
                    {album.name}{" "}
                  </Card.Title>
                  {/* link to go to album details page */}
                </Card.Body>
              </Card>
            ))}
          </Row>
        )}
      </div>
      <div id="recently-played">
        <h2 className="text-success">Liked Tracks</h2>
        {likedTracks.length === 0 ? (
          ""
        ) : (
          <Row className="mx-2 row row-cols-6">
            {likedTracks.tracks.map((track) => (
              <Card
                style={cardStyle}
                className="card"
                onClick={(e) => {
                  e.preventDefault();
                    navigate(`/tracks/${track.id}`);
                
                }}
              >
                <Card.Img style={imageStyle} src={track.album.images[0]?.url} />
                <Card.Body>
                  <Card.Title
                    style={titleStyle}
                  >
                    {track.name}{" "}
                  </Card.Title>
                  {/* link to go to album details page */}
                </Card.Body>
              </Card>
            ))}
          </Row>
        )}
      </div>

      {/*For all users */}
      <div id="recently-played">
        <h2 className="text-success">New Releases</h2>
        <NewReleases />
      </div>
      <div id="trending">
        <h2 className="text-success">Featured Playlists</h2>
        <Trending />
      </div>
    </div>
  );
};
export default ApiComponent;
