import React from "react";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Row,
  Card,
} from "react-bootstrap";
import { useState } from "react";
import { searchAlbums, searchArtists, searchTracks, searchPlaylists } from "../spotify-hook/spotifyApi";
import { Link } from "react-router-dom";


const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [albumsSearch, setAlbumsSearch] = useState([]);
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  async function search() {
    const artistResults = await searchArtists(searchInput);
    setArtists(artistResults);

    const albumsResults = await searchAlbums(searchInput);
    setAlbumsSearch(albumsResults);

    const tracksResults = await searchTracks(searchInput);
    setTracks(tracksResults);

    const playlistsResults = await searchPlaylists(searchInput);
    setPlaylists(playlistsResults);
  };



  return (
    <div className="black-bg">
      <Container>
        <InputGroup className="mb-3" size="lg">
          <FormControl
            placeholder="Search For Tracks, Albums, and Playlists"
            type="input"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                search();
              }
            }}
            onChange={(event) => setSearchInput(event.target.value)}
          />
          <Button onClick={search} className="green-btn">Search</Button>
        </InputGroup>
      </Container>
      <Container style={{ marginTop: "10px" }}>
        <h2 className="section">Tracks</h2>
        <Row className="mx-2 row row-cols-6">
          {tracks.length > 0 ? (
            tracks.map((track, i) => (
              <Link to={`/tracks/${track.id}`} className="album-link">
              <Card
                style={{
                  display: "flex",
                  flexDirection: "row",
                  height: "70px",
                  paddingLeft: "0px",
                  margin: "5px",
                }} className="grey-bg"
                key={i}
              >
                <Card.Img
                  style={{ width: "70px", height: "70px" }}
                  src={track.album.images[0]?.url}
                />
                <Card.Body
                  style={{ width: "calc(100% - 70px)", height: "70px" }}
                >
                  <Card.Title
                    style={{
                      fontSize: "14px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "clip"
                    }}
                  >
                    {track.name}{" "}
                  </Card.Title>
                         {/* link to go to album details page */}
                </Card.Body>
              </Card>
              </Link>
            ))
          ) : (
            <p>No tracks found.</p>
          )}
        </Row>
      </Container>
      <Container style={{ marginTop: "10px" }}>
        <h2 className="section">Albums</h2>
        <Row className="mx-2 row row-cols-6">
          {albumsSearch.map((album, i) => {
            return (
              <Link to={`/albums/${album.id}`} className="album-link">
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
      <Container style={{ marginTop: "10px" }}>
        <h2 className="section">Playlists</h2>
        <Row className="mx-2 row row-cols-6">
          {playlists.map((playlist, i) => {
            return (
              <Link to={`/playlists/${playlist.id}`} className="album-link">
              <Card
                style={{
                  margin: "5px",
                }}
              >
                <Card.Img src={playlist.images[0].url} />
                <Card.Body>
                  <Card.Title>{playlist.name} </Card.Title>
                </Card.Body>
              </Card>
              </Link>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default SearchBar;
