import {createAsyncThunk} from "@reduxjs/toolkit";
import * as profileService from "./profile-service";

export const getProfileThunk = createAsyncThunk(
   "profile/getProfile",
   async (token) => {
      console.log("getProfileThunk: ", token);
      const user = await profileService.getProfile(token);
      return user;
   }
);

export const getSearchedProfileThunk = createAsyncThunk(
   "profile/getSearchedProfile",
   async (pid) => {
      console.log("getSearchedProfileThunk: ", pid);
      const user = await profileService.getSearchedProfile(pid);
      return user;
   }
);

export const updateProfileThunk = createAsyncThunk(
   "profile/updateProfile",
   async (profile) => {
      console.log("updateProfileThunk: ", profile);
      const user = await profileService.updateProfile(profile);
      return user;
   }
);