import {
	IcosahedronGeometry,
	MeshBasicMaterial,
	Mesh,
	Vector3,
	Raycaster,
	Ray,
	AxesHelper,
} from "three";
import Laser from "./Laser";

export default class Bomb {
	constructor(scene, game, id, bombPosition) {
		this.scene = scene;
		this.game = game;
		this.bombPosition = bombPosition
		this.id = id
		this.primeTime = 550 // Time before explosion
		this.timePrimed = 0; // Time passed while growing
		this.destructableObjects = [
			"player",
			"obstacle"
		];
		this.lasers = [];
		this.playerDestroyed = false;
		this.playerToDestroy = null;

		this.geometry = new IcosahedronGeometry(0.2, 5);
		this.material = new MeshBasicMaterial({
			color: 0x000000
		});

		this.mesh = new Mesh(this.geometry, this.material);
		this.mesh.position.set(
			this.bombPosition.x + 0.5,
			this.bombPosition.y + 0.5,
			this.bombPosition.z + 0.5
		);

		this.scene.add(this.mesh)
	}

	grow() {
		// Bomb grows after being placed
		this.mesh.scale.x += 0.002;
		this.mesh.scale.y += 0.002;
		this.mesh.scale.z += 0.002;

		this.timePrimed++;
	}

	explode() {
		// Handle bomb explosion

		$.ajax({
			method: "GET",
			url: "http://localhost:5000/bombExplosion",
			contentType: "json",
			data: {
				x: this.bombPosition.x,
				z: this.bombPosition.z,
			}
		}).done((data) => {
			console.log(data);
		})

		// Neighboring blocks and players destruction
		let ray1 = this.deleteNeighbors(new Vector3(0, 0, -1))
		let ray2 = this.deleteNeighbors(new Vector3(0, 0, 1))
		let ray3 = this.deleteNeighbors(new Vector3(-1, 0, 0))
		let ray4 = this.deleteNeighbors(new Vector3(1, 0, 0))

		if (ray1 != undefined) {
			return ray1
		} else if (ray2 != undefined) {
			return ray2
		} else if (ray3 != undefined) {
			return ray3
		} else if (ray4 != undefined) {
			return ray4
		} else {
			return undefined
		}
	}

	deleteNeighbors(directionVect) {
		this.raycaster = new Raycaster()
		this.raycaster.ray = new Ray(this.mesh.position, directionVect)

		let interSec = this.raycaster.intersectObjects(this.scene.children);
		console.log("xD");
		console.log(interSec);

		if (interSec.length > 0) {
			let closestDestroyed = false;
			let sthDestroyed = false;
			let previousObject = null;


			for (let i = 0; i < interSec.length; i++) {
				let dist = interSec[i].distance
				let obj = interSec[i].object

				if (obj != previousObject) {

					if (obj.name === "wall") {
						// Wall is in front
						break;
					} else if (obj.type === "Mesh" && this.destructableObjects.includes(obj.name)) {
						if (dist <= 1.5) {
							closestDestroyed = true;
							sthDestroyed = true;
						} else if (dist > 1.5 && dist <= 2.5 && !closestDestroyed) {
							sthDestroyed = true;
						}

						if (sthDestroyed) {
							switch (obj.name) {
								case "obstacle":
									// Destroy an obstacle on server
									$.ajax({
										method: "GET",
										url: "http://localhost:5000/destroyObstacle",
										contentType: "json",
										data: {
											x: obj.position.x - 0.5,
											z: obj.position.z - 0.5,
										}
									}).done((data) => {
										console.log(data);
									})

									break;

								case "player":
									// Destroy player on server
									console.log("Player type:");
									console.log(obj.playerType);

									$.ajax({
										method: "GET",
										url: "http://localhost:5000/destroyPlayer",
										contentType: "json",
										data: {
											playerType: obj.playerType,
											x: Math.round(obj.position.x - 0.5),
											z: Math.round(obj.position.z - 0.5),
										}
									}).done((data) => {
										console.log(data);
									})
									this.playerDestroyed = true;
									this.playerToDestroy = obj.playerType;
								// return obj.playerType;

								default:
									break;
							}
							this.scene.remove(obj);
							sthDestroyed = false;
						}
					}
					previousObject = obj;
				}
			}
		}

		// Render rays of fire 
		// this.renderFlames(interSec, directionVect);
		let closestWall = null;
		let startPos = this.mesh.position.clone()
		let multiVect = null;
		let endPos = null;

		for (let i = interSec.length - 1; i >= 0; i--) {
			if (interSec[i].object.name === "wall") {
				closestWall = interSec[i]
			}
		}

		if (closestWall.distance > 1.5) {
			multiVect = directionVect.clone().multiplyScalar(2);
			endPos = this.mesh.position.clone().add(multiVect)

		} else if (closestWall.distance <= 1.5) {
			multiVect = directionVect.clone();
			endPos = this.mesh.position.clone().add(multiVect)

		} else if (closestWall.distance <= 0.5) {
			endPos = this.mesh.position.clone()
		}

		let laser = new Laser(this.scene, startPos, endPos)
		laser.generate();
		this.lasers.push(laser)

		setTimeout(() => {
			this.scene.remove(this.mesh)
			for (let i = 0; i < this.lasers.length; i++) {
				this.scene.remove(this.lasers[i].points)
			}
		}, 500);

		if (this.playerDestroyed) {
			return this.playerToDestroy;
		}
	}

	// renderFlames(interSec, directionVect) {
	// }
}