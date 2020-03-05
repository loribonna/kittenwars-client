import * as React from 'react';
import './score.scss';
import { get } from '../../helpers/crud';
import { IKitten } from '../../helpers/interfaces';
import { ImageDisplay } from '../../components/image/image';

interface ScoreProps {}

interface ScoreState {
	bestKittens: IKitten[];
	worstKittens: IKitten[];
	loading: boolean;
}

export class Score extends React.Component<ScoreProps, ScoreState> {
	constructor(props) {
		super(props);
		this.state = { bestKittens: [], worstKittens: [], loading: true };
	}

	async componentDidMount() {
		await this.loadMostLikedKitten();
		await this.loadLeastLikedKitten();
		this.setState({ ...this.state, loading: false });
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
		if (this.state.loading) {
			return <div>Loading...</div>;
		} else if (
			!this.state.bestKittens ||
			!this.state.worstKittens ||
			!this.state.bestKittens.length ||
			!this.state.worstKittens.length
		) {
			return <div>Not enough Kittens to War!. INSERT A KITTEN</div>;
		}

		const getKitten = (kittens: IKitten[], type: 'best' | 'worst') =>
			!this.state.loading && kittens && kittens.length > 0 ? (
				<div
					className="score-kitten-container"
					style={{
						alignItems: 'center',
						textTransform: 'uppercase'
					}}>
					{type} KITTEN WITH {kittens[0].votes} VOTES
					<br />
					<div className="score-image-container">
						<ImageDisplay
							fullUri={`/score/${type}/${kittens[0].savedName}`}></ImageDisplay>
					</div>
				</div>
			) : null;

		return (
			<div className="score-container">
				{!this.state.loading &&
					!this.state.bestKittens &&
					!this.state.worstKittens &&
					'NO KITTENS TO LOAD!'}
				{getKitten(this.state.bestKittens, 'best')}
				{getKitten(this.state.worstKittens, 'worst')}
			</div>
		);
	}
}
