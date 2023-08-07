const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);

describe("/ endpoint", () => {
  it("Should return 'Hello World!!'", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello World!!");
  });
});
