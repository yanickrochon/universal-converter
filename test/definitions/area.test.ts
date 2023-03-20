import def from "../../src/definitions/area";

describe("Testing Area definition", () => {
  it("should define base", () => {
    expect(def.base).toBe("square meter");
    expect(def.units[def.base]).toBe(1);
  });

  it("should define aliases", () => {
    expect(def.aliases).toHaveProperty("yard", "square yard");
    // TODO : check more aliases
  });

  it("should define conversion params", () => {
    expect(def.conversion.params).toHaveProperty("width", "distance");
    expect(def.conversion.params).toHaveProperty("length", "distance");
  });

  it("should calculate from conversion", () => {
    expect(def.conversion.converters.squareArea({ width: 10 })).toBe(100);
    expect(def.conversion.converters.squareArea({ width: 1000 })).toBe(
      def.units["square kilometer"]
    );
    expect(
      def.conversion.converters.rectangleArea({ width: 10, length: 50 })
    ).toBe(500);

    // TODO : check more conversions (i.e. validating unit values)
  });
});
