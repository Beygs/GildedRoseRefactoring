class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export const validateQuality = (self) => {
  if (self.quality === undefined || self.sellIn === undefined) {
    throw new Error(`Every non legendary item should have a quality and a sellIn.
Usage: new Item(name: string, { quality: number >= 0 && <= 50, sellIn: number })`);
  }

  if (self.quality < 0 || self.quality > 50) {
    throw new Error("The item's quality should be between 0 and 50");
  }

  return self;
}

export default Item;
