import Item from "../../src/item";
import IncreasingQualityItem from "../../src/items/increasing_quality";

describe("IncreasingQualityItem class", () => {
  let bigSellInItem,
  mediumSellInItem,
  smallSellInItem,
  randomQuality;
  
  beforeEach(() => {
    randomQuality = Math.floor(Math.random() * 10 + 1);
    
    bigSellInItem = new IncreasingQualityItem("foo", { sellIn: 12, quality: randomQuality });
    mediumSellInItem = new IncreasingQualityItem("bar", { sellIn: 7, quality: randomQuality });
    smallSellInItem = new IncreasingQualityItem("baz", { sellIn: 2, quality: randomQuality });
  });

  it("should extend Item", () => {
    expect(bigSellInItem instanceof Item).toBeTruthy();
    expect(bigSellInItem instanceof IncreasingQualityItem).toBeTruthy();
    expect(bigSellInItem.name).toBe("foo");
    expect(bigSellInItem.sellIn).toBe(12);
    expect(bigSellInItem.quality).toBe(randomQuality);
  });

  it("should have a name, a sellIn & a quality", () => {
    expect(() => new IncreasingQualityItem()).toThrow();
    expect(() => new IncreasingQualityItem("bad")).toThrow();
    expect(() => new IncreasingQualityItem({ quality: 4, sellIn: 2 })).toThrow();
    expect(() => new IncreasingQualityItem("bad", { quality: 3 })).toThrow();
    expect(() => new IncreasingQualityItem("bad", { sellIn: 2 })).toThrow();
  });

  it("should have an updateQuality method", () => {
    expect(bigSellInItem.updateQuality).toBeDefined();
    expect(typeof bigSellInItem.updateQuality).toBe("function");
  });
  
  it("should be initiated with a quality between 0 & 50", () => {
    expect(() => new IncreasingQualityItem("foo", { sellIn: 2, quality: 2 })).not.toThrow();
    expect(() => new IncreasingQualityItem("foo", { sellIn: 2, quality: 60 })).toThrow("The item's quality should be between 0 and 50");
    expect(() => new IncreasingQualityItem("foo", { sellIn: -5, quality: -2 })).toThrow("The item's quality should be between 0 and 50");
  });

  it("should increase quality by 1 on update if sellIn > 10", () => {
    bigSellInItem.updateQuality();
    expect(bigSellInItem.quality).toBe(randomQuality + 1);
    expect(bigSellInItem.sellIn).toBe(11);
  });

  it("should increase quality by 2 on update if sellIn <= 10", () => {
    mediumSellInItem.updateQuality();
    expect(mediumSellInItem.quality).toBe(randomQuality + 2);
    expect(mediumSellInItem.sellIn).toBe(6);

    bigSellInItem.updateQuality().updateQuality();
    expect(bigSellInItem.quality).toBe(randomQuality + 3);
    expect(bigSellInItem.sellIn).toBe(10);
  });

  it("should increase quality by 3 on update if sellIn <= 5", () => {
    smallSellInItem.updateQuality();
    expect(smallSellInItem.quality).toBe(randomQuality + 3);
    expect(smallSellInItem.sellIn).toBe(1);

    smallSellInItem.updateQuality();
    expect(smallSellInItem.quality).toBe(randomQuality + 6);
    expect(smallSellInItem.sellIn).toBe(0);

    mediumSellInItem.updateQuality().updateQuality();
    expect(mediumSellInItem.quality).toBe(randomQuality + 5);
    expect(mediumSellInItem.sellIn).toBe(5);
  });

  it("should not have a quality that exceeds 50", () => {
    const item = new IncreasingQualityItem("foo", { sellIn: 3, quality: 48 });

    item.updateQuality();
    expect(item.quality).toBe(50);

    item.updateQuality();
    expect(item.quality).toBe(50);
  });

  it("should have a quality that continues increasing after sellIn", () => {
    smallSellInItem.updateQuality().updateQuality().updateQuality();
    expect(smallSellInItem.quality).toBe(randomQuality + 9);
    expect(smallSellInItem.sellIn).toBe(-1);

    smallSellInItem.updateQuality();
    expect(smallSellInItem.quality).toBe(randomQuality + 12);
    expect(smallSellInItem.sellIn).toBe(-2);
  });

  it("should have a quality of 0 if expirable is set to true & sellIn <= 0", () => {
    const expirableItem = new IncreasingQualityItem("foo", { sellIn: 1, quality: 40, expirable: true });
    
    expirableItem.updateQuality();
    expect(expirableItem.quality).toBe(43);
    expect(expirableItem.sellIn).toBe(0);

    expirableItem.updateQuality();
    expect(expirableItem.quality).toBe(0);
    expect(expirableItem.sellIn).toBe(-1);

    const expirableItem2 = new IncreasingQualityItem("bar", { sellIn: 2, quality: 50, expirable: true });

    expirableItem2.updateQuality();
    expect(expirableItem2.quality).toBe(50);
    expect(expirableItem2.sellIn).toBe(1);

    expirableItem2.updateQuality().updateQuality()
    expect(expirableItem2.quality).toBe(0);
    expect(expirableItem2.sellIn).toBe(-1);
  })
});
