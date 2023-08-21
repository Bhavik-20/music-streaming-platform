import {createSlice} from '@reduxjs/toolkit';
import {likeAlbumsPlaylistThunk, getLikedAlbumsPlaylistThunk} from '../services/albums-playlist-thunk';

const albumsPlaylistSlice = createSlice({
    name: "albumsPlaylist",
    initialState: {likedAlbums:[]},
    extraReducers: {
        [likeAlbumsPlaylistThunk.fulfilled]: (state, action) => {
            state.likedSongs = action.payload;
        },
        [getLikedAlbumsPlaylistThunk.fulfilled]: (state, action) => {
            state.likedSongs = action.payload;
        }
    }
});

export default albumsPlaylistSlice.reducer;