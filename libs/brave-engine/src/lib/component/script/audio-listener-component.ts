import { Subscription } from 'rxjs';
import { ScriptComponent } from './script-component';
import { AudioSystem } from '../../static/audio-system';
import { Entity } from '../../entity/entity';

export class AudioListenerComponent extends ScriptComponent {

  protected transformSubscription: Subscription;
  protected hasChanges = false;

  constructor(entity: Entity, id?: string) {
    super(entity, id);
    this.updateOrientation();
  }

  onStart() {
    this.listenTransformChanges();
    this.updateOrientation();
  }

  onUpdate() {
    if (this.hasChanges) {
      this.hasChanges = false;
      this.updateOrientation();
    }
  }

  onDestroy() {
    this.transformSubscription?.unsubscribe();
  }

  protected updateOrientation() {
    AudioSystem.setListenerOrientation(this.entity.transform);
  }

  protected listenTransformChanges() {
    this.transformSubscription?.unsubscribe();
    this.transformSubscription = this.entity.transform.onChange.subscribe(() => {
      this.hasChanges = true;
    });
  }
}