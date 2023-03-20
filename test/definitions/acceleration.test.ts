import def from "../../src/definitions/acceleration";

describe("Testing Accleration definition", () => {
  it("should define base", () => {
    expect(def.base).toBe("meter/square second");
    expect(def.units[def.base]).toBe(1);
  });

  it("should define aliases", () => {
    expect(def.aliases).toHaveProperty("G", "g-unit");
    // TODO : check more aliases
  });

  it("should define conversion params", () => {
    expect(def.conversion.params).toHaveProperty("initialVelocity", "velocity");
    expect(def.conversion.params).toHaveProperty("velocity", "velocity");
    expect(def.conversion.params).toHaveProperty("time", "time");
  });

  it("should calculate from conversion", () => {
    expect(
      def.conversion.converters.velocityOverTime({
        initialVelocity: 0,
        velocity: 100,
        time: 20,
      })
    ).toBe(5);
  });

  it("should calculate velocityOverTime with default params", () => {
    expect(def.conversion.converters.velocityOverTime({ time: 20 })).toBe(0);
  });
});
