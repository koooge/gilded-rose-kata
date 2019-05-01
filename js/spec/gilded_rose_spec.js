describe('Gilded Rose', () => {
  const agedBrie = 'Aged Brie';
  const sulfuras = 'Sulfuras, Hand of Ragnaros';
  const backstagePass = 'Backstage passes to a TAFKAL80ETC concert';
  const conjured = 'Conjured Mana Cake';

  beforeEach(() => {
    items = [];
  });

  // normal items
  it('should foo', () => {
    items.push(new Item('foo', 0, 0));
    update_quality();
    expect(items[0].name).toEqual('foo');
  });

  // TODO: test Item constructor's args

  it('should be array items', () => {
    items.push(new Item('foo', 0, 0));
    items.push(new Item('bar', 2, 20));
    items.push(new Item('baz', 4, 30));
    update_quality();
    expect(items[0].name).toEqual('foo');
    expect(items[1].name).toEqual('bar');
    expect(items[2].name).toEqual('baz');
  });

  // TODO: test items array should not occur OOM in case of instanciate lots of Item

  it('should decrease by 1 item quality', () => {
    items.push(new Item('foo', 10, 10));
    update_quality();
    expect(items[0].sell_in).toEqual(9);
    expect(items[0].quality).toEqual(9);
    update_quality();
    expect(items[0].sell_in).toEqual(8);
    expect(items[0].quality).toEqual(8);
    update_quality();
    expect(items[0].sell_in).toEqual(7);
    expect(items[0].quality).toEqual(7);
  });

  it('should decrease by 2 expired sell_in item quality', () => {
    items.push(new Item('foo', 1, 10));
    update_quality();
    expect(items[0].sell_in).toEqual(0);
    expect(items[0].quality).toEqual(9);
    update_quality();
    expect(items[0].sell_in).toEqual(-1);
    expect(items[0].quality).toEqual(7);
    update_quality();
    expect(items[0].sell_in).toEqual(-2);
    expect(items[0].quality).toEqual(5);
  });

  it('should not be negative item quality', () => {
    items.push(new Item('foo', -10, 0));
    update_quality();
    expect(items[0].sell_in).toEqual(-11);
    expect(items[0].quality).toEqual(0);
    update_quality();
    expect(items[0].sell_in).toEqual(-12);
    expect(items[0].quality).toEqual(0);
  });

  // 'Aged Brie'
  it('should increase by 1 "Aged Brie" quality', () => {
    items.push(new Item(agedBrie, 4, 0));
    update_quality();
    expect(items[0].name).toEqual(agedBrie);
    expect(items[0].sell_in).toEqual(3);
    expect(items[0].quality).toEqual(1);
    update_quality();
    expect(items[0].quality).toEqual(2);
    update_quality();
    expect(items[0].quality).toEqual(3);
  });

  it('should increase by 1 "Aged Brie" quality up to 50', () => {
    items.push(new Item(agedBrie, 0, 49));
    update_quality();
    expect(items[0].sell_in).toEqual(-1);
    expect(items[0].quality).toEqual(50);
    update_quality();
    expect(items[0].quality).toEqual(50);
  });

  // legendary item 'Sulfuras'
  it('should not alter legendary item sell_in', () => {
    items.push(new Item(sulfuras, 1, 80));
    update_quality();
    expect(items[0].name).toEqual(sulfuras);
    expect(items[0].sell_in).toEqual(1);
    expect(items[0].quality).toEqual(80);
    update_quality();
    expect(items[0].sell_in).toEqual(1);
    expect(items[0].quality).toEqual(80);
  });
 
  it('should not alter legendary item quality', () => {
    items.push(new Item(sulfuras, -10, 80));
    update_quality();
    expect(items[0].name).toEqual(sulfuras);
    expect(items[0].sell_in).toEqual(-10);
    expect(items[0].quality).toEqual(80);
    update_quality();
    expect(items[0].sell_in).toEqual(-10);
    expect(items[0].quality).toEqual(80);
  });

  it('should be 80 legendary item quality', () => {
    items.push(new Item(sulfuras, -10, 0));
    update_quality();
    expect(items[0].quality).toEqual(80);
  });

  // Backstage passes
  it('should decrease by 1 backstage passes quality 11 days+', () => {
    items.push(new Item(backstagePass, 12, 10));
    update_quality();
    expect(items[0].name).toEqual(backstagePass);
    expect(items[0].sell_in).toEqual(11);
    expect(items[0].quality).toEqual(11);
  });

  it('should increase by 2 backstage passes quality 10-6 days', () => {
    items.push(new Item(backstagePass, 11, 10));
    update_quality();
    expect(items[0].sell_in).toEqual(10);
    expect(items[0].quality).toEqual(11);
    update_quality();
    expect(items[0].sell_in).toEqual(9);
    expect(items[0].quality).toEqual(13);
    update_quality();
    expect(items[0].sell_in).toEqual(8);
    expect(items[0].quality).toEqual(15);
  });

  it('should increase by 3 backstage passes quality 5-1 days', () => {
    items.push(new Item(backstagePass, 6, 10));
    update_quality();
    expect(items[0].sell_in).toEqual(5);
    expect(items[0].quality).toEqual(12);
    update_quality();
    expect(items[0].sell_in).toEqual(4);
    expect(items[0].quality).toEqual(15);
    update_quality();
    expect(items[0].sell_in).toEqual(3);
    expect(items[0].quality).toEqual(18);
  });

  it('should increase backstage passes quality up to 50', () => {
    items.push(new Item(backstagePass, 8, 49));
    update_quality();
    expect(items[0].sell_in).toEqual(7);
    expect(items[0].quality).toEqual(50);
    update_quality();
    expect(items[0].sell_in).toEqual(6);
    expect(items[0].quality).toEqual(50);
  });

  it('should be zero backstage passes quality after the concert', () => {
    items.push(new Item(backstagePass, 1, 30));
    update_quality();
    expect(items[0].sell_in).toEqual(0);
    expect(items[0].quality).toEqual(33);
    update_quality();
    expect(items[0].sell_in).toEqual(-1);
    expect(items[0].quality).toEqual(0);
  });

  // conjured item 'Conjured'
  it('should decrease by 2 conjured item quality', () => {
    items.push(new Item(conjured, 10, 10));
    update_quality();
    expect(items[0].sell_in).toEqual(9);
    expect(items[0].quality).toEqual(8);
    update_quality();
    expect(items[0].sell_in).toEqual(8);
    expect(items[0].quality).toEqual(6);
    update_quality();
    expect(items[0].sell_in).toEqual(7);
    expect(items[0].quality).toEqual(4);
  });

  it('should decrease by 4 expired sell_in conjured item quality', () => {
    items.push(new Item(conjured, 1, 10));
    update_quality();
    expect(items[0].sell_in).toEqual(0);
    expect(items[0].quality).toEqual(8);
    update_quality();
    expect(items[0].sell_in).toEqual(-1);
    expect(items[0].quality).toEqual(4);
    update_quality();
    expect(items[0].sell_in).toEqual(-2);
    expect(items[0].quality).toEqual(0);
  });

  it('should not be negative conjured item quality', () => {
    items.push(new Item(conjured, 3, 1));
    update_quality();
    expect(items[0].sell_in).toEqual(2);
    expect(items[0].quality).toEqual(0);
    update_quality();
    expect(items[0].sell_in).toEqual(1);
    expect(items[0].quality).toEqual(0);
  });

  it('should not be negative expired conjured item quality', () => {
    items.push(new Item(conjured, -1, 3));
    update_quality();
    expect(items[0].sell_in).toEqual(-2);
    expect(items[0].quality).toEqual(0);
    update_quality();
    expect(items[0].sell_in).toEqual(-3);
    expect(items[0].quality).toEqual(0);
  });

  // TODO: Create testcases of Item's method getOld(), increaseQuality() and decreaseQuality()
});
