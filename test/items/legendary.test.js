import Item from "../../src/item";
import LegendaryItem from "../../src/items/legendary";

describe("LegendaryItem class", () => {
  let randomItem, randomQuality;

  beforeEach(() => {
    randomQuality = Math.floor(Math.random() * 1000);
    randomItem = new LegendaryItem("foo", { sellIn: 0, quality: randomQuality });
  });

  it("should extend Item", () => {
    expect(randomItem instanceof Item).toBeTruthy();
    expect(randomItem instanceof LegendaryItem).toBeTruthy();
    expect(randomItem.name).toBe("foo");
    expect(randomItem.quality).toBe(randomQuality);
    expect(randomItem.sellIn).toBe(0);
  });

  it("should be initiated with a quality >= 0", () => {
    expect(() => new LegendaryItem("foo", { quality: -4 })).toThrow("Quality must be a positive number");
    expect(() => new LegendaryItem("foo", { quality: 0 })).not.toThrow();
    expect(() => new LegendaryItem("foo", { quality: 70 })).not.toThrow();
  });

  it("should always have the same quality and sellIn after an update", () => {
    expect(randomItem).toEqual(randomItem.updateQuality());
  })
});
