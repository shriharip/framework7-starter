import React, { Component, RefObject } from 'react';
import './styles.css';

const slider: RefObject<HTMLDivElement | null> = React.createRef();
const container: RefObject<HTMLDivElement | null> = React.createRef();
const isTouchDevice: boolean = 'ontouchstart' in document.documentElement;

interface ReactSwipeButtonProps {
	color?: string;
	text?: string;
	text_unlocked?: string;
	onSuccess?: () => void;
	onFailure?: () => void;
}

interface ReactSwipeButtonState {
	unlocked: boolean;
}

export default class ReactSwipeButton extends Component<ReactSwipeButtonProps, ReactSwipeButtonState> {
	private isDragging: boolean = false;
	private sliderLeft: number = 0;
	private startX: number = 0;
	private containerWidth: number = 0;
	private unmounted: boolean = false;

	state: ReactSwipeButtonState = {
		unlocked: false,
	};

	componentDidMount() {
		if (isTouchDevice) {
			document.addEventListener('touchmove', this.onDrag);
			document.addEventListener('touchend', this.stopDrag);
		} else {
			document.addEventListener('mousemove', this.onDrag);
			document.addEventListener('mouseup', this.stopDrag);
		}

		if (container.current) {
			this.containerWidth = container.current.clientWidth - 50;
		}
	}

	onDrag = (e: TouchEvent | MouseEvent) => {
		if (this.unmounted || this.state.unlocked) return;

		if (this.isDragging) {
			if ('touches' in e) {
				this.sliderLeft = Math.min(
					Math.max(0, e.touches[0].clientX - this.startX),
					this.containerWidth
				);
			} else {
				this.sliderLeft = Math.min(
					Math.max(0, e.clientX - this.startX),
					this.containerWidth
				);
			}
			this.updateSliderStyle();
		}
	};

	updateSliderStyle = () => {
		if (this.unmounted || this.state.unlocked || !slider.current) return;

		slider.current.style.left = `${this.sliderLeft + 50}px`;
	};

	stopDrag = () => {
		if (this.unmounted || this.state.unlocked) return;

		if (this.isDragging) {
			this.isDragging = false;

			if (this.sliderLeft > this.containerWidth * 0.9) {
				this.sliderLeft = this.containerWidth;
				this.onSuccess();

				if (this.props.onSuccess) {
					this.props.onSuccess();
				}
			} else {
				this.sliderLeft = 0;

				if (this.props.onFailure) {
					this.props.onFailure();
				}
			}

			this.updateSliderStyle();
		}
	};

	startDrag = (e: React.MouseEvent | React.TouchEvent) => {
		if (this.unmounted || this.state.unlocked) return;

		this.isDragging = true;

		if ('touches' in e) {
			this.startX = e.touches[0].clientX;
		} else {
			this.startX = e.clientX;
		}
	};

	onSuccess = () => {
		if (container.current) {
			container.current.style.width = `${container.current.clientWidth}px`;
		}

		this.setState({
			unlocked: true,
		});
	};

	getText = (): string => {
		return this.state.unlocked
			? this.props.text_unlocked || 'PAID'
			: this.props.text || 'SLIDE';
	};

	reset = () => {
		if (this.unmounted) return;

		this.setState({ unlocked: false }, () => {
			this.sliderLeft = 0;
			this.updateSliderStyle();
		});
	};

	componentWillUnmount() {
		this.unmounted = true;
	}

	render() {
		return (
			<div className="ReactSwipeButton">
				<div
					className={
						'rsbContainer ' +
						(this.state.unlocked ? 'rsbContainerUnlocked' : '')
					}
					ref={container}
				>
					<div
						className="rsbcSlider"
						ref={slider}
						onMouseDown={this.startDrag}
						style={{ background: this.props.color }}
						onTouchStart={this.startDrag}
					>
						<span className="rsbcSliderText">{this.getText()}</span>
						<span className="rsbcSliderArrow"></span>
						<span
							className="rsbcSliderCircle"
							style={{ background: this.props.color }}
						></span>
					</div>
					<div className="rsbcText">{this.getText()}</div>
				</div>
			</div>
		);
	}
}