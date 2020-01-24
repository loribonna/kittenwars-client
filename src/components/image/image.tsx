import * as React from 'react';
import { BASE_URI } from '../../helpers/statics';
import { getFile } from '../../helpers/crud';
import './image.scss';

interface ImageDisplayProps {
	imageID: String;
}

interface ImageDisplayState {}

const KITTENS_URI = BASE_URI + '/kittens/';

export class ImageDisplay extends React.Component<
	ImageDisplayProps,
	ImageDisplayState
> {
	_imageUri = KITTENS_URI;
	_imageData = '';

	constructor(props) {
		super(props);
		this._imageUri = KITTENS_URI + props.imageID + '/data';
	}

	render() {
		return (
			<div>
				{<img className="image-container" src={this._imageUri} />}
			</div>
		);
	}
}
