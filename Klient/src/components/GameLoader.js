import {
	AmbientLight,
	AxesHelper,
	GridHelper,
	Vector3,
} from "three"
import Enemy from "./Fields/Enemy.js"
import Wall from "./Fields/Wall.js"
import Treasure from "./Fields/Treasure.js"
import Obstacle from "./Fields/Obstacle.js"
import Light from "./Fields/Light.js"
import Plane from "./Fields/Plane.js"
import Player from "./Player"

export default class GameLoader {
	constructor(scene) {
		this.scene = scene;
		this.gameData = null;
		this.player = undefined
		this.playerData = null;
		this.bombs = [];
		this.bombId = 0;
		this.gameStarted = false;
		this.gameTable = [];
		this.enemyPlayerData = null;
		this.enemyPlayer = null;
	}

	getGameData() {
		// Gets saved game data from server

		return $.ajax({
			method: "GET",
			url: "http://localhost:5000/load",
			contentType: "json",
		})
	}

	createLevelBasics(createGrid = false, createAxes = false) {
		// Creates basic level layout

		console.log("Level basics creation");
		this.planeRotation = Math.PI / 2

		// - floor
		this.floor = new Plane(this.scene)
		this.floor.mesh.position.set(5, 0, 5);
		this.floor.mesh.rotation.set(this.planeRotation, 0, 0)

		// - ambient light
		this.ambientLight = new AmbientLight(0x404040)
		this.scene.add(this.ambientLight);


		// - helpers (grid, axes)
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

		console.log("Level content creation, whole game data: ");
		console.log(this.gameData);

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

				case "enemy":
					let enemy = new Enemy(this.scene);
					enemy.mesh.position.set(currGameObject.x + 0.5, currGameObject.y + 0.5, currGameObject.z + 0.5)
					this.enemies.push(enemy)
					break;

				case "treasure":
					let obstacleType = `obstacle${Math.ceil(Math.random() * 3)}`;

					let obstacle = new Obstacle(this.scene, obstacleType);
					obstacle.mesh.position.set(currGameObject.x + 0.5, currGameObject.y + 0.5, currGameObject.z + 0.5)
					this.obstacles.push(obstacle)
					break;

				case "light":
					let light = new Light(this.scene);
					light.mesh.position.set(currGameObject.x + 0.5, currGameObject.y + 0.9, currGameObject.z + 0.5)
					this.lights.push(light)
					break;

				default:
					console.log("No filter specified");
					break;
			}
		}
	}

	addPlayer() {
		// Adds player to the game on the server

		return $.ajax({
			method: "GET",
			url: "http://localhost:5000/newPlayer",
			contentType: "json",
		})
	}

	materializePlayer() {
		// Physically renders player in the game

		console.log("PlayerData game");
		console.log(this.playerData);

		this.player = new Player(this.scene, this.playerData)
		this.playerX = this.player.mesh.position.x
		this.playerZ = this.player.mesh.position.z

		console.log("Actual player positon");
		console.log(this.playerX, this.playerZ);
	}

}