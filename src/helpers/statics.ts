export const getBaseUrl = () => {
    const port = window.location.port;
    const hostname = window.location.hostname;
    console.log(hostname, port);

    return "https://"+hostname+":"+port;
}

export const BASE_URI=getBaseUrl(); // 'https://kittenwars-awm.herokuapp.com:';export const KITTENS_URI = BASE_URI + '/kittens/';
export const VOTE_URI = BASE_URI + '/vote';
export const LOGIN_URI = BASE_URI + '/app/login';
export const LOGOUT_URI = BASE_URI + '/auth/logout'
export const DEFAULT_URI = BASE_URI + '/app/score';
export const ADMIN_URI = BASE_URI + '/admin/';