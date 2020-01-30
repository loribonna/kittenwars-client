import { LOGIN_URI } from './statics';

export const getJWTToken = (): string => {
	const token = localStorage.getItem('token');
	return token as string;
};

export const redirectToLogin = () => {
	location.href = LOGIN_URI;
};
