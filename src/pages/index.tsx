import * as React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Kittens } from './kittens/kittens';
import { Header } from '../components/header/header';
import { Pages } from '../helpers/interfaces';
import { Login } from './login/login';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useHistory,
	useParams
  } from "react-router-dom";
import { Score } from './score/score';
import { User } from './user/user';

interface AppProps {}

interface AppState {
	currentPage: Pages;
	logged: Boolean;
}

class App extends React.Component<AppProps, AppState> {
	constructor(props) {
		super(props);
		this.state = { currentPage: Pages.kittens, logged: false };
	}

	componentDidMount() {
		const hash = this.getRouteHash();
		if (!hash) {
			return;
		}
		const page: any = Pages[hash];
		this.setState({ ...this.state, currentPage: page });
	}

	setPage(page: Pages) {
		this.setState({ ...this.state, currentPage: page });
	}

	getRouteHash() {
		return window.location.hash.substring(1);
	}

	render() {
		return (
			<div>
				<Router>
					<Header
						currentPage={this.state.currentPage}
						setPage={this.setPage.bind(this)}></Header>

					<Switch>
						<Route path="/app/jwt/:token">
							<JWTController></JWTController>
						</Route>
						<Route path="/app/kittens">
							<Kittens></Kittens>
						</Route>
						<Route path="/app/login">
							<Login></Login>
						</Route>
						<Route path="/app/score">
							<Score></Score>
						</Route>
						<Route path="/app/user">
							<User></User>
						</Route>

					</Switch>
				</Router>
			</div>
		);
	}
}

const JWTController: any = () => {
	const history = useHistory();
	const params = useParams();
	localStorage.setItem('token', (params as any).token);
	history.push('/app/kittens');
	return "";
}

ReactDOM.render(<App />, document.getElementById('root'));
