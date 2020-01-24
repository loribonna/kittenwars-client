import * as React from 'react';

export interface SubjectData {
    value: string;
    name: string;
}

interface TextInputProps {
    label?: string;
    value?: string;
    name: string;
    onChange: Function;
}

interface TextInputState {
	value: string;
}

export class Input extends React.Component<TextInputProps, TextInputState> {
    _nodeid;
    _isMounted = false;

	constructor(props) {
		super(props);
		this.state = {
			value: props.value || ''
		};
    }
    
    componentDidMount(){
        this._isMounted=true;
    }

    componentWillUnmount(){
        this._isMounted=false;
    }

    handleChange(event: any) {
        const value = event.target.value;
        if(this._isMounted){
            this.setState({...this.state, value: value});
        }
        this.props.onChange({name: this.props.name, value: value});
    }
    
	render() {
		return (
            <div>
                {this.props.label && (
                    <label>{this.props.label}</label>
                )}
			    <input type="text" value={this.state.value} onChange={this.handleChange.bind(this)}/>
            </div>
		);
	}
}
