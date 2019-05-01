var agedBrie = 'Aged Brie';
var sulfuras = 'Sulfuras, Hand of Ragnaros';
var backstagePass = 'Backstage passes to a TAFKAL80ETC concert';

function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;

  this.getOld = function() {
    this.sell_in--;
  }

  this.increaseQuality = function(val = 1) {
    if (this.quality < 50) this.quality += val;
  }

  this.decreaseQuality = function(val = 1) {
    if (this.quality > 0) this.quality -= val;
  }
}

var items = [];

function update_quality() {
  for (var i = 0; i < items.length; i++) {
    // TODO: Make subclass inherit Item class
    if (items[i].name === agedBrie) {
      items[i].getOld();
      items[i].increaseQuality();
    } else if (items[i].name === sulfuras) {
    } else if (items[i].name === backstagePass) {
      items[i].getOld();
      if (items[i].sell_in >= 10) {
        items[i].increaseQuality(1);
      } else if (items[i].sell_in < 10 && items[i].sell_in >= 5) {
        items[i].increaseQuality(2);
      } else if (items[i].sell_in < 5 && items[i].sell_in >= 0) {
        items[i].increaseQuality(3);
      } else {
        items[i].quality = 0;
      }
    } else {
      items[i].getOld();
      if (items[i].sell_in >= 0) {
        items[i].decreaseQuality(1);
      } else {
        items[i].decreaseQuality(2);
      }
    }
  }
}
