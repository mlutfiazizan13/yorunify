import { Fragment } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const MainLayout = () => {

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