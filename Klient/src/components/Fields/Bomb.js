import {
	IcosahedronGeometry,
	MeshBasicMaterial,
	Mesh,
	Vector3,
} from "three";

export default class Bomb {
	constructor(scene, player) {
		this.scene = scene;
		// Player, who spawned the bomb
		this.player = player
		// Additional calibration may be required
		this.playerPosition = new Vector3(this.player.x, 0.5, this.player.z)

		// Bomb parameters
		this.blastRadius = 2 // Basic value, unless powerups added
		this.primeTime = 3 // Seconds before explosion

		this.geometry = new IcosahedronGeometry(0.5, 1);
		this.material = new MeshBasicMaterial({
			color: 0x000000
		});

		this.mesh = new Mesh(this.geometry, this.material);
		this.mesh.position.set(this.playerPosition);

		this.scene.add(this.mesh)
	}

	ignite() {
		// bomb grows during this time
		this.mesh.scale += 0.01;
	}

	explode() {
		// Disappear the bomb
		this.scene.remove(this.mesh)

		// Search for destructable walls 
		//// destroy the closest one (in blast radius) in each direction
		// Render rays of fire 
		//// Shwo them only on free fields or in place of destroyed walls
		// Search for enemy player or enemy player's position
		// Bomb blast doesn't destroy solid walls
	}
}