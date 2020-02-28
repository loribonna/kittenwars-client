export const getBaseUrl = () => {
	const hostname = window.location.hostname;
	return 'http://' + hostname;
};

export const BASE_URI = getBaseUrl();
export const KITTENS_URI = BASE_URI + '/kittens/';
export const VOTE_URI = BASE_URI + '/vote';
export const LOGIN_URI = BASE_URI + '/app/login';
export const LOGOUT_URI = BASE_URI + '/auth/logout';
export const DEFAULT_URI = BASE_URI + '/app/score';
export const ADMIN_URI = BASE_URI + '/admin/';
