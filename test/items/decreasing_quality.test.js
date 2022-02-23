import Item from "../../src/item";
import DecreasingQualityItem from "../../src/items/decreasing_quality";

describe("DecreasingQualityItem class", () => {
  let randomItem,
  name,
  randomSellIn,
  randomQuality;
  
  beforeEach(() => {
    name = "foo";
    randomSellIn = Math.floor(Math.random() * 10 + 1);
    randomQuality = Math.floor(Math.random() * 10 + 1);
    
    randomItem = new DecreasingQualityItem(name, { sellIn: randomSellIn, quality: randomQuality });
  });

  it("should extend Item", () => {
    expect(randomItem instanceof Item).toBeTruthy();
    expect(randomItem instanceof DecreasingQualityItem).toBeTruthy();
    expect(randomItem.name).toBe("foo");
    expect(randomItem.sellIn).toBe(randomSellIn);
    expect(randomItem.quality).toBe(randomQuality);
  });

  it("should have a name, a sellIn & a quality", () => {
    expect(() => new DecreasingQualityItem()).toThrow();
    expect(() => new DecreasingQualityItem("bad")).toThrow();
    expect(() => new DecreasingQualityItem({ quality: 4, sellIn: 2 })).toThrow();
    expect(() => new DecreasingQualityItem("bad", { quality: 3 })).toThrow();
    expect(() => new DecreasingQualityItem("bad", { sellIn: 2 })).toThrow();
  });

  it("should have an updateQuality method", () => {
    expect(randomItem.updateQuality).toBeDefined();
    expect(typeof randomItem.updateQuality).toBe("function");
  });
  
  it("should be initiated with a quality between 0 & 50", () => {
    expect(() => new DecreasingQualityItem("foo", { sellIn: 2, quality: 2 })).not.toThrow();
    expect(() => new DecreasingQualityItem("foo", { sellIn: 2, quality: 60 })).toThrow("The item's quality should be between 0 and 50");
    expect(() => new DecreasingQualityItem("foo", { sellIn: -5, quality: -2 })).toThrow("The item's quality should be between 0 and 50");
  });

  it("should decrease quality & sellIn when updateQuality is called", () => {
    const item = new DecreasingQualityItem("foo", { sellIn: 5, quality: 5 });

    item.updateQuality();
    expect(item.quality).toBe(4);
    expect(item.sellIn).toBe(4);

    randomItem.updateQuality();
    expect(randomItem.quality).toBe(randomQuality - 1);
    expect(randomItem.sellIn).toBe(randomSellIn - 1);
  });

  it("should decrease quality by 2 when sellIn < 0", () => {
    const item = new DecreasingQualityItem("foo", { sellIn: 1, quality: 10 });

    item.updateQuality();
    expect(item.quality).toBe(9);
    expect(item.sellIn).toBe(0);

    item.updateQuality();
    expect(item.quality).toBe(7);
    expect(item.sellIn).toBe(-1);

    const item2 = new DecreasingQualityItem("bar", { sellIn: -3, quality: 10 });

    expect(item2.updateQuality().quality).toBe(8);
  });

  it("should not have a quality below 0", () => {
    const item = new DecreasingQualityItem("foo", { sellIn: 1, quality: 1 });
    const targetItem = new DecreasingQualityItem("foo", { sellIn: -1, quality: 0 });

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
