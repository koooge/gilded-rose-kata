describe('Gilded Rose', () => {
  beforeEach(() => {
    items = [];
  });

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

  // TODO: test items array should not OOM

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
});
