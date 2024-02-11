
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import NavbarMobile from "./NavbarMobile";
import { UserContext } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {

    const { user, setUser } = useContext(UserContext);

    const [isOpen, setOpen] = useState(false);

    const logout = () => {
        localStorage.clear()
        setUser(null);
    }

    return ( 
        <>
            <div id="desktop-navbar" className="hidden lg:block mx-14 xl:mx-32  bg-transparent z-20">
                <div className="flex justify-center items-center text-white py-6 relative">
                    <div className="flex justify-around gap-10 items-center text-lg font-medium">
                        <Link to={'/'} className="border-b-transparent text-xl border-b-2 hover:border-white">
                            Home
                        </Link>

                        <Link to={'/about'} className="border-b-transparent text-xl border-b-2 hover:border-white">
                            About
                        </Link>

                        <Link to={'/contact'} className="border-b-transparent text-xl border-b-2 hover:border-white">
                            Contact
                        </Link>                 
                    </div>
                    {
                        user !== null ? 
                        <div className="absolute right-0">
                            <div className="relative select-none">
                                <div onClick={() => setOpen(!isOpen)} className="flex items-center text-black bg-white gap-2 px-4 py-2 rounded-full">
                                    <img src={user.images[0].url} className="w-8 h-8 rounded-full" alt="" />
                                    <p className=" text-lg font-bold rounded-xl">{user.display_name} </p>
                                    {isOpen ? <FontAwesomeIcon className="h-4 w-4" icon={faChevronUp} /> : <FontAwesomeIcon className="h-4 w-4" icon={faChevronDown} /> }
                                    
                                </div>

                                <div className={`absolute ${isOpen ? '': 'hidden'} w-full mt-3 text-black bg-white rounded-md p-3`}>
                                    <Link to={'/'} className="block text-black w-full text-center text-lg text-medium px-3 py-2 font-medium">Profile</Link>
                                    <hr />
                                    <button onClick={() => logout()} className="text-red-500 w-full text-lg text-medium px-3 py-2 font-medium">Logout</button>
                                </div>
                            </div>
                        </div>
                        : ''
                    }
                </div>
            </div>    


                        {/* Mobile Navbar */}
        <NavbarMobile onLogout={() => logout()}/>

        
        </>
     );
}
 
export default Navbar;