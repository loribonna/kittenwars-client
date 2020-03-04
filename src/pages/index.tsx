import * as React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Kittens } from './kittens/kittens';
import Header from '../components/header/header';
import { IUser, Pages } from '../helpers/interfaces';
import { Login } from './login/login';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom';
import { Score } from './score/score';
import { User } from './user/user';
import { get } from '../helpers/crud';
import { getJWTToken, checkAllowedRoute, redirectToDefault } from '../helpers/helpers';
import { Logout } from '../components/logout/logout';
import { JWTController } from '../components/jwt/jwt.token';
import { Admin } from './admin/admin';
import { Location } from 'history';

interface AppProps {}

interface AppState {
	logged: Boolean;
	isAdmin: Boolean;
	location?: Location;
}

class App extends React.Component<AppProps, AppState> {
	constructor(props) {
		super(props);
		this.state = { logged: false, isAdmin: false };
	}

	async componentDidMount() {
		const hasSession = await this.checkSession();
		this.setState({ ...this.state, logged: hasSession });
	}

	getRouteHash() {
		return window.location.hash.substring(1);
	}

	async checkAuth(valid) {
		this.setState({ ...this.state, logged: valid });
		await this.checkAdmin();
	}

	async checkAdmin(token?: string): Promise<void> {
		const t = token ? token : getJWTToken();

		const userInfo: IUser = await get('/users', t);
		if (userInfo.isAdmin) {
			this.setState({ ...this.state, isAdmin: true });
		}
	}

	async checkSession(): Promise<boolean> {
		let ret = false;
		try {
			const token = getJWTToken();

			if (token) {
				await get('/auth/jwt_check', token);
				ret = true;
				await this.checkAdmin(token);
			}
		} catch (e) {
			console.log(e);
		}

		return ret;
	}

	onPageChange(location: Location) {
		this.setState({ ...this.state, location: location });
		if(!checkAllowedRoute(location, this.state.logged)){
			redirectToDefault();
		}
	}

	render() {
		return (
			<div>
				<Router>
					<Header
						logged={this.state.logged}
						isAdmin={this.state.isAdmin}
						onPageChange={this.onPageChange.bind(this)}></Header>

					<Switch>
						<Route path={Pages.jwt + '/:token'}>
							<JWTController
								checkAuth={this.checkAuth.bind(
									this
								)}></JWTController>
						</Route>
						<Route path={Pages.kittens}>
							<Kittens></Kittens>
						</Route>
						<Route path={Pages.login}>
							<Login></Login>
						</Route>
						<Route path={Pages.logout}>
							<Logout></Logout>
						</Route>
						<Route path={Pages.score}>
							<Score></Score>
						</Route>
						<Route path={Pages.user}>
							<User></User>
						</Route>
						<Route path={Pages.admin}>
							<Admin></Admin>
						</Route>
					</Switch>
				</Router>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
