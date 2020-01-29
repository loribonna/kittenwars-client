import * as React from 'react';
import './score.scss';
import { get } from '../../helpers/crud';
import { getJWTToken } from '../../helpers/helpers';
import { IKitten } from '../../helpers/interfaces';
import { ImageDisplay } from '../../components/image/image';

interface ScoreProps {
    
}

interface ScoreState {
    userScore: Number;
    kittens: IKitten[];
}

export class Score extends React.Component<ScoreProps, ScoreState> {
	constructor(props) {
		super(props);
		this.state = {userScore: 0, kittens:[]};
    }

    async componentDidMount() {
        await this.loadUserScore();
        await this.loadMostLikedKitten();
    }

    async loadUserScore() {
        try{
            const token = getJWTToken();

            const score = await get('/score/user', token);
            this.setState({...this.state, userScore: score});
        }catch(e){
            console.log(e);
        }
    }

    async loadMostLikedKitten() {
        try{
            const token = getJWTToken();

            const kittens = await get('/score/kitten', token);
            this.setState({...this.state, kittens: kittens});
        }catch(e){
            console.log(e);
        }
    }

	render() {
		return (
			<div>
                USER SCORE {this.state.userScore} <br/>
                {this.state.kittens && this.state.kittens.length > 0 && (
                    <div>
                         KITTEN WITH {this.state.kittens[0].votes} VOTES<br/>
                        <ImageDisplay imageID={this.state.kittens[0].savedName}></ImageDisplay>
                    </div>
                   
                )}
			</div>
		);
	}
}

