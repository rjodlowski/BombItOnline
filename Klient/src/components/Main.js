import {
	Scene,
	Vector3,
	LoadingManager,
	Clock,
	Ray,
	Raycaster
} from "three";
import Renderer from "./Renderer"
import Camera from "./Camera"
import GameLoader from "./GameLoader"
import Player from "./Player"
import Bomb from "./Fields/Bomb";
import Stats from 'three/examples/jsm/libs/stats.module.js';
import Animation from "./Animation"
import Keyboard from "./Keyboard";
import KeyboardConfig from "./KeyboardConfig";

export default class Main {
	constructor(container) {
		this.container = container;
		this.isLoaded = null
		this.animation = null
		let boardCenterVect = new Vector3(5, 0, 5);

		this.scene = new Scene();
		this.renderer = new Renderer(this.scene, this.container);
		this.clock = new Clock()
		this.manager = new LoadingManager();
		this.enemyManager = new LoadingManager();
		this.stats = new Stats()

		this.camera = new Camera(this.renderer.threeRenderer);
		this.camera.threeCamera.position.set(5, 10, 7);
		this.camera.threeCamera.lookAt(boardCenterVect)

		this.stats.showPanel(0)
		document.body.appendChild(this.stats.dom)

		this.game = new GameLoader(this.scene, this.manager);
		this.game.getGameData().done((data) => {
			// Render a level
			this.game.gameData = JSON.parse(data);
			this.game.gameData.players = [];
			this.game.createLevelBasics()
			this.game.createLevelLayout();

			// Add player to the game
			this.game.addPlayer().done((data) => {
				if (data != "Brak możliwości dodania gracza") {

					this.game.playerData = JSON.parse(data)
					this.game.gameData.players.push(this.game.playerData);

					this.game.materializePlayer();

					this.manager.onProgress = (item, loaded, total) => {
						console.log(`progress ${item}: ${loaded} ${total}`);
					};

					this.manager.onLoad = () => {
						this.isLoaded = true;
						console.log("First player's model loaded")

						this.animation = new Animation(this.game.player.model)
						this.animation.playAnim("stand")
						this.keyboard = new Keyboard(window, this.animation, this.game.player.mesh);
					};

					// Wait for another player to join the game
					// then create it and start the game
					this.waitforPlayer();
				}
			})
		})

		this.render();
	}

	render() {
		this.stats.begin()

		this.renderer.render(this.scene, this.camera.threeCamera);

		this.playerMove();
		this.checkPlayerMove();
		this.bombsUpdate();
		this.updateAnimations();
		this.playerCollisionDetection();

		this.stats.end();

		requestAnimationFrame(this.render.bind(this));
	}

	playerMove() {
		// Enables player movement

		if (this.game.gameStarted) {
			let playerPos = this.game.player.mesh.position

			if (KeyboardConfig.moveLeft) {
				this.game.player.mesh.lookAt(
					playerPos.x - 10,
					playerPos.y,
					playerPos.z
				);
				this.game.player.mesh.translateZ(0.02)
			}
			if (KeyboardConfig.moveRight) {
				this.game.player.mesh.lookAt(
					playerPos.x + 10,
					playerPos.y,
					playerPos.z
				);
				this.game.player.mesh.translateZ(0.02)
			}
			if (KeyboardConfig.moveForward) {
				this.game.player.mesh.lookAt(
					playerPos.x,
					playerPos.y,
					playerPos.z - 10
				);
				this.game.player.mesh.translateZ(0.02)
			}
			if (KeyboardConfig.moveBack) {
				this.game.player.mesh.lookAt(
					playerPos.x,
					playerPos.y,
					playerPos.z + 10
				);
				this.game.player.mesh.translateZ(0.02)
			}
		}
		// red - X
		// green - Y
		// blue - Z
	}

	checkPlayerMove() {
		// Detects when local player's position changes and updates it on the server

		if (this.game.gameStarted) {
			let playerPos = this.game.player.mesh.position;

			if (
				Math.floor(playerPos.x) != this.game.playerData.x ||
				Math.floor(playerPos.z) != this.game.playerData.z
			) {
				this.game.playerData.x = Math.floor(playerPos.x)
				this.game.playerData.z = Math.floor(playerPos.z)

				$.ajax({
					method: "GET",
					url: "https://bomb-it-project.herokuapp.com/playerMove",
					contentType: "json",
					data: {
						playerType: this.game.playerData.playerType,
						playerX: this.game.playerData.x,
						playerZ: this.game.playerData.z,
					}
				}).done((data) => {
					console.log(data);
				})
			}
		}
	}

	bombsUpdate() {
		// Bombs update - growing and explosion

		if (this.game.gameStarted) {
			if (this.game.bombs.length > 0) {
				for (let i = 0; i < this.game.bombs.length; i++) {
					if (this.game.bombs[i].timePrimed < this.game.bombs[i].primeTime) {
						this.game.bombs[i].grow()
					} else {
						let playerDestroyed = this.game.bombs[i].explode();
						this.game.bombs.splice(i, 1);

						if (playerDestroyed != undefined) {
							this.endGame(playerDestroyed)
						}
					}
				}
			}
		}
	}

	updateAnimations() {
		// Updates both players' animations

		var delta = this.clock.getDelta();

		// First player
		if (this.animation) {
			this.animation.update(delta)
		}

		// Second player 
		if (this.enemyAnimation) {
			this.enemyAnimation.update(delta)
		}
	}

	playerCollisionDetection() {
		if (this.game.gameStarted) {
			this.game.player.raycaster = new Raycaster()
			let playerDirection = this.game.player.mesh.getWorldDirection();
			this.game.player.raycaster.ray = new Ray(
				this.game.player.mesh.position,
				playerDirection
			)

			let intersects = this.game.player.raycaster.intersectObjects(this.scene.children)

			let wallsToAvoid = []
			if (intersects.length > 0) {
				let previousObject = null;

				// Get walls from all of intersects
				for (let i = 0; i < intersects.length; i++) {
					if (intersects[i].object != previousObject) {
						previousObject = intersects[i].object;

						if (intersects[i].object.type === "Mesh") {
							wallsToAvoid.push(intersects[i])
						}
					}
				}

				let closestWall = wallsToAvoid[0]

				if (closestWall.distance < 0.4) {

					if (playerDirection.x == 1 && this.keyboard.dDown) {
						// right - x1y0z0
						KeyboardConfig.moveRight = false;
						this.keyboard.canMoveRight = false;
					}
					if (playerDirection.x == -1 && this.keyboard.aDown) {
						// left - x-1y0z0
						KeyboardConfig.moveLeft = false;
						this.keyboard.canMoveLeft = false;
					}
					if (playerDirection.z == 1 && this.keyboard.sDown) {
						// bottom - x0y0z1
						KeyboardConfig.moveBack = false;
						this.keyboard.canMoveDown = false;
					}
					if (playerDirection.z == -1 && this.keyboard.wDown) {
						// top - x0y0z-1
						KeyboardConfig.moveForward = false;
						this.keyboard.canMoveUp = false;
					}
				}
			}
		}
	}

	waitforPlayer() {
		// Awaits for next player to join the game
		// When next player joins, starts the game

		this.playerIndex = this.game.playerData.playerType

		this.checkNextPlayerIn = setInterval(() => {
			$.ajax({
				method: "GET",
				url: "https://bomb-it-project.herokuapp.com/awaitPlayer",
				contentType: "json",
				data: {
					playerIndex: this.game.playerData.playerType,
				},
			}).done((data) => {
				console.log(data);
				if (data != "Brak drugiego gracza") {

					// Add new player, break interval
					console.log("New player added");
					console.log(JSON.parse(data));
					this.game.enemyPlayerData = JSON.parse(data);
					this.game.enemyPlayer = new Player(this.scene, this.game.enemyPlayerData, this.enemyManager)

					this.enemyManager.onLoad = () => {
						console.log("Second player's model loaded")
						this.enemyAnimation = new Animation(this.game.enemyPlayer.model)
						this.enemyAnimation.playAnim("stand")
					};

					this.addPlayerActions()
					clearInterval(this.checkNextPlayerIn);

					// Start the game 
					this.startGameUpdateInterval()
				}
			})
		}, 500);
	}

	startGameUpdateInterval() {
		// Starts game update interval

		this.game.gameStarted = true;

		this.gameUpdateInterval = setInterval(() => {
			console.log("game update ajax");

			$.ajax({
				method: "GET",
				url: "https://bomb-it-project.herokuapp.com/update",
				contentType: "json",
				data: {
					test: "test"
				}
			}).done((data) => {
				this.game.gameTable = JSON.parse(data);
				this.updateGame();
			})

		}, 600);
	}

	updateGame() {
		// Updates game state based on a table from server

		for (let z = 1; z < 9; z++) {
			for (let x = 1; x < 9; x++) {
				let fieldType = this.game.gameTable[z][x]

				switch (fieldType) {
					case 3:
						// Bomb
						// if no bomb on this position in game  
						if (this.game.bombs.findIndex(e => e.bombPosition.equals(new Vector3(x, 0, z))) == -1) {
							let bomb = new Bomb(this.scene, this.game, this.game.bombId, new Vector3(x, 0, z))
							this.game.bombs.push(bomb);
							this.game.bombId++;
						}
						break;

					case 4:
						// Player 1
						if (this.game.playerData.playerType != "first") {
							this.game.enemyPlayer.mesh.position.set(
								x + 0.5,
								0.5,
								z + 0.5
							)
						}
						break;

					case 5:
						// Player 2
						if (this.game.playerData.playerType != "second") {
							this.game.enemyPlayer.mesh.position.set(
								x + 0.5,
								0.5,
								z + 0.5
							)
						}
						break;
				}
			}
		}
	}

	addPlayerActions() {
		// Adds an ability for the local player to place bombs - that's it for now

		window.onkeydown = (key) => {
			// Space clicked
			if (key.which == 32) {

				let playerWhoPlacedBombFound = this.game.bombs.findIndex(x => x.playerType === this.game.playerData.playerType)
				console.log(this.game.playerData.playerType);
				console.log(playerWhoPlacedBombFound);

				if (playerWhoPlacedBombFound == -1) {
					$.ajax({
						method: "GET",
						url: "https://bomb-it-project.herokuapp.com/placeBomb",
						contentType: "json",
						data: {
							playerType: this.game.playerData.playerType,
							positionX: Math.floor(this.game.player.mesh.position.x),
							positionZ: Math.floor(this.game.player.mesh.position.z)
						}
					}).done((data) => {
						console.log(data);
					})
				}
			}
		}
	}

	endGame(destroyedPlayerType) {

		clearInterval(this.gameUpdateInterval);

		if (destroyedPlayerType === this.game.player.playerData.playerType) {
			alert("You lose!")
		} else if (destroyedPlayerType === this.game.enemyPlayer.playerData.playerType) {
			alert("You win!")
		}

		this.scene.remove(this.game.enemyPlayer.mesh);
		this.scene.remove(this.game.player.mesh);

		this.keyboard.removeEventListeners();
		window.onkeydown = null;

		this.game.gameStarted = false;
	}
}
