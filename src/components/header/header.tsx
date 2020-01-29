import * as React from 'react';
import ReactDOM from 'react-dom';
import './header.scss';
import { Pages } from '../../helpers/interfaces';

interface HeaderProps {
	currentPage: Pages;
	setPage: Function;
}

interface HeaderState {}

export class Header extends React.Component<HeaderProps, HeaderState> {
	constructor(props) {
		super(props);
	}

	setPage(page: Pages) {
		this.props.setPage(page);
	}

	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<div className="mr-auto">
					<a
						className="navbar-brand"
						href="/app/kittens"
						onClick={() => this.setPage(Pages.kittens)}>
						Kittens
					</a>

					<a
						className="navbar-brand"
						href="/app/score"
						onClick={() => this.setPage(Pages.score)}>
						Score
					</a>

					<a
						className="navbar-brand"
						href="/app/user"
						onClick={() => this.setPage(Pages.user)}>
						User
					</a>
				</div>

				<a
					className="navbar-brand "
					href="/app/login"
					onClick={() => this.setPage(Pages.login)}>
					Login
				</a>
			</nav>
		);
	}
}
