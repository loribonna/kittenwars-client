import { LOGIN_URI, DEFAULT_URI } from './statics';

export const getJWTToken = (): string => {
	const token = localStorage.getItem('token');
	return token as string;
};

export const redirectToLogin = () => {
	location.href = LOGIN_URI;
};

export const redirectToDefault = () => {
	location.href = DEFAULT_URI;
}