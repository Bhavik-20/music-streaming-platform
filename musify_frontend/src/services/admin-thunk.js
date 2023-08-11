import {createAsyncThunk} from "@reduxjs/toolkit";
import * as adminService from "./admin-service";

export const getUsersListThunk = createAsyncThunk(
   "admin/users",
   async () => {
      const user = await adminService.getUsersList();
      return user;
   }
);