import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_SPOTIFY_API_URL;

export const getCurrentUser = async (access_token) => {
    try {
        const response = await axios.get("/v1/me", {
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const getTopItems = async (type, limit = 10, time_range = 'long_term' ) => {
    try {
        const response = await axios.get("/v1/me/top/"+type+"?limit="+limit+"&time_range="+time_range, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}