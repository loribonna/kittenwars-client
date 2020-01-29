import * as React from 'react';
import { BASE_URI, KITTENS_URI } from '../../helpers/statics';
import { getFile } from '../../helpers/crud';
import './image.scss';
import { getJWTToken } from '../../helpers/helpers';

interface ImageDisplayProps {
	imageID: String;
	onClick?: Function;
}

interface ImageDisplayState {
	imageID: String;
	img?: string;
}

export class ImageDisplay extends React.Component<
	ImageDisplayProps,
	ImageDisplayState
> {
	_imageData = '';
	_mounted=false;
	constructor(props) {
		super(props);
		this.state = { imageID: props.imageID };
	}

	composeUri(imageID) {
		return KITTENS_URI + imageID + '/data';
	}

	imageClick(event) {
		if(this.props.onClick){
			this.props.onClick(this.props.imageID);
		}
	}

	async componentDidMount() {
		this._mounted=true;
		if(this.state.imageID) {
			await this.loadImage();
		}
	}

	componentWillUnmount(){
		this._mounted=false;
	}

	async componentDidUpdate() {
		if (this.state.imageID != this.props.imageID) {
			if(this._mounted){
				this.setState({ imageID: this.props.imageID });
			}
			await this.loadImage();
		}
	}

	async loadImage(){
		const token = getJWTToken();

		try{
			const img = await getFile(this.composeUri(this.state.imageID), token);

			if(this._mounted){
				this.setState({...this.state, img: img})
			}
		}catch(e){
			console.log(e);
		}

	}

	getImg() {
		if(this.state.img){
			return "data:image/png;base64,"+this.state.img;
		}
	}

	render() {
		return (
			<div className="image-container">
				{
					<img
						className="image-img"
						src={this.getImg()}
						onClick={this.imageClick.bind(this)}
					/>
				}
			</div>
		);
	}
}
