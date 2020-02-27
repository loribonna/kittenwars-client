import * as React from 'react';
import './user.scss';
import { getJWTToken, redirectToLogin } from '../../helpers/helpers';
import { get, post } from '../../helpers/crud';
import { IUser, IKitten } from '../../helpers/interfaces';
import { validate } from 'class-validator';
import { CreateImageDto } from '../../helpers/dto/create-image.dto';
import { Input } from '../../components/input/input';
import { SubjectData } from '../../helpers/types';
import { CreateKittenDto } from '../../helpers/dto/create-kitten.dto';

interface UserProps {}

interface UserState {
	userScore: Number;
	scoreBoard: IUser[];
	userPosition: Number;
	fileUpl?: File;
	fileOk?: boolean;
	kitten: Partial<IKitten>;
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
		this.state = {
			fileUpl: undefined,
			userScore: 0,
			scoreBoard: [],
			userPosition: -1,
			kitten: {}
		};
	}

	async componentDidMount() {
		await Promise.all([
			this.loadUserScore(),
			this.loadScoreBoard(),
			this.getUserBoaardPosition()
		]);
	}

	async loadUserScore() {
		try {
			const token = getJWTToken();

			const score = await get('/users/score', token);
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

			const board = await get('/users/board', token);
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

			const position = await get('/users/position', token);
			this.setState({ ...this.state, userPosition: position });
		} catch (e) {
			if (e.status === 401) {
				redirectToLogin();
			}
		}
	}

	async insertNewKitten(event) {
		event.preventDefault();

		if (!this.state.fileUpl) {
			return;
		}
		try {
			const imageDto = new CreateImageDto(this.state.fileUpl);
			const kittenDto = new CreateKittenDto(this.state.kitten);

			await Promise.all([
				imageDto.validateOrReject(),
				kittenDto.validateOrReject()
			]);

			const token = getJWTToken();

			const formData = new FormData();
			formData.append('image', this.state.fileUpl);
			formData.append('kitten', JSON.stringify(this.state.kitten));

			const insertedKitten: IKitten = await post(
				'/kittens',
				formData,
				token
			);
			this.setState({ ...this.state, fileUpl: undefined, fileOk: true });
		} catch (e) {
			this.setState({ ...this.state, fileOk: false });

			if (e.status === 401) {
				redirectToLogin();
			}
		}
	}

	onFileChange(event) {
		if (
			!event.target ||
			!event.target.files ||
			event.target.files.length < 0 ||
			!event.target.files[0]
		) {
			this.setState({ ...this.state, fileUpl: undefined });
		} else {
			this.setState({ ...this.state, fileUpl: event.target.files[0] });
		}
	}

	updateData(data: SubjectData) {
		this.setState({
			kitten: { ...this.state.kitten, [data.name]: data.value }
		});
	}

	render() {
		return (
			<div>
				<form
					encType="multipart/form-data"
					onSubmit={this.insertNewKitten.bind(this)}>
					file input:{' '}
					<input
						type="file"
						name="image"
						onChange={this.onFileChange.bind(this)}
					/>
					<br />
					<Input
						label="Kitten name"
						name="name"
						value={this.state.kitten.name?.toString()}
						onChange={data => this.updateData(data)}
					/>
					<input type="submit" value="INSERT KITTEN" />
					<br />
					{this.state.fileOk != null &&
						this.state.fileOk &&
						'UPLOAD OK'}
					{this.state.fileOk != null &&
						!this.state.fileOk &&
						'UPLOAD ERROR'}
				</form>
				<br />
				<br />
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
