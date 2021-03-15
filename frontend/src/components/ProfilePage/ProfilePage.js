import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import NavBar from "../NavBar/NavBar"

const ProfilePage = () => {
    const { user } = useAuth0();
    console.log(user)
    return (
            <div>
            <NavBar />
            <div>
                <img src={user.picture} alt={user.name} />
                <h2>{user.name}</h2>
                <p>{user.email}</p>
            </div>
            </div>
    );
};

export default ProfilePage;