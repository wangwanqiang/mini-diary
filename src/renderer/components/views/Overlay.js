import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import iconClear from 'feather-icons/dist/icons/x.svg';
import SimpleSvg from 'react-simple-svg';


const propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]).isRequired,
	onClose: PropTypes.func.isRequired
};

export default class Overlay extends PureComponent {
	constructor() {
		super();

		// Function bindings
		this.onKeyDown = this.onKeyDown.bind(this);
	}

	componentDidMount() {
		window.addEventListener('keydown', this.onKeyDown);
	}

	componentWillUnmount() {
		window.removeEventListener('keydown', this.onKeyDown);
	}

	onKeyDown(e) {
		if (e.key === 'Escape') {
			const { onClose } = this.props;
			onClose();
		}
	}

	render() {
		const { children, onClose } = this.props;

		return (
			<div className="overlay-outer">
				<div className="overlay-inner">
					<button
						type="button"
						className="button button-invisible overlay-close-button"
						onClick={onClose}
					>
						<SimpleSvg src={iconClear} height={20} width={20} />
					</button>
					<div className="overlay-content">
						{children}
					</div>
				</div>
			</div>
		);
	}
}

Overlay.propTypes = propTypes;
