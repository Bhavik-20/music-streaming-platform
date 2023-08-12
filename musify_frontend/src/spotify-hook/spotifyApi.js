// src/SpotifyAPI.js
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();
const redirectUri = "http://localhost:3000";
const clientId = "c4cdfc316afc45aebeffea58959ac714";

export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      const parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};

export const loginUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&show_dialog=true&scope=user-read-private%20user-modify-playback-state%20user-read-playback-state%20streaming`;

export const initializeSpotifyApi = (token) => {
  if (token) {
    spotifyApi.setAccessToken(token);
  }
};

export const searchTracks = async (searchQuery) => {
  try {
    const response = await spotifyApi.searchTracks(searchQuery);
    return response.tracks.items;
  } catch (error) {
    console.error("Error searching for tracks:", error);
    return [];
  }
};

export const playTrack = async (trackUri) => {
  try {
    console.log(trackUri);
    await spotifyApi.play({ uris: [trackUri] });
  } catch (error) {
    console.error("Error playing the track:", error);
  }
};

export const fetchAlbumDetails = async (albumID) => {
  try {
    const data = await spotifyApi.getAlbum(albumID);
    return data;
  } catch (error) {
    console.error("Error fetching album details:", error);
  }
};
export const fetchAlbumTracks = async (albumID) => {
  try {
    const data = await spotifyApi.getAlbumTracks(albumID);
    return data.items;
  } catch (error) {
    console.error("Error fetching album tracks:", error);
  }
};

export const fetchPlaylistDetails = async (playlistID) => {
  try {
    const data = await spotifyApi.getPlaylist(playlistID);
    return data;
  } catch (error) {
    console.error("Error fetching playlist details:", error);
  }
};
export const fetchPlaylistTracks = async (playlistID) => {
  try {
    const data = await spotifyApi.getPlaylistTracks(playlistID);
    return data.items;
  } catch (error) {
    console.error("Error fetching playlist tracks:", error);
  }
};

export const fetchArtistAlbums = async (artistID) => {
  try {
    const data = await spotifyApi.getArtistAlbums(artistID);
    return data.items;
  } catch (error) {
    console.error("Error fetching albums:", error);
  }
};
export const fetchTrackDetails = async (trackID) => {
  try {
    const data = await spotifyApi.getTrack(trackID);
    return data;
  } catch (error) {
    console.error("Error fetching track details:", error);
  }
};
export const searchArtists = async (searchQuery) => {
  try {
    const response = await spotifyApi.searchArtists(searchQuery);
    return response.artists.items;
  } catch (error) {
    console.error("Error searching for artists:", error);
    return [];
  }
};

export const searchAlbums = async (searchQuery) => {
  try {
    const response = await spotifyApi.searchAlbums(searchQuery);
    return response.albums.items;
  } catch (error) {
    console.error("Error searching for albums:", error);
    return [];
  }
};

export const searchPlaylists = async (searchQuery) => {
  try {
    const response = await spotifyApi.searchPlaylists(searchQuery);
    return response.playlists.items;
  } catch (error) {
    console.error("Error searching for playlists:", error);
    return [];
  }
};

export default spotifyApi;
