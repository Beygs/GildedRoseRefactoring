import Shop from "../src/gilded_rose";
import { items } from "./items";

describe("Store class", () => {
  let shop, itemsCopy;

  beforeEach(() => {
    itemsCopy = JSON.parse(JSON.stringify(items));
    shop = new Shop(items);
  });

  it("should create a Shop", () => {
    expect(() => new Shop()).not.toThrow();

    expect(shop.items).toContainEqual(items[0]);
  });

  it("should update all the items when nextDay() is called", () => {
    shop.nextDay();

    expect(shop.items[0].quality).toBe(itemsCopy[0].quality - 1);
    expect(shop.items[0].sellIn).toBe(itemsCopy[0].sellIn - 1);

    shop.nextDay().nextDay().nextDay().nextDay();

    expect(shop.items[0].sellIn).toBe(itemsCopy[0].sellIn - 5);
  });
});
