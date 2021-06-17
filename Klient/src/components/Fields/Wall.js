import {
	BoxGeometry,
	Mesh,
	MeshBasicMaterial,
	TextureLoader,
} from "three";

export default class Wall {
	constructor(scene) {
		this.scene = scene;
		this.name = "wall";

		this.geometry = new BoxGeometry(1, 1, 1);
		this.material = new MeshBasicMaterial({
			map: new TextureLoader().load("materials/wall.png")
		})

		this.mesh = new Mesh(this.geometry, this.material);
		this.mesh.name = this.name;
		this.scene.add(this.mesh)
	}
}