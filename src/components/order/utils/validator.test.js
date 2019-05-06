import { name } from "./validator.js";

test("Validates name field in delivery form", () => {
  expect(name("Tino")).toBeNull();
  // .toBe(Error("The name must not be empty."));
});

test("Validates phone no. field in delivery form", () => {
  expect(name("+27839480104")).toBeNull();
});
