const { User } = require("../models/user");

describe("User model", () => {
  test("email must be unique", async () => {
    expect.assertions(1);

    try {
      await User.init(); // wait for index to build
      await User.create([
        {
          email: "email4@gmail.com"
        },
        {
          email: "email4@gmail.com"
        }
      ]);
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
  test("email must be required", async () => {
    expect.assertions(1);

    try {
      await User.create({});
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });

  test("should have correct fields", async () => {
    // const now = Date.now();
    const { createdAt, updatedAt, _id, __v, ...user } = (await User.create({
      email: "tg@gmail.com",
      name: "Karolis",
      watched: [],
      watchLater: []
    })).toObject();

    expect(user).toEqual({
      email: "tg@gmail.com",
      name: "Karolis",
      watched: [],
      watchLater: []
    });
  });
});
