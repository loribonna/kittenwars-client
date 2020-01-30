import * as React from 'react';
import ReactDOM from 'react-dom';
import './kittens.scss';
import { ImageDisplay } from '../../components/image/image';
import { get, put } from '../../helpers/crud';
import { VOTE_URI } from '../../helpers/statics';
import { IKitten } from '../../helpers/interfaces';
import { getJWTToken, redirectToLogin } from '../../helpers/helpers';

interface KittensProps {}

interface KittensState {
	leftKitten?: IKitten;
	rightKitten?: IKitten;
}

export class Kittens extends React.Component<KittensProps, KittensState> {
	_mounted = false;
	_disableClick = false;
	constructor(props) {
		super(props);
		this.state = {};
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
			const token = getJWTToken();

			const kittens: IKitten[] = await get(VOTE_URI, token);
			if (Array.isArray(kittens) && kittens.length == 2) {
				if (this._mounted) {
					this.setState({
						leftKitten: kittens[0],
						rightKitten: kittens[1]
					});
				}
			}
		} catch (e) {
			if(e.status===401){
				redirectToLogin();
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

		try {
			const token = localStorage.getItem('token');
			
			const res = await put(VOTE_URI, votedKitten, token as string);
			await this.loadRandomKittens();
			this._disableClick = false;
		} catch (e) {
			if(e.status===401){
				redirectToLogin();
			}
		}
	}

	render() {
		return (
			<div className="row flex-column-reverse flex-md-row kittens-container">
				<div className="kittens-left">
					{this.state.leftKitten && (
						<ImageDisplay
							imageID={this.state.leftKitten.savedName}
							onClick={this.voteKitten.bind(this)}></ImageDisplay>
					)}
				</div>
				<div className="kittens-right">
					{this.state.rightKitten && (
						<ImageDisplay
							imageID={this.state.rightKitten.savedName}
							onClick={this.voteKitten.bind(this)}></ImageDisplay>
					)}
				</div>
			</div>
		);
	}
}
