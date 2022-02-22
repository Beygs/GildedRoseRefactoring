import Item, { validateQuality } from "../item";

class IncreasingQualityItem extends Item {
  constructor(name, { sellIn, quality, expirable = false } = {}) {
    super(name, sellIn, quality);
    this.expirable = expirable;
    validateQuality(this);
  }

  updateQuality() {
    this.sellIn--;

    if (this.quality >= 50) return this;

    if (this.sellIn <= 0 && this.expirable) {
      this.quality = 0;
      return this;
    }

    if (this.sellIn <= 5) {
      this.quality = this.quality + 3 <= 50 ? this.quality + 3 : 50;
      return this;
    }

    if (this.sellIn <= 10) {
      this.quality = this.quality + 2 <= 50 ? this.quality + 2 : 50;
      return this;
    }

    this.quality++;
    return this;
  }
}

export default IncreasingQualityItem;
