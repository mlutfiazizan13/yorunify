import { faGithub, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <>
        <hr />
        <div className="text-center pt-5 ">
            <div className="flex justify-center gap-7 text-white">
                <Link to={'/'}>Home</Link>
                <Link to={'/about'}>About</Link>
                <Link to={'/contact'}>Contact</Link>
            </div>

        </div>
        <div className="text-center text-white py-5">
            <div className="mb-5">
                <p className="mb-2">Reach me out</p>
                <div className="flex justify-center gap-3">
                    <a href="https://github.com/mlutfiazizan13" target="_blank" rel="noreferrer"><FontAwesomeIcon className="fa-xl" icon={faGithub} /></a>
                    <a href="https://www.instagram.com/lutf_azn/" target="_blank" rel="noreferrer"><FontAwesomeIcon className="fa-xl" icon={faInstagram} /></a>
                    <a href="https://www.linkedin.com/in/muhamad-lutfi-azizan/" target="_blank" rel="noreferrer"><FontAwesomeIcon className="fa-xl" icon={faLinkedin} /></a>
                </div>
            </div>
            <p className="text-white">Made By <a className="font-medium" href="https://github.com/mlutfiazizan13" target="_blank" rel="noreferrer">Muhamad Lutfi Azizan</a></p>
         
        </div>
        </>
     );
}
 
export default Footer;