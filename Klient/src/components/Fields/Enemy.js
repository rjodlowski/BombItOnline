import {
	MeshBasicMaterial,
	BoxGeometry,
	Mesh,
	TextureLoader,
} from "three";

export default class Enemy {

	constructor(scene) {
		this.scene = scene;
		this.geometry = new BoxGeometry(0.5, 0.5, 0.5);
		this.material = new MeshBasicMaterial({
			// color: 0xfc0303,
			map: new TextureLoader().load("materials/enemy.jpg")
		})

		this.mesh = new Mesh(this.geometry, this.material);
		this.scene.add(this.mesh)
	}
}