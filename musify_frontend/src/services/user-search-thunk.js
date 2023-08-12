import {createAsyncThunk} from "@reduxjs/toolkit";
import * as userSearchService from "./user-search-service";

export const getUsersThunk = createAsyncThunk(
   "searchUser/getUsers",
   async (search) => {
      const users = await userSearchService.getUsers(search);
      return users;
   }
);