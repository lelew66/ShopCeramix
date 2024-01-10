import google from '../assets/google.png';
import React from "react";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Link } from 'react-router-dom';


function GoogleLogin({googleUserData}) {
    const [user, setUser] = React.useState([]);
    const [profile, setProfile] = React.useState(null);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    React.useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        console.log(res.data);
                        setProfile(res.data);
                        googleUserData(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [user]
    );

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    return (
        <div>
            {/* {profile ? (
                <div>
                    <img src={profile.picture} alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <button onClick={() => login()}>
                Sign in with Google 🚀 </button>
            )} */}

           
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img style={{ width: '20px', marginRight: '5px' }} src={google} alt="google" />
                <Link onClick={() => login()}>Sign in with Google</Link>
            </div>


        </div>
    );
}

export default GoogleLogin;