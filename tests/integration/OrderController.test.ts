import axios from "axios";

test("Deve testar o preview pela API", async () => {
  const input = {
    cpf: "152.423.120-76",
    orderItems: [
      {
        idItem: 1,
        quantity: 1,
      },
      {
        idItem: 2,
        quantity: 3,
      },
      {
        idItem: 3,
        quantity: 2,
      },
    ],
  };
  const response = await axios.post("http://localhost:3333/preview", input);
  const preview = response.data;
  expect(preview.total).toBe(165);
});

test("Deve testar o preview com desconto pela API", async () => {
  const input = {
    cpf: "152.423.120-76",
    orderItems: [
      {
        idItem: 1,
        quantity: 1,
      },
      {
        idItem: 2,
        quantity: 3,
      },
      {
        idItem: 3,
        quantity: 2,
      },
    ],
    coupon: "VALE20",
  };
  const response = await axios.post("http://localhost:3333/preview", input);
  const preview = response.data;
  expect(preview.total).toBe(134);
});

test("Deve testar o simulateFreight pela API", async () => {
  const input = {
    orderItems: [
      {
        idItem: 1,
        quantity: 1,
      },
    ],
  };
  const response = await axios.post(
    "http://localhost:3333/simulateFreight",
    input
  );
  const freight = response.data;
  expect(freight).toBe(10);
});
