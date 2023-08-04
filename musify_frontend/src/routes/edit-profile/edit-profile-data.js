import 'bootstrap/dist/css/bootstrap.css';
import TextInput from "../../components/shared/TextInput";
import { useState } from "react";

const EditProfileDataComponent = (user) => {
    console.log("From EditProfileDataComponent: ", user.user);
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    return (
        <div>
            <TextInput
                label="Username"
                placeholder="username"
                className="my-6"
                value={user.user.username ? user.user.username : username}
                setValue={setUsername}
            />

            <TextInput
                label="Email address"
                placeholder="eg: janedoe@email.com"
                className="my-6"
                value={user.user.email ? user.user.email : email}
                setValue={setEmail}
            />

            <div className="grid grid-cols-2 gap-4">
                <TextInput
                    label="First Name"
                    placeholder="eg: Jane"
                    className="my-6"
                    value={user.user.firstName ? user.user.firstName : firstName}
                    setValue={setFirstName}
                />

                <TextInput
                    label="Last Name"
                    placeholder="eg: Doe"
                    className="my-6"
                    value={user.user.lastName ? user.user.lastName : lastName}
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
                    // saveProfileChanges();
                }}>
                Save Changes
            </button>

        </div>
    );
};

export default EditProfileDataComponent;