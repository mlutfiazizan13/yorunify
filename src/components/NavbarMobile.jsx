import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { faBarChart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faTimes } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../App";

const NavbarMobile = (onLogout) => {

    const [isNavActive, setNavActive] = useState(false);
    const { user, setUser } = useContext(UserContext);


    const mobileNavbar = () => {
        setNavActive(!isNavActive);
    };

    const logout = () => {
        localStorage.clear()
        setUser(null);
    }

    return ( 
        <>
            <div className="fixed lg:hidden top-0 z-10 w-full bg-white">
                <div className='flex items-center justify-between text-black px-5 sm:px-14 py-7'>

                    <div className='flex items-centerlg:py-0 lg:border-b-0'>
                        <Link to="/">
                            <p className="text-4xl font-bold">Yorunify°</p>
                        </Link>
                    </div>
                    <div className=''>
                        <button type='button' onClick={mobileNavbar}>
                            <FontAwesomeIcon className="h-6 w-6" icon={faBarChart} />
                        </button>
                    </div>
                </div>
            </div>
            <div id="mobile_nav relative">
                <div id="mob_nav_overlay" className={isNavActive? `fixed w-screen h-screen top-0 z-30 bg-[#0000007d]` : 'hidden'}  onClick={mobileNavbar}></div>
       
                <div id="mob_nav_body" className={isNavActive ? `fixed bg-white top-0 right-0 shadow-md h-screen lg:hidden lg:justify-between xl:hidden w-full max-w-[80%] duration-300 z-50`: `fixed bg-white top-0 right-0 shadow-md h-screen translate-x-full lg:hidden lg:justify-between xl:hidden w-full max-w-[80%] duration-300 z-50` }>
                    <div className={`flex ${user == null && 'justify-end'} items-center`}>
                    {
                        user !== null && (
                            <div className="grow">
                                    <div className="flex items-center pl-10 gap-2 rounded-full">
                                        <img src={user.images[0].url} className="w-10 h-10 rounded-full" alt={`${user.display_name}_img`} />
                                        <p className=" text-lg font-bold rounded-xl">{user.display_name} </p>
                                    </div>
                            </div>
                        )
                    }
                        
                        <div className={`p-8 text-end select-none cursor-pointer`}  onClick={mobileNavbar}>
                            <FontAwesomeIcon className="h-6 w-6" icon={faTimes} />
                        </div>
                    </div>
                    <div className={`flex flex-col text-md `}>
                        <Link onClick={mobileNavbar} className="text-2xl font-medium py-3 px-10" to={'/'}>Home</Link>
                        <Link onClick={mobileNavbar} className="text-2xl font-medium py-3 px-10" to={'/about'}>About</Link>
                        <Link onClick={mobileNavbar} className="text-2xl font-medium py-3 px-10" to={'/contact'}>Contact</Link>
                        
                        {
                            user !== null && (<Link onClick={mobileNavbar} className="text-2xl font-medium py-3 px-10" to={'/profile'}>Profile</Link>)
                        }
                        {
                            user !== null && (<button className="text-2xl font-medium text-start text-red-500 py-3 px-10" onClick={() => {logout();mobileNavbar()}}>Logout</button>)
                        }
    
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default NavbarMobile;