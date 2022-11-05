import { Cpf } from "../../src/domain/entities/Cpf";

const validCpfs = ["152.423.120-76", "789.093.640-09", "026.459.590-40"];
test.each(validCpfs)(
  "Deve validar o CPF válido que tem dígito maior que zero",
  (validCpf) => {
    const cpf = new Cpf(validCpf);
    expect(cpf).toBeDefined();
  }
);

test("Deve tentar validar o CPF com mais de 14 caracteres", () => {
  expect(() => new Cpf("026.459.590-400")).toThrow(new Error("Invalid CPF"));
});

test("Deve tentar validar o CPF vazio", () => {
  expect(() => new Cpf("")).toThrow(new Error("Invalid CPF"));
});

const cpfsWithSameDigits = [
  "000.000.000-00",
  "111.111.111-11",
  "222.222.222-22",
  "333.333.333-33",
  "444.444.444-44",
];
test.each(cpfsWithSameDigits)(
  "Deve tentar validar um CPF com todos os dígitos iguais",
  (cpf) => {
    expect(() => new Cpf(cpf)).toThrow(new Error("Invalid CPF"));
  }
);
