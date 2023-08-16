import {createSlice} from '@reduxjs/toolkit';
import {getSearchedProfileThunk, followUserThunk, getUserDataFollowingThunk, getUserDataFollowersThunk} from '../services/profile-thunks';


const profileSlice = createSlice({
    name: "profile",
    initialState: {profile:[], userDataFollowing: [], userDataFollowers: []},
    extraReducers: {
        [getSearchedProfileThunk.fulfilled]: (state, action) => {
            state.profile = action.payload;
        },
        [getSearchedProfileThunk.rejected]: (state, action) => {
            state.profile = action.error;
        },
        [followUserThunk.fulfilled]: (state, action) => {
            state.profile = action.payload;
        },
        [followUserThunk.rejected]: (state, action) => {
            state.profile = action.error;
        },
        [getUserDataFollowingThunk.fulfilled]: (state, action) => {
            state.userDataFollowing = action.payload;
        },
        [getUserDataFollowersThunk.fulfilled]: (state, action) => {
            state.userDataFollowers = action.payload;
        }
    }
});

export default profileSlice.reducer;