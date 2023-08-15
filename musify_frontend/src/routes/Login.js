import TextInput from "../components/shared/TextInput";
import PasswordInput from "../components/shared/PasswordInput";
import {Link, useNavigate} from "react-router-dom";
import { useState } from "react";
import {useCookies} from "react-cookie";
import {makeUnauthenticatedPOSTRequest} from "../utils/serverHelpers";
import Button from "../components/shared/Button";

const LoginComponent = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cookies, setCookie] = useCookies(["token"]);
    const navigate = useNavigate();

    const login = async () => {
        const data = {email, password};
        if(!data.email || !data.password) {
            alert("Please fill in all fields");
            return;
        }
        const response = await makeUnauthenticatedPOSTRequest(
            "/auth/login",
            data
        );
        console.log("Login: ", response, response.err);
        if (response && !response.err) {
            const token = response.token;
            const date = new Date();
            date.setDate(date.getDate() + 30);
            setCookie("token", token, {path: "/", expires: date});
            setCookie("currentUserId", response._id, {path: "/", expires: date});
            alert("Success");
            navigate("/home");
        } else {
            alert("Error: " + response.err);
        }
    };

    return (
        <div className="text-white" >
            <div className="p-5 w-100 d-flex justify-content-center">
                <i class="musify-icon bi bi-music-note-beamed"></i>
                <h1 className="musify">Musify</h1>
            </div>        
            <div className="col-xl-5 col-md-6 col-sm-10 col-10 mx-auto py-10">
                 <div className="font-bold mb-4 d-flex justify-content-center">
                    <p>To continue, log in to Musify.</p>
                </div>
                <TextInput
                    label="Email address"
                    placeholder="Enter your email"
                    className="my-6"
                    value={email}
                    setValue={setEmail}
                />
                <br></br>
                <PasswordInput 
                    label="Password" 
                    placeholder="Password" 
                    value={password} 
                    setValue={setPassword} 
                />
                <br></br>
                <div className="border-bottom border-solid pb-3 mb-3 d-flex justify-content-center">
                    <Button text="LOG IN" className="green-btn" onClick={(e) => {
                            e.preventDefault();
                            login();
                        }
                    } />
                </div>
                <div className="my-6 text-lg d-flex justify-content-center">
                    <p>Don't have an account?</p> <p className="ps-2"><Link to="/signup"> Sign Up for Musify Here</Link></p>
                </div>
                <br/>
                <br/>
                <div className="my-6 text-lg d-flex justify-content-center">
                    <p>Admin?</p> <p className="ps-2"><Link to="/admin"> Click Here for Admin login</Link></p>
                </div>
            </div>
        </div>
    );
}

export default LoginComponent;