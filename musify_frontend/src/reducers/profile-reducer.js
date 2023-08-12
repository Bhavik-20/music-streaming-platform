import {createSlice} from '@reduxjs/toolkit';
import { getSearchedProfileThunk} from '../services/profile-thunks';

const profileSlice = createSlice({
    name: "profile",
    initialState: {profile:[]},
    extraReducers: {
        [getSearchedProfileThunk.fulfilled]: (state, action) => {
            state.profile = action.payload;
        },
        [getSearchedProfileThunk.rejected]: (state, action) => {
            state.profile = action.error;
        }
    }
});

export default profileSlice.reducer;