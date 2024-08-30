export class Registry {

  private static registry = new Map<string, any>();

  static register(data: any, id?: string) {
    id = id || crypto.randomUUID();
    this.registry.set(id, data);
    return id;
  }

  static unregister(id: string) {
    this.registry.delete(id);
  }

  static get(id: string) {
    return this.registry.get(id);
  }

}