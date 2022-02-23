import Item from "../item.js";

class LegendaryItem extends Item {
  constructor(name, { sellIn, quality } = {}) {
    super(name, sellIn, quality);
    this.positiveQuality();
  }

  updateQuality() {
    return this;
  }

  positiveQuality() {
    if (this.quality < 0) {
      throw new Error("Quality must be a positive number");
    }
  }
}

export default LegendaryItem;
