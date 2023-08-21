import {createAsyncThunk} from "@reduxjs/toolkit";
import * as songService from "../services/song-service"

export const likeSongThunk = createAsyncThunk(
    'songs/likeSong',
    async ({currentUserId, songId}) => {
        console.log("likeSongThunk: ", currentUserId, songId);
        const response = await songService.likeSong(currentUserId, songId);
        return response;
    }
);

export const getLikedSongsThunk = createAsyncThunk(
    'songs/getLikedSongs',
    async (userId) => {
        const response = await songService.getLikedSongs(userId);
        return response;
    }
);