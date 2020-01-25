import * as React from 'react';
import ReactDOM from 'react-dom';
import './kittens.scss';
import { ImageDisplay } from '../../components/image/image';
import { get } from '../../helpers/crud';
import { BASE_URI } from '../../helpers/statics';
import { IKitten } from '../../helpers/interfaces';

interface KittensProps {}

interface KittensState {
	leftKitten?: IKitten;
	rightKitten?: IKitten;
}

export class Kittens extends React.Component<KittensProps, KittensState> {
    _mounted=false;
	constructor(props) {
		super(props);
		this.state = {};
	}

	async componentDidMount() {
        this._mounted=true;
        await this.loadRandomKittens();
    }

    componentWillUnmount(){
        this._mounted=false;
    }

	async loadRandomKittens() {
		try {
			const kittens: IKitten[] = await get(BASE_URI + '/vote');
			if (Array.isArray(kittens) && kittens.length == 2) {
                if(this._mounted){
                    this.setState({
                        leftKitten: kittens[0],
                        rightKitten: kittens[1]
                    });
                }
            }

		} catch (e) {
			console.log(e);
		}
	}

	render() {
		return (
			<div className="row flex-column-reverse flex-md-row kittens-container">
				<div className="kittens-left">
					{this.state.leftKitten && (
						<ImageDisplay
							imageID={
								this.state.leftKitten.savedName
							}></ImageDisplay>
					)}
				</div>
				<div className="kittens-right">
					{this.state.rightKitten && (
						<ImageDisplay
							imageID={
								this.state.rightKitten.savedName
							}></ImageDisplay>
					)}
				</div>
			</div>
		);
	}
}
