import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";

const Nav = () => {
 const names = ["Home", "Edit Account", "My public profile", "Search", "Find Users"]
 const links = ["home", "edit-profile", "my-profile", "search", "search-users"];
 const icons = ["house", "pencil-fill", "person-square", "search", "people"];
 const [currentUserCookies, setCurrentUserCookies] = useCookies(["currentUserId"]);
 
 const { pathname } = useLocation();
 const [ignore, musify, active] = pathname.split("/");

 return (
   <div className="list-group">
     {links.map((link, index) => 
         <Link to={`/${link}`} className={`list-group-item text-capitalize ${active === link ? "active" : ""}`}>
          <span><i className={`bi bi-${icons[index]} me-2`}/></span> 
          <span className="d-none d-xl-inline-block">{names[index]}</span>
         </Link>
      )}
      {!currentUserCookies.currentUserId && 
      <Link className={`list-group-item text-capitalize ${active === "login" ? "active" : ""}`} to="/tuiter/login">
        <span><i className="bi bi-box-arrow-in-right me-2"/></span> 
        <span className="d-none d-xl-inline-block">Login</span>
      </Link>}
      {!currentUserCookies.currentUserId && 
       <Link className={`list-group-item text-capitalize ${active === "signup" ? "active" : ""}`} to="/tuiter/register">
        <span><i className="bi bi-person-lines-fill me-2"/></span> 
        <span className="d-none d-xl-inline-block">Sign Up</span>
      </Link>}
    
   </div>
 );
};
export default Nav;