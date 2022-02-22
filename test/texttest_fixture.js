
import Shop from "../src/gilded_rose";
import Item from "../src/item";
import DecreasingQualityItem from "../src/items/decreasing_quality";
import IncreasingQualityItem from "../src/items/increasing_quality";
import LegendaryItem from "../src/items/legendary";

const items = [
  new DecreasingQualityItem("+5 Dexterity Vest", 10, 20),
  new IncreasingQualityItem("Aged Brie", 2, 0),
  new DecreasingQualityItem("Elixir of the Mongoose", 5, 7),
  new LegendaryItem("Sulfuras, Hand of Ragnaros", 0, 80),
  new LegendaryItem("Sulfuras, Hand of Ragnaros", -1, 80),
  new IncreasingQualityItem("Backstage passes to a TAFKAL80ETC concert", 15, 20),
  new IncreasingQualityItem("Backstage passes to a TAFKAL80ETC concert", 10, 49),
  new IncreasingQualityItem("Backstage passes to a TAFKAL80ETC concert", 5, 49),

  // This Conjured item does not work properly yet
  new Item("Conjured Mana Cake", 3, 6),
];

const days = Number(process.argv[2]) || 2;
const gildedRose = new Shop(items);

console.log("OMGHAI!");
for (let day = 0; day < days; day++) {
  console.log(`\n-------- day ${day} --------`);
  console.log("name, sellIn, quality");
  items.forEach(item => console.log(`${item.name}, ${item.sellIn}, ${item.quality}`));
  gildedRose.updateQuality();
}
