import { createItem } from "./Item";

describe("Item", () => {
  describe("createItem()", () => {
    it("creates an item", () => {
      const item = createItem();
      expect(item).toEqual({ id: "", name: "" });
    });
  });
});
