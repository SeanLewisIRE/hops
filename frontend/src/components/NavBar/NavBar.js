import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'
import logo from '../../static/images/logo.svg'
import { useState } from 'react'
import { Transition } from '@headlessui/react'
import { useAuth0 } from "@auth0/auth0-react";

function NavBar() { 
    const { user, isAuthenticated, logout, loginWithRedirect } = useAuth0();
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="block navbar container px-5 h-20 flex items-center justify-between">
                
            <Link to={"/BeerList"} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                <img className="tems-center" alt="Hops Logo" src={logo} />
            </Link>
                
                <div className="tems-center">
                <div>
                    {isAuthenticated 
                        ?  <button onClick={() => setIsOpen(!isOpen)} className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu" aria-haspopup="true">
                                <span className="sr-only">Open user menu</span>
                                <img className="h-8 w-8 rounded-full" src={user.picture} alt={user.name} />
                            </button> 
                        :   <button onClick={() => setIsOpen(!isOpen)} className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu" aria-haspopup="true">
                                <span className="sr-only">Open user menu</span>
                            <img className="h-8 w-8 rounded-full" src='https://static.wikia.nocookie.net/simpsons/images/c/ce/Duff_man.png/revision/latest?cb=20201222215840' alt='Placeholder' />
                            </button> 
                    }
                    

                    <Transition
                        show={isOpen}
                        enter="transition ease-out duration-100 transform"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="transition ease-in duration-75 transform"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        
                        {isAuthenticated
                        ?   (ref) => (
                            <div ref={ref} className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                    <Link to={"/profile"} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                                        User Profile
                                    </Link>
                                    <button onClick={() => logout({ returnTo: window.location.origin })} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                                        Logout
                                    </button>
                                </div>

                            </div>
                            )
                        : (ref) => (
                            <div ref={ref} className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                    
                                    <button onClick={() => loginWithRedirect()} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </Transition>
                </div>
            </div>
    </nav>
    )
}
export default NavBar