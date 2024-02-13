import { useContext, useEffect } from "react";
import { setToken } from "../../utils/SpotifyAuth";
import { useSearchParams , useNavigate} from "react-router-dom";
import { UserContext } from "../../App";
import { getCurrentUser } from "../../services/SpotifyServices";

const Callback = () => {

    const {setUser } = useContext(UserContext);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const goToHomePage = () => navigate('/');

    const callback = () => {
        setToken(searchParams.get('code')).then(() => {
            getCurrentUser(localStorage.getItem('access_token')).then(response => {
                console.log(response)
                setUser(response.data)
            }).then(() => {
                goToHomePage()

            })
        });
    }


    useEffect(() => {
 

       callback()
    }, [])

    return ( 
        <p>Redirect</p>
     );
}
 
export default Callback;