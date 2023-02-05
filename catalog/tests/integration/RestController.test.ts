import axios from "axios";

test("Deve testar o getItem pela API", async () => {
  const response = await axios.get("http://localhost:3003/items/1");
  const item = response.data;
  expect(item.price).toBe(1000);
});
