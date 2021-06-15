import {
	IcosahedronGeometry,
	MeshBasicMaterial,
	Mesh,
	Vector3,
	Raycaster,
	Ray,
	AxesHelper,
} from "three";

export default class Bomb {
	constructor(scene, id, bombPosition) {
		this.scene = scene;
		this.bombPosition = bombPosition
		this.id = id
		this.primeTime = 550 // Time before explosion
		this.timePrimed = 0; // Time passed while growing
		this.destructableObjects = [
			"player",
			"obstacle"
		];

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

		// Bomb disappearance
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
		this.scene.remove(this.mesh)

		// Neighboring blocks and players destruction
		this.deleteNeighbors(new Vector3(0, 0, -1))
		this.deleteNeighbors(new Vector3(0, 0, 1))
		this.deleteNeighbors(new Vector3(-1, 0, 0))
		this.deleteNeighbors(new Vector3(1, 0, 0))
	}

	deleteNeighbors(directionVect) {
		this.raycaster = new Raycaster()
		this.raycaster.ray = new Ray(this.mesh.position, directionVect)

		console.log("Intersects:");
		let interSec = this.raycaster.intersectObjects(this.scene.children);
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
									console.log(obj.playerType);

									// $.ajax({
									// 	method: "GET",
									// 	url: "http://localhost:5000/destroyPlayer",
									// 	contentType: "json",
									// 	data: {
									// 		name: obj.playerType,
									// 		x: obj.position.x - 0.5,
									// 		z: obj.position.z - 0.5,
									// 	}
									// }).done((data) => {
									// 	console.log(data);
									// 	if (data != "No player to delete") {

									// 	}
									// 	// End game 
									// 	// Determine winnig player - alert?
									// 	// Stop game refresh interval
									// })
									break;

								default:
									break;
							}
							this.scene.remove(obj);
							sthDestroyed = false;

							// Display fire / lasers
						}
					}
					previousObject = obj;
				}

			}
		}

		// Generating flames (for 1 sec?)

		// Render rays of fire 
		//// Show them only on free fields or in place of destroyed walls

	}
}