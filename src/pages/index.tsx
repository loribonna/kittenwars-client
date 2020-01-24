import * as React from 'react';
import ReactDOM from 'react-dom';
import './index.scss'

interface AppProps {}

interface AppState {}

class App extends React.Component<AppProps, AppState> {
	constructor(props) {
		super(props);
		this.state = { nodes: [] };
	}

	render() {
		return (
			<div></div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
