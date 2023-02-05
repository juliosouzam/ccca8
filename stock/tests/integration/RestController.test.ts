import axios from "axios";

test("Deve decrementar o estoque pela API", async () => {
  await axios.delete("http://localhost:3004/clearStocks");
  const input = {
    idItem: 1,
    quantity: 10,
  };
  await axios.post("http://localhost:3004/decrementStock", input);
  const response = await axios.get(
    `http://localhost:3004/stocks/${input.idItem}/total`
  );
  const output = response.data;
  expect(output.total).toBe(-10);
});
