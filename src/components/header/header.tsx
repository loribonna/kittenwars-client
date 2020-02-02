import * as React from 'react';
import ReactDOM from 'react-dom';
import './header.scss';
import { Pages } from '../../helpers/interfaces';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface HeaderProps extends RouteComponentProps {
	logged: Boolean;
}

interface HeaderState {
	logged: Boolean;
}

class Header extends React.Component<HeaderProps, HeaderState> {
	constructor(props) {
		super(props);
		this.state = { logged: false };
	}

	componentDidUpdate() {
		if (this.props.logged !== this.state.logged) {
			this.setState({ ...this.state, logged: this.props.logged });
		}
	}

	onNavClick(page) {
		this.props.history.push(page);
	}

	render() {
		return (
			<div>
				{this.state.logged && (
					<nav className="navbar navbar-expand-lg navbar-light bg-light">
						<div className="mr-auto">
							<a
								className="navbar-brand"
								href="#"
								onClick={() =>
									this.onNavClick.apply(this, [
										'/app/kittens'
									])
								}>
								Kittens
							</a>

							<a
								className="navbar-brand"
								href="#"
								onClick={() =>
									this.onNavClick.apply(this, ['/app/score'])
								}>
								Score
							</a>

							<a
								className="navbar-brand"
								href="#"
								onClick={() =>
									this.onNavClick.apply(this, ['/app/user'])
								}>
								User
							</a>
						</div>
						<a
							className="navbar-brand"
							href="#"
							onClick={() =>
								this.onNavClick.apply(this, ['/app/logout'])
							}>
							Logout
						</a>
					</nav>
				)}
				{!this.state.logged && (
					<nav className="navbar navbar-expand-lg navbar-light bg-light">
						<div className="mr-auto">
							<a
								className="navbar-brand"
								href="#"
								onClick={() =>
									this.onNavClick.apply(this, ['/app/score'])
								}>
								Score
							</a>
						</div>
						<a
							className="navbar-brand"
							href="#"
							onClick={() =>
								this.onNavClick.apply(this, ['/app/login'])
							}>
							Login
						</a>
					</nav>
				)}
			</div>
		);
	}
}

export default withRouter(Header);
