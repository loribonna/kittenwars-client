import * as React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Kittens } from './kittens/kittens';
import Header from '../components/header/header';
import { Pages } from '../helpers/interfaces';
import { Login } from './login/login';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom';
import { Score } from './score/score';
import { User } from './user/user';
import { get } from '../helpers/crud';
import { redirectToLogin, getJWTToken } from '../helpers/helpers';
import { Logout } from '../components/logout/logout';
import { JWTController } from '../components/jwt/jwt.token';

interface AppProps {}

interface AppState {
	logged: Boolean;
}

class App extends React.Component<AppProps, AppState> {
	constructor(props) {
		super(props);
		this.state = { logged: false };
	}

	async componentDidMount() {
		const hasSession = await this.checkSession();
		this.setState({...this.state, logged: hasSession})
	}

	getRouteHash() {
		return window.location.hash.substring(1);
	}

	checkAuth(valid) {
		this.setState({ ...this.state, logged: valid });
	}

	async checkSession(): Promise<boolean> {
		try {
			const token = getJWTToken();

			if (token) {
				await get('/auth/jwt_check', token);
				return true;
			}
		} catch (e) {
			console.log(e);
		}
		return false;
	}

	render() {
		return (
			<div>
				<Router>
					<Header logged={this.state.logged}></Header>

					<Switch>
						<Route path="/app/jwt/:token">
							<JWTController
								checkAuth={this.checkAuth.bind(
									this
								)}></JWTController>
						</Route>
						<Route path="/app/kittens">
							<Kittens></Kittens>
						</Route>
						<Route path="/app/login">
							<Login></Login>
						</Route>
						<Route path="/app/logout">
							<Logout></Logout>
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

ReactDOM.render(<App />, document.getElementById('root'));
