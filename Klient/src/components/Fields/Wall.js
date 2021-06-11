import {
	BoxGeometry,
	Mesh,
	MeshBasicMaterial,
	TextureLoader,
} from "three";

export default class Wall {

	constructor(scene) {
		this.scene = scene;
		this.geometry = new BoxGeometry(1, 1, 1);
		this.material = new MeshBasicMaterial({
			// color: 0x00ff00,
			map: new TextureLoader().load("materials/wall.jpg")
		})

		this.mesh = new Mesh(this.geometry, this.material);
		this.mesh.castShadow = true;
		this.scene.add(this.mesh)
	}
}