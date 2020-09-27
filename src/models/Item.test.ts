import { FirestoreEmu, prepareFirestore } from "../tests/firestoreTests";
import { describeIfEmu } from "../tests/util";
import { createItem, Item } from "./Item";

describe("Item", () => {
  describe("createItem()", () => {
    it("creates an item", () => {
      const item = createItem();
      expect(item).toEqual({ id: "", name: "", userId: "" });
    });
  });

  describeIfEmu("rules", () => {
    let fs: FirestoreEmu;

    describe("user", () => {
      beforeEach(async () => {
        fs = prepareFirestore("user-1");

        await createItemDoc(fs, {
          id: "own-item-1",
          name: "Own item",
          userId: "user-1",
        });
      });

      afterEach(() => {
        fs.cleanUp();
      });

      it("can read to own item", async () => {
        const doc = fs.collection("items").doc("own-item-1");
        const ss = await doc.get();
        expect(ss.data()?.name).toBe("Own item");
      });
    });
  });
});

async function createItemDoc(fs: FirestoreEmu, initial: Partial<Item>) {
  if (!initial.id) {
    throw new Error("ID is required to test");
  }

  const doc = fs.admin.collection("items").doc(initial.id);
  await doc.set(initial);
  return doc;
}
