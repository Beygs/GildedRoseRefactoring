import ConjuredItem from "../../src/items/conjured";
import DecreasingQualityItem from "../../src/items/decreasing_quality";

describe("ConjuredItem class", () => {
  let randomItem,
  name,
  randomSellIn,
  randomQuality;
  
  beforeEach(() => {
    name = "foo";
    randomSellIn = Math.floor(Math.random() * 10 + 1);
    randomQuality = Math.floor(Math.random() * 10 + 2);
    
    randomItem = new ConjuredItem(name, { sellIn: randomSellIn, quality: randomQuality });
  });

  it("should extend DecreasingQualityItem", () => {
    expect(randomItem instanceof DecreasingQualityItem).toBeTruthy();
    expect(randomItem instanceof ConjuredItem).toBeTruthy();
    expect(randomItem.name).toBe("Conjured foo");
    expect(randomItem.sellIn).toBe(randomSellIn);
    expect(randomItem.quality).toBe(randomQuality);
  });

  it("should have a name, a sellIn & a quality", () => {
    expect(() => new ConjuredItem()).toThrow();
    expect(() => new ConjuredItem("bad")).toThrow();
    expect(() => new ConjuredItem({ quality: 4, sellIn: 2 })).toThrow();
    expect(() => new ConjuredItem("bad", { quality: 3 })).toThrow();
    expect(() => new ConjuredItem("bad", { sellIn: 2 })).toThrow();
  });

  it("should have an updateQuality method", () => {
    expect(randomItem.updateQuality).toBeDefined();
    expect(typeof randomItem.updateQuality).toBe("function");
  });
  
  it("should be initiated with a quality between 0 & 50", () => {
    expect(() => new ConjuredItem("foo", { sellIn: 2, quality: 2 })).not.toThrow();
    expect(() => new ConjuredItem("foo", { sellIn: 2, quality: 60 })).toThrow("The item's quality should be between 0 and 50");
    expect(() => new ConjuredItem("foo", { sellIn: -5, quality: -2 })).toThrow("The item's quality should be between 0 and 50");
  });

  it("should decrease quality & sellIn when updateQuality is called", () => {
    const item = new ConjuredItem("foo", { sellIn: 5, quality: 5 });

    item.updateQuality();
    expect(item.quality).toBe(3);
    expect(item.sellIn).toBe(4);

    randomItem.updateQuality();
    expect(randomItem.quality).toBe(randomQuality - 2);
    expect(randomItem.sellIn).toBe(randomSellIn - 1);
  });

  it("should decrease quality by 4 when sellIn < 0", () => {
    const item = new ConjuredItem("foo", { sellIn: 1, quality: 10 });

    item.updateQuality();
    expect(item.quality).toBe(8);
    expect(item.sellIn).toBe(0);

    item.updateQuality();
    expect(item.quality).toBe(4);
    expect(item.sellIn).toBe(-1);

    const item2 = new ConjuredItem("bar", { sellIn: -3, quality: 10 });

    expect(item2.updateQuality().quality).toBe(6);
  });

  it("should not have a quality below 0", () => {
    const item = new ConjuredItem("foo", { sellIn: 1, quality: 1 });
    const targetItem = new ConjuredItem("foo", { sellIn: -1, quality: 0 });

    item.updateQuality().updateQuality();
    expect(item).toEqual(targetItem);

    item.updateQuality();
    expect(item).toEqual({ ...targetItem, sellIn: -2 });

    for (let i = 0; i < 15; i++) {
      randomItem.updateQuality();
    }

    expect(randomItem.quality).toBe(0);
  });
});
