var agedBrie = 'Aged Brie';
var sulfuras = 'Sulfuras, Hand of Ragnaros';
var backstagePass = 'Backstage passes to a TAFKAL80ETC concert';

function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = [];

function update_quality() {
  for (var i = 0; i < items.length; i++) {
    if (items[i].name != agedBrie && items[i].name != backstagePass) {
      if (items[i].quality > 0) {
        if (items[i].name != sulfuras) {
          items[i].quality = items[i].quality - 1
        }
      }
    } else {
      if (items[i].quality < 50) {
        items[i].quality = items[i].quality + 1
        if (items[i].name == backstagePass) {
          if (items[i].sell_in < 11) {
            if (items[i].quality < 50) {
              items[i].quality = items[i].quality + 1
            }
          }
          if (items[i].sell_in < 6) {
            if (items[i].quality < 50) {
              items[i].quality = items[i].quality + 1
            }
          }
        }
      }
    }
    if (items[i].name != sulfuras) {
      items[i].sell_in = items[i].sell_in - 1;
    }
    if (items[i].sell_in < 0) {
      if (items[i].name != agedBrie) {
        if (items[i].name != backstagePass) {
          if (items[i].quality > 0) {
            if (items[i].name != sulfuras) {
              items[i].quality = items[i].quality - 1
            }
          }
        } else {
          items[i].quality = items[i].quality - items[i].quality
        }
      } else {
        if (items[i].quality < 50) {
          items[i].quality = items[i].quality + 1
        }
      }
    }
  }
}
