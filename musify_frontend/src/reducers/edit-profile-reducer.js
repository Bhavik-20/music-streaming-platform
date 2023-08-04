import {createSlice} from '@reduxjs/toolkit';
import {getProfileThunk} from '../services/profile-thunks';

const editProfileSlice = createSlice({
    name: "editProfile",
    initialState: {editProfile:{}},
    extraReducers: {
        [getProfileThunk.fulfilled]: (state, action) => {
            state.editProfile = action.payload;
        },
        [getProfileThunk.rejected]: (state, action) => {
            state.editProfile = action.error;
        }
    }
});

export default editProfileSlice.reducer;