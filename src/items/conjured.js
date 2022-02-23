import DecreasingQualityItem from "./decreasing_quality";

class ConjuredItem extends DecreasingQualityItem {
  name = `Conjured ${this.name}`

  updateQuality() {
    this.sellIn--;

    if (this.quality <= 0) return this;

    if (this.sellIn >= 0) {
      this.quality = this.quality - 2 >= 0 ? this.quality - 2 : 0;
      return this;
    }

    this.quality = this.quality - 4 >= 0 ? this.quality - 4 : 0;
    return this;
  }
}

export default ConjuredItem;
