import { AudioListenerComponent, Entity } from '@brave/brave-engine';

export class EditorAudioListener extends AudioListenerComponent {

  constructor(entity: Entity, id?: string) {
    super(entity, id);
    this.listenTransformChanges();
  }

  override onStart() { }
  override onUpdate() { }
  override onDestroy() { }

  onRenderUpdate() {
    if (this.activeInHierarchy && this.hasChanges) {
      this.hasChanges = false;
      this.updateListener();
    }
  }

}