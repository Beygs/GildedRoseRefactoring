class Shop {
  constructor(items=[]){
    this.items = items;
  }

  nextDay() {
    this.items.forEach((item) => {
      item.updateQuality();
    });

    return this;
  }
}

export default Shop;
