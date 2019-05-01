var agedBrie = 'Aged Brie';
var sulfuras = 'Sulfuras, Hand of Ragnaros';
var backstagePass = 'Backstage passes to a TAFKAL80ETC concert';
var conjured = 'Conjured Mana Cake';

function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;

  this.getOld = function() {
    this.sell_in--;
  }

  this.increaseQuality = function(val = 1) {
    this.quality = this.quality + val < 50 ? this.quality + val : 50;
  }

  this.decreaseQuality = function(val = 1) {
    this.quality = this.quality - val > 0 ? this.quality - val : 0;
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
      items[i].quality = 80;
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
    } else if (items[i].name === conjured) {
      items[i].getOld();
      if (items[i].sell_in >= 0) {
        items[i].decreaseQuality(2);
      } else {
        items[i].decreaseQuality(4);
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
