import * as React from 'react';
import ReactDOM from 'react-dom';
import './index.scss'
import { ImageDisplay } from '../components/image/image';

interface AppProps {}

interface AppState {}

class App extends React.Component<AppProps, AppState> {

	constructor(props) {
		super(props);
		this.state = { nodes: [] };
	}

	render() {
		return (
			<div>
				<ImageDisplay imageID="image_1579717887838_20160912_232904.jpg"></ImageDisplay>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
