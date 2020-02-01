import * as React from 'react';
import ReactDOM from 'react-dom';
import './header.scss';
import { Pages } from '../../helpers/interfaces';

interface HeaderProps {
	logged: Boolean;
}

interface HeaderState {
	logged: Boolean;
}

export class Header extends React.Component<HeaderProps, HeaderState> {
	constructor(props) {
		super(props);
		this.state = { logged: false };
	}

	componentDidUpdate() {
		if (this.props.logged !== this.state.logged) {
			this.setState({ ...this.state, logged: this.props.logged });
		}
	}

	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<div className="mr-auto">
					<a className="navbar-brand" href="/app/kittens">
						Kittens
					</a>

					<a className="navbar-brand" href="/app/score">
						Score
					</a>

					<a className="navbar-brand" href="/app/user">
						User
					</a>
				</div>

				{!this.state.logged && (
					<a className="navbar-brand " href="/app/login">
						Login
					</a>
				)}
				{this.state.logged && (
					<a className="navbar-brand " href="/app/logout">
						Logout
					</a>
				)}
			</nav>
		);
	}
}
