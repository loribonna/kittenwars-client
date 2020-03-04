import * as React from 'react';

interface TextInputProps {
	label?: string;
	value?: string;
	name: string;
	onChange: Function;
	disabled?: boolean;
	error?: boolean;
}

interface TextInputState {
	value: string;
}

export class TextInput extends React.Component<TextInputProps, TextInputState> {
	_nodeid;
	_isMounted = false;

	constructor(props) {
		super(props);
		this.state = {
			value: props.value || ''
		};
	}

	componentDidMount() {
		this._isMounted = true;
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	handleChange(event: any) {
		const value = event.target.value;
		if (this._isMounted) {
			this.setState({ ...this.state, value: value });
		}
		this.props.onChange({ name: this.props.name, value: value });
	}

	render() {
		return (
			<div>
				{this.props.label && (
					<label style={{ paddingRight: 2 }}>
						{this.props.label}{' '}
					</label>
				)}
				<input
					disabled={this.props.disabled}
					type="text"
					value={this.state.value}
					onChange={this.handleChange.bind(this)}
				/>
				{this.props.error && <div style={{color:"red"}}>INPUT ERROR</div>}
			</div>
		);
	}
}
