import React, { Component } from 'react'

import classBuilder from '../utils/classBuilder'
import testUrl from '../utils/testUrl'

export default class Index extends Component {
	state = {
		url: ''
	}

	updateInput({ target: { value: url } }) {
		this.setState({ url })

		clearInterval(this.interval)

		if (!testUrl(url)) {
			this.interval = setInterval(
				() => this.setState({ invalidMessage: true }),
				3000
			)
		} else {
			this.setState({ invalidMessage: false })
		}
	}

	render() {
		const { url, invalidMessage, loading } = this.state

		return (
			<div className="container">
				<div className="card">
					<h1 className="title">shrtn</h1>
					<form>
						<div className="input__container">
							<input
								disabled={loading}
								type="text"
								className={classBuilder('input', {
									'input--invalid': !testUrl(url) && url.length > 0,
									'input--disabled': loading
								})}
								placeholder="Url..."
								onChange={this.updateInput.bind(this)}
								value={url}
							/>
						</div>
						<input
							onClick={() => this.setState({ loading: true })}
							disabled={loading}
							type="submit"
							value={loading ? 'Loading...' : 'Shorten'}
							className={classBuilder('submit-button', {
								'submit-button--disabled': loading
							})}
						/>
					</form>
				</div>
				<style jsx>{`
					.container {
						display: flex;
						justify-content: center;
						align-items: center;
						height: 100vh;
					}

					.card {
						border: 1px #ddd solid;
						border-radius: 4px;
					}

					.title {
						font-weight: 500;
						border-bottom: 1px solid #ddd;
						padding: 32px;
						margin: 0;
						text-transform: uppercase;
					}

					.input {
						width: 300px;
						height: 18px;
						border: none;
						border-bottom: solid #ddd 1px;
						padding: 8px 0;
						outline: none;
						font-size: 16px;
						transition: 0.2s all;
					}

					.input:focus {
						border-color: #000;
					}
					.input--invalid {
						color: #ff001f;
					}

					.input--invalid:focus {
						border-color: #ff001f;
					}

					.input--disabled {
						color: #777;
						cursor: default;
					}

					.input__container {
						margin: 32px;
					}

					.input__invalid-message {
						color: #ff001f;
					}

					.submit-button {
						margin: 32px;
						border: none;
						outline: none;
						padding: 12px;
						background-color: #000;
						color: #fff;
						text-align: center;
						font-size: 12px;
						cursor: pointer;
						border-radius: 4px;
						float: right;
					}

					.submit-button--disabled {
						background: #777;
						cursor: default;
					}
				`}</style>
				<style jsx global>{`
					body {
						margin: 0;
						padding: 0;
						color: #000;
						font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
							'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
							'Helvetica Neue', sans-serif;
					}
				`}</style>
			</div>
		)
	}
}
