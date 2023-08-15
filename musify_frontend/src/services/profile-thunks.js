import {createAsyncThunk} from "@reduxjs/toolkit";
import * as profileService from "./profile-service";

export const getProfileThunk = createAsyncThunk(
   "profile/getProfile",
   async (token) => {
      const user = await profileService.getProfile(token);
      return user;
   }
);

export const getSearchedProfileThunk = createAsyncThunk(
   "profile/getSearchedProfile",
   async (pid) => {
      const user = await profileService.getSearchedProfile(pid);
      return user;
   }
);

export const followUserThunk = createAsyncThunk(
   "profile/followUser",
   async ({currentUserId, followUserId}) => {
      console.log("followUserThunk: ", currentUserId, followUserId);
      const user = await profileService.followUser(currentUserId, followUserId);
      return user;
   }
)

export const getUserDataFollowingThunk = createAsyncThunk(
   "profile/getUserDataFollowing",
   async (user_id) => {
      const users = await profileService.getUserDataFollowing(user_id);
      return users;
   }
);

export const getUserDataFollowersThunk = createAsyncThunk(
   "profile/getUserDataFollowers",
   async (user_id) => {
      const users = await profileService.getUserDataFollowers(user_id);
      return users;
   }
);

export const updateProfileThunk = createAsyncThunk(
   "profile/updateProfile",
   async (profile) => {
      const user = await profileService.updateProfile(profile);
      return user;
   }
);