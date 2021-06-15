import {
	IcosahedronGeometry,
	MeshBasicMaterial,
	Mesh,
	Vector3,
} from "three";

export default class Bomb {
	constructor(scene, id, bombPosition) {
		this.scene = scene;
		this.bombPosition = bombPosition
		this.id = id
		this.primeTime = 550 // Time before explosion
		this.timePrimed = 0; // Time passed while growing
		this.blastRadius = 2 // Basic value, unless powerups added

		this.geometry = new IcosahedronGeometry(0.2, 5);
		this.material = new MeshBasicMaterial({
			color: 0x000000
		});

		this.mesh = new Mesh(this.geometry, this.material);
		this.mesh.position.set(
			this.bombPosition.x + 0.5,
			this.bombPosition.y + 0.5,
			this.bombPosition.z + 0.5);

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

		// Search for destructable walls 
		//// destroy the closest one (in blast radius) in each direction
		// Search for enemy player or enemy player's position
		// Bomb blast doesn't destroy solid walls


		// Generating flames (for 1 sec?)

		// Render rays of fire 
		//// Show them only on free fields or in place of destroyed walls
	}
}