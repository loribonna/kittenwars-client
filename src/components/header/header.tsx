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
				<a
					className="navbar-brand"
					href="#kittens"
					onClick={() => this.setPage(Pages.KITTENS)}>
					Kittens
				</a>

				<a
					className="navbar-brand"
					href="#score"
					onClick={() => this.setPage(Pages.SCORE)}>
					Score
				</a>

				<a
					className="navbar-brand"
					href="#user"
					onClick={() => this.setPage(Pages.USER)}>
					User
				</a>
			</nav>
		);
	}
}
