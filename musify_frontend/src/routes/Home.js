import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";

const HomeComponent = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const navigate = useNavigate();

    const logout = async () => {
        removeCookie("token");
        alert("Success");
        navigate("/login");
    };

    return (
        <div>
            <h1>Home - Signed In</h1>
            <button 
            className="bg-green-400 font-semibold p-3 px-10 rounded-full" 
            onClick={(e) => {
                e.preventDefault();
                logout();
            }}>
            LOG OUT
            </button>   
        </div>
    );
};

export default HomeComponent;