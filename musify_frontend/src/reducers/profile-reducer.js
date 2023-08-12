import {createSlice} from '@reduxjs/toolkit';
import {getProfileThunk} from '../services/profile-thunks';

const profileSlice = createSlice({
    name: "profile",
    initialState: {profile:[]},
    extraReducers: {
        [getProfileThunk.fulfilled]: (state, action) => {
            state.profile = action.payload;
        },
        [getProfileThunk.rejected]: (state, action) => {
            state.profile = action.error;
        }
    }
});

export default profileSlice.reducer;