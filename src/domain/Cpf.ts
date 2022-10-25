export class Cpf {
  constructor(readonly value: string) {
    if (!this.validate(value)) throw new Error('Invalid CPF');
  }

  private validate(cpf: string) {
    if (!cpf) return false;
    cpf = this.cleanCpf(cpf);
    if (!this.isValidLength(cpf)) return false;
    if (this.hasAllDigitsEqual(cpf)) return false;
    const dg1 = this.calculateDigit(cpf, 10);
    const dg2 = this.calculateDigit(cpf, 11);
    const checkDigit = this.extractDigit(cpf);
    const calculatedDigit = `${dg1}${dg2}`;
    return checkDigit === calculatedDigit;
  }

  private cleanCpf(cpf: string) {
    return cpf.replace(/\D/g, '');
  }

  private isValidLength(cpf: string) {
    return cpf.length === 11;
  }

  private hasAllDigitsEqual(cpf: string) {
    const [firstDigit] = cpf;
    return cpf.split('').every((digit) => digit === firstDigit);
  }

  private calculateDigit(cpf: string, factor: number) {
    let total = 0;
    for (const digit of cpf) {
      if (factor > 1) total += parseInt(digit) * factor--;
    }
    const rest = total % 11;
    return rest < 2 ? 0 : 11 - rest;
  }

  private extractDigit(cpf: string) {
    return cpf.slice(9);
  }
}
