var agedBrie = 'Aged Brie';
var sulfuras = 'Sulfuras, Hand of Ragnaros';
var backstagePass = 'Backstage passes to a TAFKAL80ETC concert';

function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;

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
    if (items[i].name != agedBrie && items[i].name != backstagePass) {
      if (items[i].name != sulfuras) {
        items[i].decreaseQuality();
      }
    } else {
      items[i].increaseQuality();
      if (items[i].name == backstagePass) {
        if (items[i].sell_in < 11) {
          items[i].increaseQuality();
        }
        if (items[i].sell_in < 6) {
          items[i].increaseQuality();
        }
      }
    }
    if (items[i].name != sulfuras) {
      items[i].sell_in = items[i].sell_in - 1;
    }
    if (items[i].sell_in < 0) {
      if (items[i].name != agedBrie) {
        if (items[i].name != backstagePass) {
          if (items[i].name != sulfuras) {
            items[i].decreaseQuality();
          }
        } else {
          items[i].quality = items[i].quality - items[i].quality
        }
      } else {
        items[i].increaseQuality();
      }
    }
  }
}
