import {createSlice} from '@reduxjs/toolkit';
import {getUsersThunk} from '../services/user-search-thunk';

const userSearchSlice = createSlice({
    name: "userSearch",
    initialState: {usersList:[]},
    extraReducers: {
        [getUsersThunk.fulfilled]: (state, action) => {
            state.usersList = action.payload;
        },
        [getUsersThunk.rejected]: (state, action) => {
            state.usersList = action.error;
        }
    }
});

export default userSearchSlice.reducer;