import {createAsyncThunk} from "@reduxjs/toolkit";
import * as adminService from "./admin-service";

export const getUsersListThunk = createAsyncThunk(
   "admin/users",
   async () => {
      const user = await adminService.getUsersList();
      return user;
   }
);

export const verifyArtistThunk = createAsyncThunk(
   "admin/verify-artist",
   async (id) => {
      const user = await adminService.verifyArtist(id);
      return user;
   }
);

export const ignoreVerificationThunk = createAsyncThunk(
   "admin/ignore-verification",
   async (id) => {
      const user = await adminService.ignoreVerification(id);
      return user;
   }
);