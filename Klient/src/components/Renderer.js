import { PCFSoftShadowMap, WebGLRenderer } from 'three';

export default class Renderer {
	constructor(scene, container) {
		this.scene = scene;
		this.container = container;
		this.threeRenderer = new WebGLRenderer({ antialias: true });
		this.threeRenderer.setClearColor(0x73a9ff);
		this.threeRenderer.shadowMap.enabled = true;
		this.threeRenderer.shadowMap.type = PCFSoftShadowMap;
		this.container.appendChild(this.threeRenderer.domElement);
		this.updateSize();

		document.addEventListener('DOMContentLoaded', () => this.updateSize(), false);
		window.addEventListener('resize', () => this.updateSize(), false);
	}

	updateSize() {
		this.threeRenderer.setSize(window.innerWidth, window.innerHeight);
	}

	render(scene, camera) {
		this.threeRenderer.render(scene, camera);
	}
}