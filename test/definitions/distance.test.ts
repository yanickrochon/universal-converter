import def from "../../src/definitions/distance";

describe("Testing Distance definition", function () {
  it("should define base", () => {
    expect(def.base).toBe("meter");
    expect(def.units[def.base]).toBe(1);
  });

  it("should define aliases", () => {
    expect(def.aliases).toHaveProperty("m", "meter");
    expect(def.aliases).toHaveProperty("km", "kilometer");
    // TODO : check more aliases
  });

  it("should define conversion params", () => {
    expect(def.conversion.params).toHaveProperty("surface", "area");
    expect(def.conversion.params).toHaveProperty("length", "distance");
    expect(def.conversion.params).toHaveProperty("initialVelocity", "velocity");
    expect(def.conversion.params).toHaveProperty("velocity", "velocity");
    expect(def.conversion.params).toHaveProperty("time", "time");
  });

  it("should calculate from conversion", () => {
    expect(def.conversion.converters.squareWidth({ surface: 100 })).toBe(10);
    expect(def.conversion.converters.squareWidth({ surface: 100 })).toBe(
      10 * def.units["meter"]
    );
    expect(def.conversion.converters.squareWidth({ surface: 1 })).toBe(
      def.units["meter"]
    );

    expect(
      def.conversion.converters.rectangleWidth({ surface: 500, length: 10 })
    ).toBe(50);

    expect(
      def.conversion.converters.velocityAndTime({
        initialVelocity: 100,
        velocity: 100,
        time: 10,
      })
    ).toBe(1000);
    expect(
      def.conversion.converters.velocityAndTime({
        initialVelocity: 0,
        velocity: 150,
        time: 25,
      })
    ).toBe(1875);
    // TODO : check more conversions (i.e. validating unit values)
  });
});
