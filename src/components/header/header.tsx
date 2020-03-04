import * as React from 'react';
import './header.scss';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Pages } from '../../helpers/interfaces';
import { Location } from 'history';

interface HeaderProps extends RouteComponentProps {
	logged: Boolean;
	isAdmin: Boolean;
	onPageChange: Function;
}

interface HeaderState {
	logged: Boolean;
	isAdmin: Boolean;
	location: Location;
}

class Header extends React.Component<HeaderProps, HeaderState> {
	constructor(props) {
		super(props);
		this.state = {
			logged: this.props.logged,
			isAdmin: this.props.isAdmin,
			location: this.props.location
		};
		this.props.onPageChange(this.props.location);
	}

	componentDidUpdate() {
		let newState = {};
		if (this.props.logged !== this.state.logged) {
			newState = { logged: this.props.logged };
		}
		if (this.props.isAdmin != this.state.isAdmin) {
			newState = { ...newState, isAdmin: this.props.isAdmin };
		}
		if (this.props.location.hash !== this.state.location.hash) {
			newState = { ...newState, location: this.props.location };
			this.props.onPageChange(location);
		}
		if (
			Object.keys(newState).length !== 0 &&
			newState.constructor === Object
		) {
			this.setState({ ...this.state, ...newState });
		}
	}

	onNavClick(page: Pages) {
		this.props.history.push(page);
	}

	renderLoggedUser(): JSX.Element {
		return (
			<nav className="navbar navbar-expand-lg navbar-light custom-header">
				<div className="mr-auto">
					<a
						className="navbar-brand"
						href="#"
						onClick={() =>
							this.onNavClick.apply(this, [Pages.kittens])
						}>
						Kittens
					</a>

					<a
						className="navbar-brand"
						href="#"
						onClick={() =>
							this.onNavClick.apply(this, [Pages.score])
						}>
						Score
					</a>

					<a
						className="navbar-brand"
						href="#"
						onClick={() =>
							this.onNavClick.apply(this, [Pages.user])
						}>
						User
					</a>
					{this.state.isAdmin && (
						<a
							className="navbar-brand"
							href="#"
							onClick={() =>
								this.onNavClick.apply(this, [Pages.admin])
							}>
							Admin
						</a>
					)}
				</div>
				<a
					className="navbar-brand"
					href="#"
					onClick={() => this.onNavClick.apply(this, [Pages.logout])}>
					Logout
				</a>
			</nav>
		);
	}

	renderUnloggedUser(): JSX.Element {
		return (
			<nav className="navbar navbar-expand-lg navbar-light custom-header">
				<div className="mr-auto">
					<a
						className="navbar-brand"
						href="#"
						onClick={() =>
							this.onNavClick.apply(this, [Pages.score])
						}>
						Score
					</a>
				</div>
				<a
					className="navbar-brand"
					href="#"
					onClick={() => this.onNavClick.apply(this, [Pages.login])}>
					Login
				</a>
			</nav>
		);
	}

	render() {
		return (
			<div>
				{this.state.logged && this.renderLoggedUser()}
				{!this.state.logged && this.renderUnloggedUser()}
			</div>
		);
	}
}

export default withRouter(Header);
