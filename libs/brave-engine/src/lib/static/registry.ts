export class Registry {

  private static registry = new Map<string, any>();

  static register(data: any, id?: string) {
    id = id || crypto.randomUUID();
    Registry.registry.set(id, data);
    return id;
  }

  static unregister(id: string) {
    Registry.registry.delete(id);
  }

  static get(id: string) {
    return Registry.registry.get(id);
  }

}