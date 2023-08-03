// spotifyApiService.js
import SpotifyWebApi from "spotify-web-api-js";
import { useEffect, useState } from "react";

var spotifyApi = new SpotifyWebApi();

export const fetchAlbumDetails = async (albumID) => {
  try {
    const data = await spotifyApi.getAlbum(albumID);
    return data;
  } catch (error) {
    console.error("Error fetching album details:", error);
    throw error;
  }
};

export const fetchAlbumTracks = async (albumID) => {
  try {
    const data = await spotifyApi.getAlbumTracks(albumID);
    return data.items;
  } catch (error) {
    console.error("Error fetching album tracks:", error);
    throw error;
  }
};

export const searchTracks = async (searchInput, accessToken) => {
  const searchParameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  };

  try {
    const response = await fetch(
      "https://api.spotify.com/v1/search?q=" + searchInput + "&type=track",
      searchParameters
    );
    const data = await response.json();
    return data.tracks.items;
  } catch (error) {
    console.error("Error searching tracks:", error);
    throw error;
  }
};

// Add other API functions here as needed
