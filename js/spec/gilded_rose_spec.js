describe("Gilded Rose", function () {
  it("should foo", function () {
    items = [new Item("foo", 0, 0)];
    update_quality();
    expect(items[0].name).toEqual("foo");
  });
  it("should work for 2 days", () => {
    const days = 2;
    items = [];
    items.push(new Item("+5 Dexterity Vest", 10, 20));
    items.push(new Item("Aged Brie", 2, 0));
    items.push(new Item("Elixir of the Mongoose", 5, 7));
    items.push(new Item("Sulfuras, Hand of Ragnaros", 0, 80));
    items.push(new Item("Sulfuras, Hand of Ragnaros", -1, 80));
    items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20));
    items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49));
    items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49));
    const expected = [
      {
        name: "+5 Dexterity Vest",
        sell_in: 8,
        quality: 18,
      },
      { name: "Aged Brie", sell_in: 0, quality: 2 },
      { name: "Elixir of the Mongoose", sell_in: 3, quality: 5 },
      { name: "Sulfuras, Hand of Ragnaros", sell_in: 0, quality: 80 },
      { name: "Sulfuras, Hand of Ragnaros", sell_in: -1, quality: 80 },
      {
        name: "Backstage passes to a TAFKAL80ETC concert",
        sell_in: 13,
        quality: 22,
      },
      {
        name: "Backstage passes to a TAFKAL80ETC concert",
        sell_in: 8,
        quality: 50,
      },
      {
        name: "Backstage passes to a TAFKAL80ETC concert",
        sell_in: 3,
        quality: 50,
      },
    ];
    for (let i = 0; i < days; i++) {
      update_quality();
    }
    items.forEach((item, index) => {
      expect(items[index]).toEqual(expected[index]);
    });
  });
  it("should get sell in", () => {
    expect(getSellIn({ name: "", sell_in: 10 })).toEqual(9);
    expect(getSellIn({ name: BRIE, sell_in: 10 })).toEqual(9);
    expect(getSellIn({ name: PASSES, sell_in: 10 })).toEqual(9);
    expect(getSellIn({ name: SULFURAS, sell_in: 10 })).toEqual(10);
  });
  it("should get quality", () => {
    expect(getQuality({ name: "", sell_in: 10, quality: 10 })).toEqual(9);
    expect(getQuality({ name: BRIE, sell_in: 10, quality: 10 })).toEqual(11);
    expect(getQuality({ name: BRIE, sell_in: -1, quality: 49 })).toEqual(50);
    expect(getQuality({ name: BRIE, sell_in: -1, quality: 10 })).toEqual(12);
    expect(getQuality({ name: SULFURAS, sell_in: 10, quality: 10 })).toEqual(
      10
    );
    expect(getQuality({ name: PASSES, sell_in: 20, quality: 10 })).toEqual(11);
    expect(getQuality({ name: PASSES, sell_in: 10, quality: 10 })).toEqual(12);
    expect(getQuality({ name: PASSES, sell_in: 2, quality: 10 })).toEqual(13);
    expect(getQuality({ name: PASSES, sell_in: -1, quality: 10 })).toEqual(0);
    expect(getQuality({ name: CONJURED, sell_in: 10, quality: 10 })).toEqual(8);
    expect(getQuality({ name: CONJURED, sell_in: 10, quality: 0 })).toEqual(0);
  });
  it("should get quality up to 50", () => {
    expect(getQuality({ name: BRIE, sell_in: 10, quality: 50 })).toEqual(50);
    expect(getQuality({ name: BRIE, sell_in: -1, quality: 49 })).toEqual(50);
    expect(getQuality({ name: PASSES, sell_in: 20, quality: 50 })).toEqual(50);
    expect(getQuality({ name: PASSES, sell_in: 10, quality: 49 })).toEqual(50);
    expect(getQuality({ name: PASSES, sell_in: 2, quality: 48 })).toEqual(50);
  });
});
