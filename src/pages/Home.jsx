import { useContext, useEffect } from "react";
import { getLogin, getRefreshToken } from "../utils/SpotifyAuth";
import { UserContext } from "../App";
import { getCurrentUser } from "../services/SpotifyServices";
import Songs from "../containers/Content";

const Home = () => {

    const { user, setUser } = useContext(UserContext);

    return(
        <div className="py-32 lg:py-12">
            <div className="text-center">
                <p className="text-4xl text-white">Yorunify°</p>
            </div>
                { user == null ? 
                 <div className="flex justify-center py-5">
                    <div>
                        <button onClick={() => getLogin()} className="py-2 px-5 rounded-full bg-[#1DB954] font-medium text-xl text-white">Login Spotify</button> 
                    </div>
                 </div>
                : 
                    <Songs></Songs>

            
                }
            {/* <p>Login</p> */}
        </div> 
    )

}
export default Home;

// const Login = () => {

//     const isAuthenticated = isAuthenticated();
    
//     return ( 
//         <div className="p-36">
//             <div className="text-center">
//                 <p className="text-3xl">Yorushikapp</p>
//             </div>
//             <div className="flex justify-center py-5">
//                 { isAuthenticated ? <button onClick={() => getLogin()} className="py-2 px-5 rounded-lg bg-green-600 font-medium text-xl text-white">Login Spotify</button> : <p>Authenticated</p> }
                
//             </div>
//             {/* <p>Login</p> */}
//         </div> 
//      );
// }
 
// export default Login;