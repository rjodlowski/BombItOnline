import {
	TextureLoader, 
	MeshPhongMaterial, 
	Mesh,
	AxesHelper,
	BoxGeometry,
	MeshBasicMaterial,
} from "three";
import { MD2Loader } from './MD2Loader';
import Animation from "./Animation"
import Player1 from './assets/mm/tris.md2'
import Player2 from './assets/yoshi/tris.md2'
import freak from "./assets/mm/freak.jpg"
import yoshi from "./assets/yoshi/yoshi.jpg"

export default class Player {

	constructor(scene, playerData, manager) {
		this.scene = scene;
		this.playerData = playerData
		this.name = "player";
		this.manager = manager
		
		if (this.playerData.playerType == "first") {
			this.jpg = freak
			this.path = Player1
		}else{
			this.jpg = yoshi
			this.path = Player2
		}
		this.player = this.load(this.path)
	}
	load(path) {
        // Manager przekazany do loadera, pozwala na określenie czy model już się załadował, w klasie Main

        new MD2Loader(this.manager).load(
            path,
            geometry => {

                this.geometry = geometry;

                this.model = new Mesh(geometry, new MeshPhongMaterial({
                    map: new TextureLoader().load(this.jpg), // dowolny plik png, jpg
                    morphTargets: true // animowanie materiału modelu
				}))
				this.mesh = new Mesh(new BoxGeometry(0.5, 0.5, 0.5), new MeshBasicMaterial({
					transparent:true,
					opacity: 0,
				}))

				this.model.scale.set(0.015, 0.015, 0.015)
				this.model.rotation.y -= 90
				this.mesh.position.set(
					this.playerData.x + 0.5,
					this.playerData.y + 0.5,
					this.playerData.z + 0.5
				)
				
				this.mesh.playerType = this.playerData.playerType;

				

				this.mesh.add(this.model)
                this.scene.add(this.mesh);
                console.log(this.geometry.animations) // tu powinny być widoczne animacje

            },

        );

    }
}