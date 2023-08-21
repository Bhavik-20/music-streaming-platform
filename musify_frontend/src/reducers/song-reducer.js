import {createSlice} from '@reduxjs/toolkit';
import { likeSongThunk, getLikedSongsThunk } from '../services/song-thunk';

const songSlice = createSlice({
    name: "likedSongs",
    initialState: {likedSongs:[]},
    extraReducers: {
        [likeSongThunk.fulfilled]: (state, action) => {
            state.likedSongs = action.payload;
        },
        [getLikedSongsThunk.fulfilled]: (state, action) => {
            console.log("reducer: ", action.payload);
            state.likedSongs = action.payload;
        }
    }
});

export default songSlice.reducer;