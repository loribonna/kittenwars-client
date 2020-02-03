import * as React from 'react';
import './login.scss';

interface LoginProps {
    
}

interface LoginState {}

export class Login extends React.Component<LoginProps, LoginState> {
	constructor(props) {
		super(props);
		this.state = {};
    }

	render() {
		return (
			<div>
                <a href="/auth/google">LOGIN WITH GOOGLE</a>
			</div>
		);
	}
}

