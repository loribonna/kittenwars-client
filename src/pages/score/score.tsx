import * as React from 'react';
import './score.scss';
import { get } from '../../helpers/crud';
import { IKitten } from '../../helpers/interfaces';
import { ImageDisplay } from '../../components/image/image';

interface ScoreProps {}

interface ScoreState {
	bestKittens: IKitten[];
	worstKittens: IKitten[];
}

export class Score extends React.Component<ScoreProps, ScoreState> {
	constructor(props) {
		super(props);
		this.state = { bestKittens: [], worstKittens: [] };
	}

	async componentDidMount() {
		await this.loadMostLikedKitten();
		await this.loadLeastLikedKitten();
	}

	async loadMostLikedKitten() {
		try {
			const kittens = await get('/score/best');
			this.setState({ ...this.state, bestKittens: kittens });
		} catch (e) {
			console.log(e);
		}
	}

	async loadLeastLikedKitten() {
		try {
			const kittens = await get('/score/worst');
			this.setState({ ...this.state, worstKittens: kittens });
		} catch (e) {
			console.log(e);
		}
	}

	render() {
		return (
			<div>
				{this.state.bestKittens && this.state.bestKittens.length > 0 && (
					<div>
						BEST KITTEN WITH {this.state.bestKittens[0].votes} VOTES
						<br />
						<div className="score-image-container">
							<ImageDisplay
								fullUri={`/score/best/${this.state.bestKittens[0].savedName}`}></ImageDisplay>
						</div>
					</div>
				)}
				{this.state.worstKittens && this.state.worstKittens.length > 0 && (
					<div>
						WORST KITTEN WITH {this.state.worstKittens[0].votes}{' '}
						VOTES
						<br />
						<div className="score-image-container">
							<ImageDisplay
								fullUri={`/score/worst/${this.state.worstKittens[0].savedName}`}></ImageDisplay>
						</div>
					</div>
				)}
			</div>
		);
	}
}
