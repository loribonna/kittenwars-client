import * as React from 'react';
import { KITTENS_URI } from '../../helpers/statics';
import { getFile } from '../../helpers/crud';
import './image.scss';
import { getJWTToken } from '../../helpers/helpers';

interface ImageDisplayProps {
	imageID?: string;
	onClick?: Function;
	fullUri?: string;
}

interface ImageDisplayState {
	imageID?: string;
	img?: string;
	fullUri?: string;
	imgClass: string;
}

export class ImageDisplay extends React.Component<
	ImageDisplayProps,
	ImageDisplayState
> {
	_imageData = '';
	_mounted = false;
	constructor(props) {
		super(props);
		if (!this.props.imageID && !this.props.fullUri) {
			console.error('Loading component error: imageID or fullUri needed');
			throw new Error(
				'Loading component error: imageID or fullUri needed'
			);
		}
		const tmpState: ImageDisplayState = this.props.onClick
			? { imgClass: 'image-img image-img-hover' }
			: { imgClass: 'image-img' };
		if (this.props.fullUri) {
			this.state = { ...tmpState, fullUri: this.props.fullUri };
		} else if (this.props.imageID) {
			this.state = { ...tmpState, imageID: this.props.imageID };
		}
	}

	composeUri(imageID): string {
		return KITTENS_URI + imageID + '/data';
	}

	getUri(): string {
		return this.state.fullUri
			? this.state.fullUri
			: this.composeUri(this.state.imageID);
	}

	imageClick(event) {
		if (this.props.onClick) {
			this.props.onClick(this.props.imageID);
		}
	}

	async componentDidMount() {
		this._mounted = true;
		if (this.state.imageID || this.state.fullUri) {
			await this.loadImage();
		}
	}

	componentWillUnmount() {
		this._mounted = false;
	}

	async componentDidUpdate() {
		if (
			this.state.imageID != this.props.imageID ||
			this.state.fullUri != this.props.fullUri
		) {
			if (this._mounted) {
				this.setState({
					...this.state,
					imageID: this.props.imageID,
					fullUri: this.props.fullUri
				});
			}
			await this.loadImage();
		}
	}

	async loadImage() {
		const token = getJWTToken();

		try {
			const img = await getFile(this.getUri(), token);

			if (this._mounted) {
				this.setState({ ...this.state, img: img });
			}
		} catch (e) {
			console.log(e);
		}
	}

	getImg() {
		if (this.state.img) {
			return 'data:image/png;base64,' + this.state.img;
		}
	}

	render() {
		return (
			<div className="image-container">
				{
					<img
						key={this.state.imageID as string}
						className={this.state.imgClass}
						src={this.getImg()}
						onClick={this.imageClick.bind(this)}
					/>
				}
			</div>
		);
	}
}
