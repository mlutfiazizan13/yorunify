export const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

export const sha256 = async (plain) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return window.crypto.subtle.digest('SHA-256', data)
}

export const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}

const codeVerifier  = generateRandomString(64);
// const hashed = await sha256(codeVerifier)
// const codeChallenge = base64encode(hashed);


// const urlParams = new URLSearchParams(window.location.search);
// let code = urlParams.get('code');

const clientId = process.env.REACT_APP_SPOTIFY_ID;
const redirectUri = process.env.REACT_APP_REDIRECT_URI;
    
export const getLogin = async () => {
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);


    const scope = 'user-read-private user-read-email user-top-read';
    const authUrl = new URL("https://accounts.spotify.com/authorize")

    // generated in the previous step
    localStorage.setItem('code_verifier', codeVerifier);

    const params =  {
        response_type: 'code',
        client_id: clientId,
        scope,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: redirectUri,
    }

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
}

export const setToken = async (code) => {
    // stored in the previous step
    let codeVerifier = localStorage.getItem('code_verifier');

    console.log("codeverifier : " + codeVerifier);

    const payload = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: clientId,
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectUri,
            code_verifier: codeVerifier,
        }),
    }

    console.log(payload);

    const body = await fetch("https://accounts.spotify.com/api/token", payload);
    const response =await body.json();
    
    if (response.access_token != null) {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
        localStorage.setItem('expires_in', response.expires_in);
        localStorage.setItem('token_type', response.token_type);

        Date.prototype.addSeconds = function(second) {
            var date = new Date(this.valueOf());
            date.setSeconds(date.getSeconds() + second);
            return date;
        }
        var date = new Date();
        localStorage.setItem('expired_at', date.addSeconds(parseInt(localStorage.getItem('expires_in'))));
    }
}

export const getRefreshToken = async () => {

    // refresh token that has been previously stored
    const refreshToken = localStorage.getItem('refresh_token');
    const url = "https://accounts.spotify.com/api/token";
 
    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: clientId
        }),
    }

    const body = await fetch(url, payload);
    const response = await body.json();

    if (response.access_token != null) {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);

        Date.prototype.addSeconds = function(second) {
            var date = new Date(this.valueOf());
            date.setSeconds(date.getSeconds() + second);
            return date;
        }
        var date = new Date();
        localStorage.setItem('expired_at', date.addSeconds(parseInt(localStorage.getItem('expires_in'))));
        console.log("getToken success");
    }
}
