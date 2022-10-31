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
  console.log(preview);
  expect(preview.total).toBe(155);
});
