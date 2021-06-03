import {
	BoxGeometry,
	MeshBasicMaterial,
	Mesh,
} from "three";

export default class Player {

	constructor(scene) {
		this.scene = scene;
		this.geometry = new BoxGeometry(0.5, 0.5, 0.5)
		this.material = new MeshBasicMaterial({ color: 0x21ff15 })
		this.mesh = new Mesh(this.geometry, this.material)
		this.scene.add(this.mesh);
	}
}