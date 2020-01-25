import * as React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Kittens } from './kittens/kittens';
import { Header } from '../components/header/header';
import { Pages } from '../helpers/interfaces';

interface AppProps {}

interface AppState {
	currentPage: Pages;
}

class App extends React.Component<AppProps, AppState> {
	constructor(props) {
		super(props);
		this.state = { currentPage: Pages.KITTENS };
	}

	setPage(page: Pages) {
		this.setState({ ...this.state, currentPage: page });
	}

	render() {
		return (
			<div>
				<Header
					currentPage={this.state.currentPage}
					setPage={this.setPage.bind(this)}></Header>
				<Kittens></Kittens>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
