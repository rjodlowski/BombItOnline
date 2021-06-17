import { AnimationMixer } from 'three';

export default class Animation {
    constructor(mesh) {
        // mesh modelu
        this.mesh = mesh;
        console.log(this.mesh);
        
        // mixer
        this.mixer = new AnimationMixer(this.mesh);

    }

    playAnim(animName) {
        if(animName != this.animName){
            console.log(animName)
            console.log(this.mesh);
            
            this.animName = animName
            this.mixer.uncacheRoot(this.mesh)
            console.log(this.mixer)
            this.mixer.clipAction(this.animName).play()

        }


    }

    // update mixer
    update(delta) {
        if (this.mixer) {
            this.mixer.update(delta);
        }
    }
}
