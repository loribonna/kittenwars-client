import * as React from 'react';
import './score.scss';
import { get } from '../../helpers/crud';
import { getJWTToken, redirectToLogin } from '../../helpers/helpers';
import { IKitten } from '../../helpers/interfaces';
import { ImageDisplay } from '../../components/image/image';

interface ScoreProps {}

interface ScoreState {
	kittens: IKitten[];
}

export class Score extends React.Component<ScoreProps, ScoreState> {
	constructor(props) {
		super(props);
		this.state = { kittens: [] };
	}

	async componentDidMount() {
		await this.loadMostLikedKitten();
	}

	async loadMostLikedKitten() {
		try {
			const token = getJWTToken();

			const kittens = await get('/score/kitten', token);
			this.setState({ ...this.state, kittens: kittens });
		} catch (e) {
			if (e.status === 401) {
				redirectToLogin();
			}
		}
	}

	render() {
		return (
			<div>
				{this.state.kittens && this.state.kittens.length > 0 && (
					<div>
						KITTEN WITH {this.state.kittens[0].votes} VOTES
						<br />
						<ImageDisplay
							imageID={
								this.state.kittens[0].savedName
							}></ImageDisplay>
					</div>
				)}
			</div>
		);
	}
}
