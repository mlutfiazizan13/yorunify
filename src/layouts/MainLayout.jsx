import { Fragment, useContext, useEffect } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { UserContext } from "../App";
import { getRefreshToken } from "../utils/SpotifyAuth";
import { getCurrentUser } from "../services/SpotifyServices";


const MainLayout = () => {

    const { user, setUser } = useContext(UserContext);
    
    useEffect(() => {
        const today = new Date();
        if (localStorage.getItem('access_token') != null && localStorage.getItem('access_token') !== 'undefined') {
            if (today > new Date(localStorage.getItem('expired_at'))) {
                if (localStorage.getItem('refresh_token') != null && localStorage.getItem('refresh_token') !== 'undefined') {
                    getRefreshToken()
                        .then(() => {
                            getCurrentUser(localStorage.getItem('access_token'))
                                .then(response => setUser(response.data))
                        })
                } else {
                    localStorage.clear()
                    setUser(null);
                }
            } else {
                getCurrentUser(localStorage.getItem('access_token'))
                    .then(response => setUser(response.data))
            }
        } else {
            if (localStorage.getItem('refresh_token') != null && localStorage.getItem('refresh_token') !== 'undefined') {
                getRefreshToken()
                    .then(() => {
                        getCurrentUser(localStorage.getItem('access_token'))
                            .then(response => setUser(response.data))
                    })
            } else {
                localStorage.clear()
                setUser(null);
            }
   
        }
    }, [])

    return ( 
        <Fragment>
        
            {/* <div id='page-container' className='relative min-h-screen bg-gradient-to-bl from-[#1A3159] via-[#121F3B] from-[35%] to-[#0B1322]'> */}
            <div id='page-container' className='relative min-h-screen bg-[#272727]'>

                {/* {isFixed ? <NavbarFixed isScroll={isScrollNav}></NavbarFixed> : <NavbarSticky isScroll={isScrollNav}></NavbarSticky>} */}
                <Navbar></Navbar>
                
                <div id='content-wrap' className=''>
                    <Outlet/>
                </div>
                <footer id='footer' className='px-5 lg:px-36'>
                    <Footer />
                </footer>
            </div>
            <ScrollRestoration />

        </Fragment>
     );
}
 
export default MainLayout;