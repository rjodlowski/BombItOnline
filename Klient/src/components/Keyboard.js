// import Animation from "./Animation"
import KeyboardConfig from "./KeyboardConfig";

const KEYS = {
	// Arrows
	// "left": 37,
	// "up": 38,
	// "right": 39,
	// "down": 40,

	// WSAD
	"left": 65,
	"up": 87,
	"right": 68,
	"down": 83,

	// Space
	"bomb": 32

	// Enter
	// "bomb" : 13
};

export default class Keyboard {
	constructor(
		domElement,
		// animation,
		// modelMesh
	) {

		this.domElement = domElement;
		// this.animation = animation
		// this.modelMesh = modelMesh

		// events
		this.domElement.addEventListener('keydown', event => this.onKeyDown(event), false);
		this.domElement.addEventListener('keyup', event => this.onKeyUp(event), false);
	}

	onKeyUp(event) {
		switch (event.keyCode) {
			case KEYS.up:
				KeyboardConfig.moveForward = false;
				break;
			case KEYS.down:
				KeyboardConfig.moveBack = false;
				break;
			case KEYS.left:
				KeyboardConfig.moveLeft = false;
				break;
			case KEYS.right:
				KeyboardConfig.moveRight = false;
				break;
		}
		// console.log('onKeyChange', event.keyCode)
	}

	onKeyDown(event) {
		switch (event.keyCode) {
			case KEYS.up:
				KeyboardConfig.moveForward = true;
				break;
			case KEYS.down:
				KeyboardConfig.moveBack = true;
				break;
			case KEYS.left:
				KeyboardConfig.moveLeft = true;
				break;
			case KEYS.right:
				KeyboardConfig.moveRight = true;
				break;
		}
	}

	removeEventListeners() {
		this.domElement.removeEventListener("keydown", event => this.onKeyUp(event), false)
		this.domElement.removeEventListener("keyup", event => this.onKeyUp(event), false)
	}
}