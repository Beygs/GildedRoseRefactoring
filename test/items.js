import ConjuredItem from "../src/items/conjured.js";
import DecreasingQualityItem from "../src/items/decreasing_quality.js";
import IncreasingQualityItem from "../src/items/increasing_quality.js";
import LegendaryItem from "../src/items/legendary.js";

export const items = Object.freeze([
  new DecreasingQualityItem("+5 Dexterity Vest", { sellIn: 10, quality: 20 }),
  new IncreasingQualityItem("Aged Brie", { sellIn: 2, quality: 0 }),
  new DecreasingQualityItem("Elixir of the Mongoose", { sellIn: 5, quality: 7 }),

  new LegendaryItem("Sulfuras, Hand of Ragnaros", { sellIn: 0, quality: 80 }),
  new LegendaryItem("Sulfuras, Hand of Ragnaros", { sellIn: -1, quality: 80 }),
  
  new IncreasingQualityItem("Backstage passes to a TAFKAL80ETC concert", { sellIn: 15, quality: 20, expirable: true }),
  new IncreasingQualityItem("Backstage passes to a TAFKAL80ETC concert", { sellIn: 10, quality: 49, expirable: true }),
  new IncreasingQualityItem("Backstage passes to a TAFKAL80ETC concert", { sellIn: 5, quality: 49, expirable: true }),

  new ConjuredItem("Conjured Mana Cake", { sellIn: 3, quality: 6 }),
]);
