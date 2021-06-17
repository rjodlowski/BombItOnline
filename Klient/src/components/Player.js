import {
	TextureLoader,
	Mesh,
	BoxGeometry,
	MeshBasicMaterial,
} from "three";
import { MD2Loader } from './MD2Loader';
import Player1 from './assets/mm/tris.md2'
import Player2 from './assets/yoshi/tris.md2'
import freak from "./assets/mm/freak.jpg"
import yoshi from "./assets/yoshi/yoshi.jpg"

export default class Player {

	constructor(scene, playerData, manager) {
		this.scene = scene;
		this.playerData = playerData
		this.manager = manager

		if (this.playerData.playerType == "first") {
			this.jpg = freak
			this.path = Player1
		} else {
			this.jpg = yoshi
			this.path = Player2
		}

		this.player = this.load(this.path)
	}
	load(path) {

		new MD2Loader(this.manager).load(
			path,
			geometry => {
				this.geometry = geometry;

				this.model = new Mesh(geometry, new MeshBasicMaterial({
					map: new TextureLoader().load(this.jpg),
					morphTargets: true
				}))
				this.mesh = new Mesh(new BoxGeometry(0.5, 0.5, 0.5), new MeshBasicMaterial({
					transparent: true,
					opacity: 0,
				}))

				this.model.scale.set(0.017, 0.017, 0.017)
				this.model.rotation.y -= 90
				this.mesh.position.set(
					this.playerData.x + 0.5,
					this.playerData.y + 0.5,
					this.playerData.z + 0.5
				)

				if (this.playerData.playerType == "second") {
					this.mesh.lookAt(
						this.playerData.x,
						this.playerData.y,
						this.playerData.z - 10
					)
				}

				this.mesh.playerType = this.playerData.playerType;
				this.mesh.name = "player";

				this.mesh.add(this.model)
				this.scene.add(this.mesh);
			},
		);
	}
}