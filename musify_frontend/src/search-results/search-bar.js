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
import SpotifyWebApi from "spotify-web-api-js";

const SearchBar = ({ accessToken, spotifyApi }) => {
  const [searchInput, setSearchInput] = useState("");
  const [albumsSearch, setAlbumsSearch] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [playlists, setPlaylists] = useState([]);


  async function search() {
    var searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };
    var artistID = await fetch(
      "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        return data.artists.items[0].id;
      });

    var albums = await fetch(
      "https://api.spotify.com/v1/artists/" +
        artistID +
        "/albums" +
        "?include_groups=album&limit=50",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        setAlbums(data.items);
      });

    //get songs related to search
    var tracks = await spotifyApi.searchTracks(searchInput).then(
      function (data) {
        console.log("Search by" + searchInput, data.tracks.items);
        setTracks(data.tracks.items);
      },
      function (err) {
        console.error(err);
      }
    );

    var artists = await spotifyApi.searchArtists(searchInput).then(
      function (data) {
        setArtists(data.artists.items);
        console.log(artists);
        console.log("data: " + data);
      },
      function (err) {
        console.error(err);
      }
    );
    var albumsSearch = await spotifyApi.searchAlbums(searchInput).then(
      function (data) {
        setAlbumsSearch(data.albums.items);
        console.log(albumsSearch);
      },
      function (err) {
        console.error(err);
      }
    );
    var playlists = await spotifyApi.searchPlaylists(searchInput).then(
        function (data) {
          setPlaylists(data.playlists.items);
          console.log(playlists);
        },
        function (err) {
          console.error(err);
        }
      );
  }

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
      <Container>
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
                </Card.Body>
              </Card>
              //   <div className="row">
              //     <div className="col-2">
              //         <img height="50px" width="50px" src={track.album.images[0]?.url}/>
              //     </div>
              //     <div className="col-10">
              //         {track.name}
              //     </div>
              //  </div>
            ))
          ) : (
            <p>No tracks found.</p>
          )}
        </Row>
      </Container>
      <Container>
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
                </Card.Body>
              </Card>
            );
          })}
        </Row>
      </Container>
      <Container>
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
