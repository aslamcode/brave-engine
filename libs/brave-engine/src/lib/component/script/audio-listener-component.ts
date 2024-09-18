import { Subscription } from 'rxjs';
import { ScriptComponent } from './script-component';
import { AudioSystem } from '../../static/audio-system';

export class AudioListenerComponent extends ScriptComponent {

  protected transformSubscription: Subscription;
  protected hasChanges = false;

  onStart() {
    this.listenTransformChanges();
  }

  onUpdate() {
    if (this.hasChanges) {
      this.hasChanges = false;
      this.updateListener();
    }
  }

  onDestroy() {
    this.transformSubscription?.unsubscribe();
  }

  updateListener() {
    AudioSystem.setListenerPosition(this.entity.transform.position);
  }

  protected listenTransformChanges() {
    this.transformSubscription?.unsubscribe();
    this.transformSubscription = this.entity.transform.onChange.subscribe(() => {
      this.hasChanges = true;
    });
  }
}