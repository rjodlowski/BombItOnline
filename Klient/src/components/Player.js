import {
	BoxGeometry,
	MeshBasicMaterial,
	Mesh,
} from "three";

export default class Player {

	constructor(scene, playerData) {
		this.scene = scene;
		this.playerData = playerData

		this.geometry = new BoxGeometry(0.5, 0.5, 0.5)
		this.material = new MeshBasicMaterial({ color: 0x21ff15 })
		this.mesh = new Mesh(this.geometry, this.material)
		this.mesh.position.set(
			this.playerData.x + 0.5,
			this.playerData.y + 0.5,
			this.playerData.z + 0.5
		)

		this.scene.add(this.mesh);
	}
}