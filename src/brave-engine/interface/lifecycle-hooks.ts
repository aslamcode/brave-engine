export interface LifecycleHooks {
  onStart(): void;
  onUpdate(): void;
  onFixedUpdate(): void;
  onDestroy(): void;
}