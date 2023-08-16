import {createAsyncThunk} from "@reduxjs/toolkit";
import * as albumPlaylistService from "../services/albums-playlist-service"

export const likeAlbumsPlaylistThunk = createAsyncThunk(
    'albumsPlaylist/likeAlbumsPlaylist',
    async ({currentUserId, albumId}) => {
        console.log("likeSongThunk: ", currentUserId, albumId);
        const response = await albumPlaylistService.likeAlbumsPlaylist(currentUserId, albumId);
        return response;
    }
);

export const getLikedAlbumsPlaylistThunk = createAsyncThunk(
    'albumsPlaylist/getlikedAlbumsPlaylist',
    async (userId) => {
        const response = await albumPlaylistService.getlikedAlbumsPlaylist(userId);
        return response;
    }
);