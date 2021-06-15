import {
	BoxGeometry,
	Mesh,
	MeshBasicMaterial,
} from "three";

export default class Obstacle {

	constructor(scene, obstacleType) {
		this.scene = scene;
		// Variety of obstacles 
		this.obstacleType = obstacleType
		this.name = "obstacle";

		this.geometry = new BoxGeometry(0.8, 0.8, 0.8);

		switch (this.obstacleType) {
			case "obstacle1":
				this.material = new MeshBasicMaterial({
					// Red
					color: 0xff0000,
				})
				break;

			case "obstacle2":
				this.material = new MeshBasicMaterial({
					// Yellow
					color: 0xfff204,
				})
				break;

			case "obstacle3":
				this.material = new MeshBasicMaterial({
					// Blue
					color: 0x2904ff,
				})
				break;

			default:
				this.material = new MeshBasicMaterial({
					// Pink
					color: 0xe706ff,
				})
				break;
		}

		this.mesh = new Mesh(this.geometry, this.material);
		this.mesh.name = this.name;

		this.scene.add(this.mesh)
	}

	destroy() {
		this.scene.remove(this.mesh)
	}
}