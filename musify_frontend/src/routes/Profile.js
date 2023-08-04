import { Icon } from "@iconify/react";
import 'bootstrap/dist/css/bootstrap.css';
import TextInput from "../components/shared/TextInput";
import DropDown from "../components/shared/Dropdown";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { editProfilePOSTRequest, makeUserDataPOSTRequest } from "../utils/serverHelpers";

const ProfileComponent = () => {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [cookies, setCookie] = useCookies(["token"]);
    const navigate = useNavigate();
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const roleOptions = [
        { value: 'artist', label: 'Artist' },
        { value: 'listener', label: 'Listener' },
    ];

    const saveProfileChanges = async () => {
        if (!email || !role || !firstName || !lastName) {
            alert("Please fill in all fields");
            return;
        }

        const data = { email, firstName, lastName, role };
        const response = await editProfilePOSTRequest(
            "/edit-profile",
            data
        );

        if (response && !response.err) {
            alert("Success");
            navigate("/home");
        } else {
            alert("Error: " + response.err);
        }
    };

    // cookies email is undefined
    const getUserData = async (email = cookies.email) => {
        console.log(email);
        const response = await makeUserDataPOSTRequest("/get/userdata", { email: cookies.email });
        // const role = response.role;
        // const firstName = response.firstName;
        // const lastName = response.lastName;
        // const username = response.username;

        setUsername(response.username);
        // setRole(role);
        setFirstName(response.firstName);
        setLastName(response.lastName);

        console.log(response.firstName);
    };

    //getUserData();

    console.log(firstName);

    return (

        <div className="w-100 h-100 d-flex flex-column align-items-center">
            <div className="p-5 w-100 d-flex justify-content-center row nav-bar border-b border-solid">
                <button className="col-1 text-white" onClick={() => navigate('/home')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="auto" viewBox="0 0 320 512"><path fill="currentColor" d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256l137.3-137.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>
                </button>
                <div className="col-2">
                    <div className="profile-icon rounded-circle d-flex justify-content-center align-items-center"> 
                        <span className= "font-bold bg-transparent"> MN</span>
                    </div>
                </div>
                <div className="col-9">
                    <div className="profile-info text-white d-flex align-items-end">
                        <div>
                        <p className="text-white font-weight-bold"> Profile</p>

                        <span className="text-green-300 font-bold text-6xl bg-transparent">Muskaan Nandu</span>

                        <p className="text-sm font-weight-bold mb-4"> 1 Public Playlist . 1 Follower . 4 Following </p>
                        {/* change follow to unfollow if following */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-3/5 justify-content-left">
                <button className="text-white m-4 border border-solid rounded-3xl px-4 py-2">Follow</button>
            </div>

            <div className="w-3/5 p-5 border rounded-xl border-solid border-gray-300 text-white ">
                <span className="text-2xl font-bold mb-5">Public Playlists</span>
                <div className="row">
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-20 bg-white"></div>
                    <p>Taylor Swift</p>
                </div>
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-20 bg-white"></div>
                    <p>Taylor Swift</p>
                </div>
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-20 bg-white"></div>
                    <p>Taylor Swift</p>
                </div>
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-20 bg-white"></div>
                    <p>Taylor Swift</p>
                </div>
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-20 bg-white"></div>
                    <p>Taylor Swift</p>
                </div>
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-20 bg-white"></div>
                    <p>Taylor Swift</p>
                </div>
                </div>
            </div>

            <div className="w-3/5 mt-4 p-5 border rounded-xl border-solid border-gray-300 text-white ">
                <span className="text-2xl font-bold mb-5">Followers</span>
                <div className="row">
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-20 bg-white"></div>
                    <p>Taylor Swift</p>
                </div>
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-20 bg-white"></div>
                    <p>Taylor Swift</p>
                </div>
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-20 bg-white"></div>
                    <p>Taylor Swift</p>
                </div>
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-20 bg-white"></div>
                    <p>Taylor Swift</p>
                </div>
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-20 bg-white"></div>
                    <p>Taylor Swift</p>
                </div>
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-20 bg-white"></div>
                    <p>Taylor Swift</p>
                </div>
                </div>
            </div>

            <div className="w-3/5 mt-4 p-5 border rounded-xl border-solid border-gray-300 text-white ">
                <span className="text-2xl font-bold mb-5">Following</span>
                <div className="row">
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-20 bg-white"></div>
                    <p>Taylor Swift</p>
                </div>
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-20 bg-white"></div>
                    <p>Taylor Swift</p>
                </div>
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-20 bg-white"></div>
                    <p>Taylor Swift</p>
                </div>
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-20 bg-white"></div>
                    <p>Taylor Swift</p>
                </div>
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-20 bg-white"></div>
                    <p>Taylor Swift</p>
                </div>
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-20 bg-white"></div>
                    <p>Taylor Swift</p>
                </div>
                </div>
            </div>
        </div>


        //     <div className="w-3/5 mt-4 p-5 flex flex-col border rounded-xl border-solid border-gray-300 ">
        //         <div className="text-green-300 font-bold text-5xl grid grid-cols-11">
        //             <button onClick={() => navigate('/home')}>
        //                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="auto" viewBox="0 0 320 512"><path fill="currentColor" d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256l137.3-137.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>
        //             </button>
        //             <h1 className="p-4 col-span-10">Edit Profile</h1>
        //         </div>
        //         <div>


        //             <TextInput
        //                 label="Username"
        //                 placeholder="username"
        //                 className="my-6"
        //                 value={username}
        //                 setValue={setUsername}
        //             // change this to username
        //             />

        //             <TextInput
        //                 label="Email address"
        //                 placeholder="eg: janedoe@email.com"
        //                 className="my-6"
        //                 value={email}
        //                 setValue={setEmail}
        //             />

        //             <div className="grid grid-cols-2 gap-4">
        //                 <TextInput
        //                     label="First Name"
        //                     placeholder="eg: Jane"
        //                     className="my-6"
        //                     value={firstName}
        //                     setValue={setFirstName}
        //                 />

        //                 <TextInput
        //                     label="Last Name"
        //                     placeholder="eg: Doe"
        //                     className="my-6"
        //                     value={lastName}
        //                     setValue={setLastName}
        //                 />
        //             </div>

        //             <DropDown
        //                 label="Role"
        //                 className="my-6"
        //                 options={roleOptions}
        //                 value={role}
        //                 setValue={setRole}
        //             />

        //             <button
        //                 className="bg-green-400 font-semibold p-3 px-10 rounded-full"
        //                 onClick={(e) => {
        //                     e.preventDefault();
        //                     saveProfileChanges();
        //                 }}>
        //                 Save Changes
        //             </button>

        //         </div>
        //     </div>
        // </div>
    );
}

export default ProfileComponent;