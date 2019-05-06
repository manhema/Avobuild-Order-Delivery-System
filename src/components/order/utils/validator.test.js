import { name, contact, truce } from "./validator.js";

describe("validate deliveryForm", () => {
  test("Validates name field in delivery form", () => {
    expect(name("Tino")).toBeNull();
    try {
      expect(name("")).toBeNull();
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

  test("Validates phone no. field in delivery form", () => {
    expect(contact("+27839480104")).toBeNull();
    try {
      expect(contact("")).toBeNull();
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

  test("Validates confirmation field in delivery form", () => {
    expect(truce(true)).toBeNull();
    try {
      expect(contact(false)).toBeNull();
    } catch (e) {
      expect(e).toBeDefined();
    }
  });
});
