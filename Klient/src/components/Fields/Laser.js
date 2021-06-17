import {
	TextureLoader,
	AdditiveBlending,
	PointsMaterial,
	Points,
	BufferGeometry,
	BufferAttribute,
} from 'three';
import fireTex from "../assets/fire.png";

export default class Laser {
	constructor(scene, startPoint, endPoint) {
		this.scene = scene;
		this.startPoint = startPoint;
		this.endPoint = endPoint;
		this.size = 0.8;
		this.particleCount = 50;

		this.particlesGeometry = new BufferGeometry()
		this.verticesArray = new Float32Array(this.particleCount * 3);
		this.particleMaterial = new PointsMaterial({
			color: 0xfdca00,
			depthWrite: false,
			transparent: true,
			size: this.size,
			map: new TextureLoader().load(fireTex),
			blending: AdditiveBlending,
		})

		this.v1 = this.startPoint
		this.v2 = this.endPoint

		this.subV = this.v2.clone().sub(this.v1.clone())
		this.stepV = this.subV.clone().divideScalar(this.particleCount)
	}

	generate() {
		console.log("Laser generation");

		for (let i = 0; i < this.particleCount * 3; i += 3) {
			let newVector = this.v1.clone().add(this.stepV.clone().multiplyScalar(i / 3))

			this.verticesArray[i] = newVector.x
			this.verticesArray[i + 1] = newVector.y
			this.verticesArray[i + 2] = newVector.z
		}

		this.bufferAttr = new BufferAttribute(this.verticesArray, 3)
		this.particlesGeometry.setAttribute("position", this.bufferAttr)
		this.particlesGeometry.attributes.position.needsUpdate = true

		this.points = new Points(this.particlesGeometry, this.particleMaterial)
		this.scene.add(this.points)
	}
}