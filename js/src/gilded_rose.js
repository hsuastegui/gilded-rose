function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = [];

const CONJURED = "Conjured";
const BRIE = "Aged Brie";
const PASSES = "Backstage passes to a TAFKAL80ETC concert";
const SULFURAS = "Sulfuras, Hand of Ragnaros";
const RESTRICTED = [BRIE, CONJURED, PASSES, SULFURAS];

const getSellIn = ({ name, sell_in }) =>
  name === SULFURAS ? sell_in : sell_in - 1;

const getQuality = ({ name, quality, sell_in }) => {
  let q = quality;

  if (q > 0 && !RESTRICTED.includes(name)) {
    return q - 1;
  }

  if (name === CONJURED) {
    return q > 1 ? q - 2 : 0;
  }

  if (name === BRIE) {
    if (q < 50) {
      q += 1;
    }
    if (sell_in < 0 && q < 50) {
      q += 1;
    }
    return q;
  }

  if (name === PASSES) {
    if (sell_in < 0) {
      return 0;
    }
    if (sell_in > 0 && q < 50) {
      q += 1;
    }
    if (sell_in < 11 && q < 50) {
      q += 1;
    }
    if (sell_in < 6 && q < 50) {
      q += 1;
    }
    return q;
  }

  return q;
};

function update_quality() {
  items = items.map((item) => ({
    name: item.name,
    sell_in: getSellIn(item),
    quality: getQuality(item),
  }));
}
