import { SceneComponent } from './SceneComponent';
import{  AnimationAction, AnimationClip, AnimationMixer } from 'three';

type Inputs = {
   object: any,
   clip: string,
   animationSpeed: number
};
  
class Animator extends SceneComponent{

  inputs: Inputs = {
    object: null,
    clip: null,
    animationSpeed: .02
  }

  private mixer: AnimationMixer;
  private clipAction: AnimationAction;

  onInit(){
    if(!this.inputs.object) return;
    this.setModelAnimation(this.inputs.object, '');
  }

  onInputsUpdated(oldInputs){
    if(!this.inputs.object) return;
    if(oldInputs.clip != this.inputs.clip || !this.mixer){
      this.setModelAnimation(this.inputs.object, this.inputs.clip);
    }
  }

  onTick(tickDelta: number){
    if(this.mixer)
      this.mixer.update(this.inputs.animationSpeed);
  }

  onDestroy(){}

  private setModelAnimation(object: any, clipName: string){
    this.mixer = new AnimationMixer(object);
    this.clipAction = this.mixer.clipAction(AnimationClip.findByName(this.findAnimations(object), clipName));
    this.clipAction.play();
  }

  private findAnimations(object: any){
    const animations = new Array<AnimationClip>();
    object.traverse(obj => {
      if(obj.animations){
        obj.animations.forEach(anim => animations.push(anim));
      }
    });
    return animations;
  }

}

export const AnimatorType = 'mp.animator';

export function makeAnimator(){
    return new Animator();
}