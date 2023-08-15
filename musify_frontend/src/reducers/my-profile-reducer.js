import {createSlice} from '@reduxjs/toolkit';
import {getProfileThunk, updateProfileThunk, getUserDataFollowingThunk, getUserDataFollowersThunk} from '../services/profile-thunks';

const myProfileSlice = createSlice({
    name: "myProfile",
    initialState: {myProfile:[], userDataFollowing: [], userDataFollowers: []},
    extraReducers: {
        [getProfileThunk.fulfilled]: (state, action) => {
            state.myProfile = action.payload;
        },
        [getProfileThunk.rejected]: (state, action) => {
            state.myProfile = action.error;
        },
        [updateProfileThunk.fulfilled]: (state, action) => {
            state.myProfile = action.payload;
        },
        [getUserDataFollowingThunk.fulfilled]: (state, action) => {
            state.userDataFollowing = action.payload;
        },
        [getUserDataFollowersThunk.fulfilled]: (state, action) => {
            state.userDataFollowers = action.payload;
        }
    }
});

export default myProfileSlice.reducer;