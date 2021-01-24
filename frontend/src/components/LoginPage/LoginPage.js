import React from 'react';
import name from '../../static/icons/logo-word.svg'
import './LoginPage.css'
import { useAuth0 } from '@auth0/auth0-react';


const LoginPage = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <div className="login-page flex h-screen justify-center items-center">
            <div className="flex-col">
                <img src={name} alt="Hops Brand"/>
                <button onClick={() => loginWithRedirect()} className="my-16 m-auto h-11 w-4/5 bg-black text-white block shadow-sm sm:text-sm border-black-500 " >
                    Sign In
                </button>
            </div>
        </div>
        );
};

export default LoginPage;