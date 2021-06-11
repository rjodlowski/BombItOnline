import {
	Mesh,
	MeshBasicMaterial,
	BoxGeometry,
	TextureLoader,
} from "three";

export default class Treasure {

	constructor(scene) {
		this.scene = scene;
		this.geometry = new BoxGeometry(0.5, 0.5, 0.5);
		this.material = new MeshBasicMaterial({
			// color: 0x2c83c9,
			map: new TextureLoader().load("materials/treasure.jpg")
		})

		this.mesh = new Mesh(this.geometry, this.material);
		this.scene.add(this.mesh)
	}
}