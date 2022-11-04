export class OrderCode {
  private value: string;

  constructor(private readonly date: Date, private readonly sequence: number) {
    this.value = this.generate(date, sequence);
  }

  private generate(date: Date, sequence: number) {
    const year = date.getFullYear();
    return `${year}${sequence.toString().padStart(8, "0")}`;
  }

  getCode() {
    return this.value;
  }
}
