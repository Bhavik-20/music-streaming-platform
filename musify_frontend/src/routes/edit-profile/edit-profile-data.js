import TextInput from "../../components/shared/TextInput";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProfileThunk } from '../../services/profile-thunks';
import ReadOnlyInput from '../../components/shared/ReadOnlyInput';

const EditProfileDataComponent = (profileData) => {
    // console.log("From EditProfileDataComponent: ", profileData.user);
    const [email, setEmail] = useState(profileData.user.email);
    const [firstName, setFirstName] = useState(profileData.user.firstName);
    const [lastName, setLastName] = useState(profileData.user.lastName);
    const [username, setUsername] = useState(profileData.user.username);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const SaveProfileChanges = async () => {
        try {
            const response = await dispatch(updateProfileThunk({username, email, firstName, lastName}));
            // console.log("response: ", response);
            if(response.error) {
                alert("This Username already exists");
            } else {
                alert("Profile updated successfully");
                navigate("/home");
            }
        } catch (error) {
            // console.log("Error updating profile: ", error);
            alert("Error updating profile");
        }
        
    };

    return (
        <div>
            <TextInput
                label="Username"
                placeholder="username"
                className="my-6"
                value={username}
                setValue={setUsername}
            />

            <ReadOnlyInput
                label="Email address"
                placeholder="eg: janedoe@email.com"
                className="my-6"
                value={email}
            />

            <div className="grid grid-cols-2 gap-4">
                <TextInput
                    label="First Name"
                    placeholder="eg: Jane"
                    className="my-6"
                    value={firstName}
                    setValue={setFirstName}
                />

                <TextInput
                    label="Last Name"
                    placeholder="eg: Doe"
                    className="my-6"
                    value={lastName}
                    setValue={setLastName}
                />
            </div>

            {/* <DropDown
                        label="Role"
                        className="my-6"
                        options={roleOptions}
                        // value={editProfile.role}
                        // setValue={setRole}
                    /> */}

            <button
                className="bg-green-400 font-semibold p-3 px-10 rounded-full"
                onClick={(e) => {
                    e.preventDefault();
                    SaveProfileChanges();
                }}>
                Save Changes
            </button>

        </div>
    );
};

export default EditProfileDataComponent;