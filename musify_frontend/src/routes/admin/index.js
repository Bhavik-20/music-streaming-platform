import { Routes, Route, Navigate } from "react-router";
import AdminHomeComponent from "./admin-home";
import AdminLoginComponent from "./admin-login";
import {useCookies} from "react-cookie";

const Admin = () =>  {

 const [cookie] = useCookies(["adminToken"]);

 return (
   <div>
    {cookie.adminToken ? (
        <Routes>
            <Route path="/home" element={<AdminHomeComponent/>} />
            <Route path="*" element={<Navigate to="/admin/home" />} />
        </Routes>
    ) : (
        <Routes>
          <Route path="/login" element={<AdminLoginComponent/>} />
          <Route path="*" element={<Navigate to="/admin/login" />} />
        </Routes>

  )}
   </div>
 );
}
export default Admin;