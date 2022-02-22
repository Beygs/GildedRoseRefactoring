import Item from "../src/item";

describe("Item class", () => {
  it("should create an item", () => {
    const item = new Item("foo", 0, 0);
    expect(item.name).toBe("foo");
    expect(item.sellIn).toBe(0);
    expect(item.quality).toBe(0);
  });
});
