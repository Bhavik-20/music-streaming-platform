import {createAsyncThunk} from "@reduxjs/toolkit";
import * as userSearchService from "./user-search-service";

export const getUsersThunk = createAsyncThunk(
   "searchUser/getUsers",
   async ({search, token}) => {
      const users = await userSearchService.getUsers(search, token);
      return users;
   }
);