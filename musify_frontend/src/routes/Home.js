import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";

const HomeComponent = () => {
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const navigate = useNavigate();

    const logout = async () => {
        removeCookie("token", {path: "/"});
        removeCookie("currentUserId", {path: "/"});
        alert("Success");
        navigate("/login");
    };
    
    return (
        <div>
            <h1 className="text-white">Home - Signed In</h1>
            <button 
            className="bg-green-400 font-semibold p-3 px-10 rounded-full" 
            onClick={(e) => {
                e.preventDefault();
                logout();
            }}>
            LOG OUT
            </button>   
            <br></br>
            <button 
            className="bg-green-400 font-semibold p-3 px-10 rounded-full" 
            onClick={(e) => {
                e.preventDefault();
                navigate("/edit-profile");
            }}>
            Edit Profile
            </button>  

            <button 
            className="bg-green-400 font-semibold p-3 px-10 rounded-full" 
            onClick={(e) => {
                e.preventDefault();
                navigate("/my-profile");
            }}>
            My Profile
            </button>  

            <button 
            className="bg-green-400 font-semibold p-3 px-10 rounded-full" 
            onClick={(e) => {
                e.preventDefault();
                navigate("/artist-profile");
            }}>
            Artist Profile
            </button>  
            <button 
            className="bg-green-400 font-semibold p-3 px-10 rounded-full" 
            onClick={(e) => {
                e.preventDefault();
                navigate("/search");
            }}>
            Search Content
            </button> 
            <button 
            className="bg-green-400 font-semibold p-3 px-10 rounded-full" 
            onClick={(e) => {
                e.preventDefault();
                navigate("/search-users");
            }}>
            Search Users
            </button>  
            <button 
            className="bg-green-400 font-semibold p-3 px-10 rounded-full" 
            onClick={(e) => {
                e.preventDefault();
                navigate("/new-home");
            }}>     New Home       </button>  
            
        </div>
        
    );
};

export default HomeComponent;