import * as React from 'react';
import { LOGOUT_URI } from '../../helpers/statics';

interface LogoutProps {}

export const Logout: React.FunctionComponent<LogoutProps> = () => {
	localStorage.removeItem('token');
	location.href = LOGOUT_URI;
	return <div />;
};
