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

  this.increaseQuality = function() {
    if (this.quality < 50) this.quality++;
  }

  this.decreaseQuality = function() {
    if (this.quality > 0) this.quality--;
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
      if (items[i].sell_in >= 0) {
        items[i].increaseQuality();
        if (items[i].sell_in < 10) items[i].increaseQuality();
        if (items[i].sell_in < 5) items[i].increaseQuality();
      } else {
        items[i].quality = 0;
      }
    } else {
      items[i].getOld();
      items[i].decreaseQuality();
      if (items[i].sell_in < 0) items[i].decreaseQuality();
    }
  }
}
