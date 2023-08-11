import TextInput from "../../components/shared/TextInput";
import PasswordInput from "../../components/shared/PasswordInput";
import {Link, useNavigate} from "react-router-dom";
import { useState } from "react";
import {useCookies} from "react-cookie";
import {makeUnauthenticatedPOSTRequest} from "../../utils/serverHelpers";
import Button from "../../components/shared/Button";

const AdminLoginComponent = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cookies, setCookie] = useCookies(["adminToken"]);
    const navigate = useNavigate();

    const login = async () => {
        const data = {email, password};
        if(!data.email || !data.password) {
            alert("Please fill in all fields");
            return;
        }
        const response = await makeUnauthenticatedPOSTRequest(
            "/admin/login",
            data
        );
        if (response && !response.err) {
            const token = response.token;
            const date = new Date();
            date.setDate(date.getDate() + 30);
            setCookie("adminToken", token, {path: "/", expires: date});
            alert("Success");
            console.log("ADMIN LOGIN SUCCESS");
            navigate("/admin/home");
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
                    <p>To continue, log in to Musify Admin Account.</p>
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
                    <p>Not an Admin?</p> <p className="ps-2"><Link to="/login"> Click Here for User login</Link></p>
                </div>
            </div>
        </div>
    );
};


export default AdminLoginComponent;