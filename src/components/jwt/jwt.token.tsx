import * as React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { get } from '../../helpers/crud';
import { redirectToLogin } from '../../helpers/helpers';

interface JWTProps {
	checkAuth: Function;
}

export const JWTController: React.FunctionComponent<JWTProps> = props => {
	const history = useHistory();
	const params = useParams();
	const token = (params as any).token;

	const getTokenVerification = async () => {
		try {
			await get('/auth/jwt_check', token);
            localStorage.setItem('token', token);
            props.checkAuth(true);

            history.push('/app/kittens');
		} catch (e) {
			props.checkAuth(false);
			if (e.status === 401) {
				redirectToLogin();
			}
		}
	};

	React.useEffect(() => {
		getTokenVerification();
	}, []);

	return <div />;
};
