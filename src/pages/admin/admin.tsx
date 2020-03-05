import * as React from 'react';
import './admin.scss';
import { get, put, del } from '../../helpers/crud';
import { getJWTToken } from '../../helpers/helpers';
import { IKitten } from '../../helpers/interfaces';
import { ImageDisplay } from '../../components/image/image';
import { KittenEvaluateDto } from '../../helpers/dto/kitten-evaluate.dto';
import { ADMIN_URI } from '../../helpers/statics';

interface AdminProps {}

interface AdminState {
	pendingKittens: IKitten[];
	approvedKittens: IKitten[];
	loading: boolean;
	pendingPage: boolean;
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
		this.state = {
			pendingKittens: [],
			loading: true,
			pendingPage: true,
			approvedKittens: []
		};
	}

	async componentDidMount() {
		await this.getPendingImages();
	}

	async getPendingImages() {
		this.setState({ ...this.state, loading: true });
		try {
			const token = getJWTToken();
			const kittens = await get('/admin/unapproved', token);

			this.setState({ ...this.state, pendingKittens: kittens });
		} catch (e) {
			console.error(e);
		}
		this.setState({ ...this.state, loading: false });
	}

	async getApprovedKittens() {
		this.setState({ ...this.state, loading: true });
		try {
			const token = getJWTToken();
			const kittens = await get('/admin/approved', token);

			this.setState({ ...this.state, approvedKittens: kittens });
		} catch (e) {
			console.error(e);
		}
		this.setState({ ...this.state, loading: false });
	}

	removePendingKitten(kitten: IKitten) {
		const kittens = [...this.state.pendingKittens];
		const kittenIndex = kittens.findIndex(k => k._id === kitten._id);

		if (kittenIndex > -1) {
			kittens.splice(kittenIndex, 1);
			this.setState({ ...this.state, pendingKittens: kittens });
		}
	}

	deleteKittenList(kitten: IKitten) {
		const kittens = [...this.state.approvedKittens];
		const kittenIndex = kittens.findIndex(k => k._id === kitten._id);

		if (kittenIndex > -1) {
			kittens.splice(kittenIndex, 1);
			this.setState({ ...this.state, approvedKittens: kittens });
		}
	}

	async deleteKitten(kitten: IKitten) {
		try {
			const token = getJWTToken();
			await del(ADMIN_URI + 'kitten', { id: kitten._id }, token);

			this.deleteKittenList(kitten);
		} catch (e) {
			console.error(e);
		}
	}

	evaluateKitten(kitten: IKitten) {
		return async (accepted: boolean) => {
			const dto = new KittenEvaluateDto({
				kittenId: kitten._id,
				accepted: accepted
			});

			try {
				await dto.validateOrReject();

				const token = getJWTToken();
				await put(ADMIN_URI + 'evaluate', dto, token);

				this.removePendingKitten(kitten);
			} catch (e) {
				console.error(e);
			}
		};
	}

	async onPendingFocus() {
		if (
			!this.state.pendingKittens ||
			this.state.pendingKittens.length == 0
		) {
			await this.getPendingImages();
		}
		this.setState({ ...this.state, pendingPage: true });
	}

	async onTotalFocus() {
		if (
			!this.state.approvedKittens ||
			this.state.approvedKittens.length == 0
		) {
			await this.getApprovedKittens();
		}
		this.setState({ ...this.state, pendingPage: false });
	}

	render() {
		let RenderComponent: JSX.Element = <div></div>;

		if (this.state.loading) {
			return <div>Loading data...</div>;
		}

		const getKittenRender = (kitten: IKitten) => (
			<div
				style={{
					overflow: 'hidden',
					objectFit: 'scale-down',
					width: '50%'
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
		);

		if (this.state.pendingPage) {
			if (
				!this.state.pendingKittens ||
				this.state.pendingKittens.length == 0
			) {
				RenderComponent = <div>Nothing to do here!</div>;
			} else {
				if (
					!this.state.pendingKittens ||
					this.state.pendingKittens.length == 0
				) {
					RenderComponent = <div>Nothing to do here!</div>;
				} else {
					RenderComponent = (
						<div>
							<ul className="admin-kittens-container">
								{this.state.pendingKittens.map(
									(kitten, index) => {
										return (
											<li key={index}>
												{getKittenRender(kitten)}
												<button
													onClick={async () =>
														await this.evaluateKitten(
															kitten
														)(true)
													}>
													ACCEPT
												</button>{' '}
												<button
													onClick={async () =>
														await this.evaluateKitten(
															kitten
														)(false)
													}>
													DELETE
												</button>
											</li>
										);
									}
								)}
							</ul>
						</div>
					);
				}
			}
		} else {
			if (
				!this.state.approvedKittens ||
				this.state.approvedKittens.length == 0
			) {
				RenderComponent = <div>Nothing to do here!</div>;
			} else {
				RenderComponent = (
					<div>
						<ul>
							{this.state.approvedKittens.map((kitten, index) => (
								<li key={index}>
									{getKittenRender(kitten)}
									<button
										onClick={async () =>
											await this.deleteKitten(kitten)
										}>
										DELETE
									</button>{' '}
								</li>
							))}
						</ul>
					</div>
				);
			}
		}

		return (
			<div>
				<button
					disabled={this.state.pendingPage}
					onClick={this.onPendingFocus.bind(this)}>
					Show Pending Kittens
				</button>
				<button
					disabled={!this.state.pendingPage}
					onClick={this.onTotalFocus.bind(this)}>
					Show Total Kittens
				</button>
				<div>{RenderComponent}</div>
			</div>
		);
	}
}
