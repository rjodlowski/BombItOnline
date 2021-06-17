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
};

export default class Keyboard {
	constructor(domElement, animation, modelMesh) {
		this.domElement = domElement;
		this.animation = animation
		this.modelMesh = modelMesh
		this.canMoveUp = true;
		this.canMoveDown = true;
		this.canMoveLeft = true;
		this.canMoveRight = true;
		this.wDown = false;
		this.sDown = false;
		this.aDown = false;
		this.dDown = false;

		// events
		this.domElement.addEventListener('keydown', event => this.onKeyDown(event), false);
		this.domElement.addEventListener('keyup', event => this.onKeyUp(event), false);
	}

	onKeyUp(event) {
		switch (event.keyCode) {
			case KEYS.up:
				KeyboardConfig.moveForward = false;
				this.canMoveUp = true;
				this.wDown = false;
				this.animation.playAnim("stand")
				break;
			case KEYS.down:
				KeyboardConfig.moveBack = false;
				this.canMoveDown = true;
				this.sDown = false;
				this.animation.playAnim("stand")
				break;
			case KEYS.left:
				KeyboardConfig.moveLeft = false;
				this.canMoveLeft = true;
				this.aDown = false;
				this.animation.playAnim("stand")
				break;
			case KEYS.right:
				KeyboardConfig.moveRight = false;
				this.canMoveRight = true;
				this.dDown = false;
				this.animation.playAnim("stand")
				break;
		}
	}

	onKeyDown(event) {
		console.log(KeyboardConfig);
		console.log(this.canMoveUp, this.canMoveDown, this.canMoveLeft, this.canMoveRight);
		switch (event.keyCode) {
			case KEYS.up:
				if (this.canMoveUp) {
					KeyboardConfig.moveForward = true;
					this.wDown = true;
					this.animation.playAnim("run")
				}
				break;
			case KEYS.down:
				if (this.canMoveDown) {
					KeyboardConfig.moveBack = true;
					this.sDown = true;
					this.animation.playAnim("run")
				}
				break;
			case KEYS.left:
				if (this.canMoveLeft) {
					KeyboardConfig.moveLeft = true;
					this.aDown = true;
					this.animation.playAnim("run")
				}
				break;
			case KEYS.right:
				if (this.canMoveRight) {
					KeyboardConfig.moveRight = true;
					this.dDown = true;
					this.animation.playAnim("run")
				}
				break;
		}
	}

	removeEventListeners() {
		this.domElement.removeEventListener("keydown", event => this.onKeyUp(event), false)
		this.domElement.removeEventListener("keyup", event => this.onKeyUp(event), false)
	}
}