export class Invoke {

  private static timeoutRefs: number[] = [];
  private static intervalRefs: number[] = [];

  static setTimeout(callback: () => void, ms?: number) {
    const id = setTimeout(callback, ms) as any as number;
    this.timeoutRefs.push(id);
    return id;
  }

  static clearTimeout(id: number) {
    return clearTimeout(id);
  }

  static setInterval(callback: () => void, ms?: number) {
    const id = setInterval(callback, ms) as any as number;
    this.intervalRefs.push(id);
    return id;
  }

  static clearInterval(id: number) {
    return clearInterval(id);
  }

  static cancelAllInvokes() {
    this.timeoutRefs.forEach(id => clearTimeout(id));
    this.intervalRefs.forEach(id => this.clearInterval(id));
    this.timeoutRefs = [];
    this.intervalRefs = [];
  }

}