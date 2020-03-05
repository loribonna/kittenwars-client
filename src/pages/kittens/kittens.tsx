import * as React from 'react';
import ReactDOM from 'react-dom';
import './kittens.scss';
import { ImageDisplay } from '../../components/image/image';
import { get, put } from '../../helpers/crud';
import { VOTE_URI } from '../../helpers/statics';
import { IKitten } from '../../helpers/interfaces';
import {
	getJWTToken,
	redirectToLogin,
	redirectToDefault
} from '../../helpers/helpers';
import { KittenVoteDto } from '../../helpers/dto/kitten-vote.dto';

interface KittensProps {}

interface KittensState {
	leftKitten?: IKitten;
	rightKitten?: IKitten;
	win?: boolean;
	loading: boolean;
}

export class Kittens extends React.Component<KittensProps, KittensState> {
	_mounted = false;
	_disableClick = false;
	constructor(props) {
		super(props);
		this.state = { loading: true };
	}

	async componentDidMount() {
		this._mounted = true;
		await this.loadRandomKittens();
	}

	componentWillUnmount() {
		this._mounted = false;
	}

	async loadRandomKittens() {
		try {
			this.setState({ ...this.state, loading: true });
			const token = getJWTToken();

			const kittens: IKitten[] = await get(VOTE_URI, token);
			if (Array.isArray(kittens) && kittens.length == 2) {
				if (this._mounted) {
					this.setState({
						...this.state,
						leftKitten: kittens[0],
						rightKitten: kittens[1],
						loading: false
					});
				}
			}
		} catch (e) {
			if (e.status === 401) {
				redirectToDefault();
			}
		}
	}

	async voteKitten(kittenSavedName: String) {
		this._disableClick = true;
		if (!this.state.leftKitten || !this.state.rightKitten) {
			console.error(
				'Kitten vote error: kitten ' +
					kittenSavedName +
					' does not exist'
			);
			return;
		}
		const votedKitten =
			this.state.leftKitten?.savedName === kittenSavedName
				? this.state.leftKitten
				: this.state.rightKitten;

		const vote = {
			kittenVoted: votedKitten._id,
			kittenA: this.state.leftKitten._id,
			kittenB: this.state.rightKitten._id
		};

		const dto = new KittenVoteDto(vote);
		await dto.validateOrReject();

		try {
			const token = getJWTToken();

			const win: boolean = await put(VOTE_URI, vote, token);
			await this.loadRandomKittens();
			this._disableClick = false;

			this.setState({ ...this.state, win: win });
		} catch (e) {
			if (e.status === 401) {
				redirectToLogin();
			}
		}
	}

	render() {
		if (this.state.loading) {
			return <div>Loading Kittens...</div>;
		}else if(!this.state.leftKitten ||!this.state.rightKitten){
			return <div>Not enough Kittens to War!. INSERT A KITTEN</div>
		}
		
		return (
			<div>
				<div className="kittens-container">
					<div className="kittens-left">
						{this.state.leftKitten && (
							<ImageDisplay
								key={this.state.leftKitten.savedName as string}
								imageID={this.state.leftKitten.savedName}
								onClick={this.voteKitten.bind(
									this
								)}></ImageDisplay>
						)}
					</div>
					<div className="kittens-right">
						{this.state.rightKitten && (
							<ImageDisplay
								key={this.state.rightKitten.savedName as string}
								imageID={this.state.rightKitten.savedName}
								onClick={this.voteKitten.bind(
									this
								)}></ImageDisplay>
						)}
					</div>
				</div>

				{this.state.win != null && this.state.win && 'WIN'}
				{this.state.win != null && !this.state.win && 'LOSE'}
			</div>
		);
	}
}
