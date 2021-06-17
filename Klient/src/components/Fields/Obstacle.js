import {
	BoxGeometry,
	Mesh,
	MeshBasicMaterial,
	TextureLoader,
} from "three";

export default class Obstacle {
	constructor(scene, obstacleType) {
		this.scene = scene;
		this.obstacleType = obstacleType
		this.name = "obstacle";

		this.geometry = new BoxGeometry(0.8, 0.8, 0.8);
		this.material = new MeshBasicMaterial({
			map: new TextureLoader().load(`materials/${this.obstacleType}.png`)
		})

		this.mesh = new Mesh(this.geometry, this.material);
		this.mesh.name = this.name;

		this.scene.add(this.mesh)
	}

	destroy() {
		this.scene.remove(this.mesh)
	}
}