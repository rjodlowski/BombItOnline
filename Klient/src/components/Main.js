import {
	Scene,
	Vector3,
} from "three";
import Renderer from "./Renderer"
import Camera from "./Camera"
import GameLoader from "./GameLoader"
import Player from "./Player"
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Main {
	constructor(container) {
		this.container = container;
		this.scene = new Scene();
		this.renderer = new Renderer(this.scene, this.container);

		this.camera = new Camera(this.renderer.threeRenderer);
		let boardCenterVect = new Vector3(5, 0, 5);
		// this.player = new Player(this.scene)
		// this.player.position.set(8,0,1)

		// OrbitControls
		// this.controls = new OrbitControls(this.camera.threeCamera, this.renderer.threeRenderer.domElement);
		// this.controls.target = boardCenterVect
		// this.camera.threeCamera.rotation.y += 90

		this.camera.threeCamera.position.set(5, 10, 7);
		this.camera.threeCamera.lookAt(boardCenterVect)

		// Stats
		this.stats = new Stats()
		this.stats.showPanel(0)
		document.body.appendChild(this.stats.dom)

		this.game = new GameLoader(this.scene);
		this.game.getGameData().done((data) => {
			// Render a level
			this.game.gameData = JSON.parse(data);
			this.game.createLevelBasics(true, true)
			this.game.createLevelLayout();

			// Add player to the game
			this.game.addPlayer().done((data) => {
				if (data != "Brak możliwości dodania gracza") {
					this.game.playerData = JSON.parse(data)
					this.game.materializePlayer()

					// console.log(this.player);
				} else {
					alert(data);
				}
			})
		})

		this.render();
	}

	render() {
		this.stats.begin()

		this.renderer.render(this.scene, this.camera.threeCamera);

		this.stats.end();

		requestAnimationFrame(this.render.bind(this));
	}
}
