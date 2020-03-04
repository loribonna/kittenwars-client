import { LOGIN_URI, DEFAULT_URI } from './statics';
import { Pages, UnloggedPages, LoggedPages } from './interfaces';
import { Location } from 'history';

export const getJWTToken = (): string => {
	const token = localStorage.getItem('token');
	return token as string;
};

export const redirectToLogin = () => {
	location.href = LOGIN_URI;
};

export const redirectToDefault = () => {
	location.href = DEFAULT_URI;
};

export const checkAllowedRoute = (
	location: Location,
	logged?: Boolean
): boolean => {
	return (
		UnloggedPages.findIndex(p => location.pathname === p) > -1 ||
		(!!logged && LoggedPages.findIndex(p => location.pathname === p) > -1)||
		location.pathname.startsWith(Pages.jwt)
	);
};
