import {createSlice} from '@reduxjs/toolkit';
import {getUsersListThunk} from '../services/admin-thunk';

const adminSlice = createSlice({
    name: "admin",
    initialState: {usersList:[]},
    extraReducers: {
        [getUsersListThunk.fulfilled]: (state, action) => {
            state.usersList = action.payload;
        },
        [getUsersListThunk.rejected]: (state, action) => {
            state.usersList = action.error;
        }
    }
});

export default adminSlice.reducer;