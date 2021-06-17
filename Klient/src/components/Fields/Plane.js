import {
	MeshBasicMaterial,
	Mesh,
	PlaneGeometry,
	DoubleSide,
	TextureLoader,
	RepeatWrapping,
} from "three";

export default class Plane {
	constructor(scene) {
		this.scene = scene;
		this.geometry = new PlaneGeometry(10, 10);
		this.material = new MeshBasicMaterial({
			side: DoubleSide,
			map: new TextureLoader().load("materials/floor.png")
		});

		this.mesh = new Mesh(this.geometry, this.material);
		this.mesh.material.map.wrapS = RepeatWrapping;
		this.mesh.material.map.wrapT = RepeatWrapping;
		this.mesh.material.map.repeat.set(5, 5);
		this.mesh.receiveShadow = true;

		this.scene.add(this.mesh)
	}
}