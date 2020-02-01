import * as React from 'react';
import { useHistory } from 'react-router-dom';

interface LogoutProps {}

export const Logout: React.FunctionComponent<LogoutProps> = () => {
	const history = useHistory();
    history.push('/auth/logout');

	return <div />;
};
