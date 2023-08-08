import TextInput from "../components/shared/TextInput";
import PasswordInput from "../components/shared/PasswordInput";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {makeUnauthenticatedPOSTRequest} from "../utils/serverHelpers";
import {useCookies} from "react-cookie";
import Button from "../components/shared/Button";
import DropDown from "../components/shared/Dropdown";

const SignupComponent = () => {
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [role, setRole] = useState("");

    const [cookie, setCookie] = useCookies(["token"]); 
    const navigate = useNavigate();

    const roleOptions = [
		{ value: "artist", label: "Artist" },
		{ value: "listener", label: "Listener" },
	];

    const signUp = async () => {
        if (!email || !password || !username || !firstName || !lastName || !role) {
            alert("Please fill in all fields");
            return;
        }

        else if (email !== confirmEmail) {
            alert(
                "Email and confirm email fields must match. Please check again"
            );
            return;
        }

        const data = {email, password, username, firstName, lastName, role};
        const response = await makeUnauthenticatedPOSTRequest(
            "/auth/register",
            data
        );
        if (response && !response.err) {
            const token = response.token;
            const date = new Date();
            date.setDate(date.getDate() + 30);
            setCookie("token", token, {path: "/", expires: date});
            alert("Success");
            navigate("/home");
        } else {
            alert("Error: " + response.err);
        }
    };


    return (
        <div className="w-full h-full flex flex-col items-center text-white">
            <div className="p-5 w-100 d-flex justify-content-center">
                <i class="musify-icon bi bi-music-note-beamed"></i>
                <h1 className="musify">Musify</h1>
            </div>  
            <div className="col-xl-5 col-md-6 col-sm-10 col-10 mx-auto py-10">
                {/*  I will have my 2 inputs(email and password) and I will have my sign up instead button*/}
                <div className="font-bold mb-4 text-2xl d-flex justify-content-center">
                    <p>Sign up for free to start listening.</p>
                </div>
                <TextInput
                    label="Email address"
                    placeholder="Enter your email"
                    className="my-6"
                    value={email}
                    setValue={setEmail}
                />
                <br></br>
                <TextInput
                    label="Confirm Email Address"
                    placeholder="Enter your email again"
                    className="mb-6"
                    value={confirmEmail}
                    setValue={setConfirmEmail}
                />
                <br></br>
                <TextInput
                    label="Username"
                    placeholder="Enter your username"
                    className="mb-6"
                    value={username}
                    setValue={setUsername}
                />
                <br></br>
                <PasswordInput
                    label="Create Password"
                    placeholder="Enter a strong password here"
                    value={password}
                    setValue={setPassword}
                />
                <br></br>
                <DropDown
                    label="Role"
                    className="my-6"
                    options={roleOptions}
                    value={role}
                    setValue={setRole}
                />
                <br></br>
                <div className="w-full flex justify-between items-center space-x-8">
                    <TextInput
                        label="First Name"
                        placeholder="Enter Your First Name"
                        className="my-6"
                        value={firstName}
                        setValue={setFirstName}
                    />
                    <br></br>
                    <TextInput
                        label="Last Name"
                        placeholder="Enter Your Last Name"
                        className="my-6"
                        value={lastName}
                        setValue={setLastName}
                    />
                </div>
                <br></br>
                <div className="border-bottom border-solid pb-3 mb-3 d-flex justify-content-center">
                    <Button className="green-btn" text="Sign Up" onClick={
                        (e) => {
                            e.preventDefault();
                            signUp();
                        }
                    } />
                </div>
                <div className="mt-6 mb-10 text-lg d-flex justify-content-center">
                    <p>Already have an account?</p> <p className="ps-2"><Link to="/login">Log In Instead</Link></p>
                </div>
                
            </div>
        </div>
    );
};

export default SignupComponent;