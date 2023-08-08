import React from "react";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Row,
  Card,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import {searchAlbums, searchArtists, searchTracks, searchPlaylists, playTrack} from "../spotify-hook/spotifyApi";
import { Link } from "react-router-dom";


const SearchBar = ({ accessToken, spotifyApi }) => {
  const [searchInput, setSearchInput] = useState("");
  const [albumsSearch, setAlbumsSearch] = useState([]);
  const [albums, setAlbums] = useState([]);
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
  const handlePlayTrack = (trackUri) => {
    playTrack(trackUri);
  };


  return (
    <div>
      <Container>
        <InputGroup className="mb-3" size="lg">
          <FormControl
            placeholder="Search For Artist"
            type="input"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                search();
              }
            }}
            onChange={(event) => setSearchInput(event.target.value)}
          />
          <Button onClick={search}>Search</Button>
        </InputGroup>
      </Container>
      <Container style={{ marginTop: "10px" }}>
        <h2>Tracks</h2>
        <Row className="mx-2 row row-cols-6">
          {tracks.length > 0 ? (
            tracks.map((track, i) => (
              <Card
                style={{
                  display: "flex",
                  flexDirection: "row",
                  height: "70px",
                  paddingLeft: "0px",
                  margin: "5px",
                }}
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
                      textOverflow: "ellipsis",
                    }}
                  >
                    {track.name}{" "}
                  </Card.Title>
                         {/* link to go to album details page */}
                         <a onClick={() => handlePlayTrack(track.uri)} className="stretched-link"></a>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No tracks found.</p>
          )}
        </Row>
      </Container>
      <Container style={{ marginTop: "10px" }}>
        <h2>Albums</h2>
        <Row className="mx-2 row row-cols-6">
          {albumsSearch.map((album, i) => {
            return (
                <Card
                  style={{
                    margin: "5px",
                  }}
                >
                  <Card.Img src={album.images[0].url} />
                  <Card.Body>
                    <Card.Title>{album.name} </Card.Title>
                    {/* link to go to album details page */}
                    <Link to={`/album/${album.id}`} className="stretched-link"></Link>                  </Card.Body>
                </Card>
            );
          })}
        </Row>
      </Container>
      <Container style={{ marginTop: "10px" }}>
        <h2>Playlists</h2>
        <Row className="mx-2 row row-cols-6">
          {playlists.map((playlist, i) => {
            return (
              <Card
                style={{
                  margin: "5px",
                }}
              >
                <Card.Img src={playlist.images[0].url} />
                <Card.Body>
                  <Card.Title>{playlist.name} </Card.Title>
                         {/* link to go to album details page */}
                         <a href="#" class="stretched-link"></a>
                </Card.Body>
              </Card>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default SearchBar;