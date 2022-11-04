export class JsonTransformer<T> {
  to(data: T): string {
    return JSON.stringify(data);
  }

  from(data: string): T {
    return JSON.parse(data);
  }
}
