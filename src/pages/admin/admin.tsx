import * as React from 'react';
import './admin.scss';
import { get, put } from '../../helpers/crud';
import { getJWTToken } from '../../helpers/helpers';
import { IKitten } from '../../helpers/interfaces';
import { ImageDisplay } from '../../components/image/image';
import { KittenEvaluateDto } from '../../helpers/dto/kitten-evaluate.dto';
import { ADMIN_URI } from '../../helpers/statics';

interface AdminProps {}

interface AdminState {
	kittens: IKitten[];
	loading: boolean;
}

function KittenElement(kitten: IKitten) {
	return (
		<ul className="admin-kitten-element">
			<li>Kitten name: {kitten.name}</li>
			<li>Original Name: {kitten.originalName}</li>
			<li>Saved Name: {kitten.savedName}</li>
			<li>
				Insert Date:{' '}
				{new Date(kitten.insertDate as Date).toLocaleDateString()}
			</li>
			<li>Size: {kitten.size}</li>
			<br />
		</ul>
	);
}

export class Admin extends React.Component<AdminProps, AdminState> {
	constructor(props) {
		super(props);
		this.state = { kittens: [], loading: true };
	}

	async componentDidMount() {
		await this.getPendingImages();
		this.setState({ ...this.state, loading: false });
	}

	async getPendingImages() {
		try {
			const token = getJWTToken();
			const kittens = await get('/admin/unapproved', token);

			this.setState({ ...this.state, kittens: kittens });
		} catch (e) {
			console.log(e);
		}
	}

	removeKitten(kitten: IKitten) {
		const kittens = [...this.state.kittens];
		const kittenIndex = kittens.findIndex(k => k._id === kitten._id);

		if (kittenIndex > -1) {
			kittens.splice(kittenIndex, 1);
			this.setState({ ...this.state, kittens: kittens });
		}
	}

	evaluateKitten(kitten: IKitten, index?: number) {
		return async (accepted: boolean) => {
			const dto = new KittenEvaluateDto({
				kittenId: kitten._id,
				accepted: accepted
			});

			try {
				await dto.validateOrReject();

				const token = getJWTToken();
				await put(ADMIN_URI + 'evaluate', dto, token);

				this.removeKitten(kitten);
			} catch (e) {
				console.log(e);
			}
		};
	}

	render() {
		if (this.state.loading) {
			return <div>Loading data...</div>;
		}

		if (!this.state.kittens || this.state.kittens.length == 0) {
			return <div>Nothing to do here!</div>;
		}

		return (
			<div>
				<ul className="admin-kittens-container">
					{this.state.kittens.map((kitten, index) => {
						return (
							<li key={index}>
								<div
									style={{
										overflow: 'hidden',
										objectFit: 'scale-down',
										height: '50%'
									}}>
									{KittenElement(kitten)}
									<ImageDisplay
										style={{
											maxWidth: '100%',
											height: 'auto',
											objectFit: 'scale-down',
											imageOrientation: 'from-image'
										}}
										key={kitten.savedName}
										imageID={kitten.savedName}
									/>
								</div>
								<button
									onClick={async () =>
										await this.evaluateKitten(
											kitten,
											index
										)(true)
									}>
									ACCEPT
								</button>{' '}
								<button
									onClick={async () =>
										await this.evaluateKitten(
											kitten,
											index
										)(false)
									}>
									DELETE
								</button>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}
