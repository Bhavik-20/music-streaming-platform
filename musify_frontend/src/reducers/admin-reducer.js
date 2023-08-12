import {createSlice} from '@reduxjs/toolkit';
import {getUsersListThunk, ignoreVerificationThunk, verifyArtistThunk} from '../services/admin-thunk';

const adminSlice = createSlice({
    name: "admin",
    initialState: {usersList:[]},
    extraReducers: {
        [getUsersListThunk.fulfilled]: (state, action) => {
            state.usersList = action.payload;
        },
        [getUsersListThunk.rejected]: (state, action) => {
            state.usersList = action.error;
        },
        [verifyArtistThunk.fulfilled]: (state, action) => {
            state.usersList = action.payload;
        },
        [ignoreVerificationThunk.fulfilled]: (state, action) => {
            state.usersList = action.payload;
        }
    }
});

export default adminSlice.reducer;