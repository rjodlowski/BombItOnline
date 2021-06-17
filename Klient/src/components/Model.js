import { MD2Loader } from './MD2Loader';
import { Mesh, TextureLoader, MeshPhongMaterial } from "three"
import freak from "./assets/mm/freak.jpg"
import yoshi from "./assets/yoshi/yoshi.jpg"


export default class Model {
    constructor(scene, manager, type) {
        this.scene = scene;
        this.mesh = null;
        this.manager = manager;
        this.geometry = null
        this.type = type
        this.jpg = null
    }

    load(path) {
        if (this.type == "first") {
            this.jpg = freak
        }else{
            this.jpg = yoshi
        }
        // Manager przekazany do loadera, pozwala na określenie czy model już się załadował, w klasie Main

        new MD2Loader(this.manager).load(
            path,
            geometry => {

                this.geometry = geometry;

                this.mesh = new Mesh(geometry, new MeshPhongMaterial({
                    map: new TextureLoader().load(this.jpg), // dowolny plik png, jpg
                    morphTargets: true // animowanie materiału modelu
                }))
                this.mesh.scale.set(0.2, 0.2, 0.2)

                this.player.add(this.mesh);
                console.log(this.geometry.animations) // tu powinny być widoczne animacje

            },

        );

    }

    unload() {
        this.scene.remove(this.mesh); // ew funkcja do usunięcia modelu ze sceny
    }
}