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
} from 'react-router-dom';
import { Score } from './score/score';
import { User } from './user/user';
import { get } from '../helpers/crud';
import { redirectToLogin } from '../helpers/helpers';
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

	getRouteHash() {
		return window.location.hash.substring(1);
	}

	checkAuth(valid) {
		this.setState({ ...this.state, logged: valid });
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
