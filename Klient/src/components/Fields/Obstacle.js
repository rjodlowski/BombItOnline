import {
	BoxGeometry,
	Mesh,
	MeshPhongMaterial,
} from "three";

export default class Obstacle {

	constructor(scene, obstacleType) {
		this.scene = scene;
		// Variety of obstacles 
		this.obstacleType = obstacleType

		this.geometry = new BoxGeometry(0.8, 0.8, 0.8);

		switch (this.obstacleType) {
			case "obstacle1":
				this.material = new MeshPhongMaterial({
					color: 0x00ff00,
				})
				break;
			case "obstacle2":
				this.material = new MeshPhongMaterial({
					color: 0xfff204,
				})
				break;

			default:
				this.material = new MeshPhongMaterial({
					color: 0x2904ff,
				})
				break;
		}

		this.mesh = new Mesh(this.geometry, this.material);
		this.mesh.castShadow = true;

		this.scene.add(this.mesh)
	}

	destroy() {
		this.scene.remove(this.mesh)
	}
}