export interface LifecycleHooks {
  onStart?(): void;
  onUpdate?(): void;
  onRenderUpdate?(): void;
  onFixedUpdate?(): void;
  onDestroy?(): void;
}