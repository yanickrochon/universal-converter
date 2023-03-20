import def from "../../src/definitions/velocity";

describe("Testing Velocity definition", () => {
  it("should define base", () => {
    expect(def.base).toBe("meter/second");
    expect(def.units[def.base]).toBe(1);
  });

  it("should define aliases", () => {
    expect(def.aliases).toHaveProperty("kph", "kilometer/hour");
    expect(def.aliases).toHaveProperty("mph", "mile/hour");
    // TODO : check more aliases
  });

  it("should define conversion params", () => {
    expect(def.conversion.params).toHaveProperty("initialVelocity", "velocity");
    expect(def.conversion.params).toHaveProperty("velocity", "velocity");
    expect(def.conversion.params).toHaveProperty(
      "acceleration",
      "acceleration"
    );
    expect(def.conversion.params).toHaveProperty("time", "time");
  });

  it("should calculate from conversion", () => {
    expect(
      def.conversion.converters.accelerationAndTime({
        initialVelocity: 0,
        acceleration: 5,
        time: 20,
      })
    ).toBe(100);
    expect(
      def.conversion.converters.initialVelocity({
        velocity: 100,
        acceleration: 5,
        time: 20,
      })
    ).toBe(0);
  });

  it("should calculate accelerationAndTime with default params", () => {
    expect(def.conversion.converters.accelerationAndTime({ time: 20 })).toBe(0);
  });

  it("should calculate initialVelocity with default params", () => {
    expect(def.conversion.converters.initialVelocity({ time: 20 })).toBe(0);
  });
});
