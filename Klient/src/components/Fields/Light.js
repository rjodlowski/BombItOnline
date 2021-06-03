import {
	MeshPhongMaterial,
	BoxGeometry,
	Mesh,
	PointLight,
} from "three";

export default class Light {

	constructor(scene) {
		this.scene = scene;
		this.geometry = new BoxGeometry(0.2, 0.2, 0.2);
		this.material = new MeshPhongMaterial({
			color: 0xf2ff09,
			// transparent: true,
			// opacity: 0.5,
			wireframe: true,
		})

		// 0xfce803 - yellow
		// ffff00 - more yellow
		this.light = new PointLight(0xffffff, 10)
		this.light.intensity = 0.3

		this.mesh = new Mesh(this.geometry, this.material);
		this.light.castShadow = false;

		this.mesh.add(this.light)
		this.scene.add(this.mesh)
	}

	updateLightPos() {
		// Set light position in the center
		//@ts-ignore
		this.light.position.set(this.mesh.position)
	}

	updateLight() {
		this.light.intensity += 0.01;

		if (this.light.intensity >= 2) {
			this.light.intensity = 0;
		}
	}
}