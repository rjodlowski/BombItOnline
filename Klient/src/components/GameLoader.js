import {
	AmbientLight,
	AxesHelper,
	GridHelper,
} from "three"
import Wall from "./Fields/Wall.js"
import Obstacle from "./Fields/Obstacle.js"
import Plane from "./Fields/Plane.js"
import Player from "./Player"

export default class GameLoader {
	constructor(scene, manager) {
		this.scene = scene;
		this.planeRotation = Math.PI / 2
		this.gameData = null;
		this.player = undefined
		this.playerData = null;
		this.bombs = [];
		this.bombId = 0;
		this.gameStarted = false;
		this.gameTable = [];
		this.enemyPlayerData = null;
		this.enemyPlayer = null;
		this.manager = manager
	}

	getGameData() {
		// Gets saved game data from server

		return $.ajax({
			method: "GET",
			url: "https://bomb-it-project.herokuapp.com/load",
		})
	}

	createLevelBasics(createGrid = false, createAxes = false) {
		// Creates basic level layout

		this.floor = new Plane(this.scene)
		this.floor.mesh.position.set(5, 0, 5);
		this.floor.mesh.rotation.set(this.planeRotation, 0, 0)

		this.ambientLight = new AmbientLight(0x404040)
		this.scene.add(this.ambientLight);

		if (createGrid) {
			this.grid = new GridHelper(10, 10)
			this.grid.position.set(5, 0, 5)
			this.scene.add(this.grid)
		}
		if (createAxes) {
			this.axes = new AxesHelper(1000)
			this.scene.add(this.axes)
		}
	}

	createLevelLayout() {
		// Creates all level blocks based on data from server

		this.walls = []
		this.enemies = []
		this.lights = []
		this.treasures = []
		this.obstacles = []

		for (let i = 0; i < this.gameData.size; i++) {
			let currGameObject = this.gameData.fieldList[i]

			switch (currGameObject.type) {
				case "wall":
					let wall = new Wall(this.scene);
					wall.mesh.position.set(currGameObject.x + 0.5, currGameObject.y + 0.5, currGameObject.z + 0.5)
					this.walls.push(wall)
					break;

				case "treasure":
					let obstacleType = `obstacle${Math.ceil(Math.random() * 3)}`;
					let obstacle = new Obstacle(this.scene, obstacleType);
					obstacle.mesh.position.set(currGameObject.x + 0.5, currGameObject.y + 0.5, currGameObject.z + 0.5)
					this.obstacles.push(obstacle)
					break;
			}
		}
	}

	addPlayer() {
		// Adds player to the game on the server

		return $.ajax({
			method: "GET",
			url: "https://bomb-it-project.herokuapp.com/newPlayer",
		})
	}

	materializePlayer() {
		// Physically renders player in the game

		this.player = new Player(this.scene, this.playerData, this.manager)
	}
}