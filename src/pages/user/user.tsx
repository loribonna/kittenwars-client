import * as React from 'react';
import './user.scss';
import { getJWTToken, redirectToLogin } from '../../helpers/helpers';
import { get } from '../../helpers/crud';
import { IUser } from '../../helpers/interfaces';

interface UserProps {}

interface UserState {
	userScore: Number;
	scoreBoard: IUser[];
	userPosition: Number;
}

function UserElement(user: IUser) {
	return (
		<ul className="user-element">
			<li>{user.username}</li>
			<li>{user.score}</li>
		</ul>
	);
}

export class User extends React.Component<UserProps, UserState> {
	constructor(props) {
		super(props);
		this.state = { userScore: 0, scoreBoard: [], userPosition: -1 };
	}

	async componentDidMount() {
		await this.loadUserScore();
	}

	async loadUserScore() {
		try {
			const token = getJWTToken();

			const score = await get('/score/user', token);
			this.setState({ ...this.state, userScore: score });
		} catch (e) {
			if (e.status === 401) {
				redirectToLogin();
			}
		}
	}

	async loadScoreBoard() {
		try {
			const token = getJWTToken();

			const board = await get('/score/board', token);
			this.setState({ ...this.state, scoreBoard: board });
		} catch (e) {
			if (e.status === 401) {
				redirectToLogin();
			}
		}
	}

	async getUserBoaardPosition() {
		try {
			const token = getJWTToken();

			const position = await get('/score/position', token);
			this.setState({ ...this.state, userPosition: position });
		} catch (e) {
			if (e.status === 401) {
				redirectToLogin();
			}
		}
	}

	render() {
		return (
			<div>
				USER SCORE {this.state.userScore} <br />
				USER POSITION {this.state.userPosition} <br />
				SCORE BOARD:
				<ul className="score-board-container">
					{this.state.scoreBoard.map((user, index) => {
						return <li key={index}>{UserElement(user)}</li>;
					})}
				</ul>
			</div>
		);
	}
}
