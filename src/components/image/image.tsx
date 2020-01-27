import * as React from 'react';
import { BASE_URI, KITTENS_URI } from '../../helpers/statics';
import { getFile } from '../../helpers/crud';
import './image.scss';

interface ImageDisplayProps {
	imageID: String;
	onClick: Function;
}

interface ImageDisplayState {
	imageID: String;
}

export class ImageDisplay extends React.Component<
	ImageDisplayProps,
	ImageDisplayState
> {
	_imageData = '';

	constructor(props) {
		super(props);
		this.state = { imageID: props.imageID };
	}

	composeUri(imageID) {
		return KITTENS_URI + imageID + '/data';
	}

	imageClick(event) {
		this.props.onClick(this.props.imageID);
	}

	componentDidUpdate() {
		if (this.state.imageID != this.props.imageID) {
			this.setState({ imageID: this.props.imageID });
		}
	}

	render() {
		return (
			<div className="image-container">
				{
					<img
						className="image-img"
						src={this.composeUri(this.state.imageID)}
						onClick={this.imageClick.bind(this)}
					/>
				}
			</div>
		);
	}
}
