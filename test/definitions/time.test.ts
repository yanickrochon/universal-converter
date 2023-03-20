import def from "../../src/definitions/time";

describe("Testing Time definition", () => {
  it("should define base", () => {
    expect(def.base).toBe("second");
    expect(def.units[def.base]).toBe(1);
  });

  it("should define aliases", () => {
    expect(def.aliases).toHaveProperty("s", "second");
    expect(def.aliases).toHaveProperty("m", "minute");
    expect(def.aliases).toHaveProperty("h", "hour");
    // TODO : check more aliases
  });

  it("should define conversion params", () => {
    expect(def.conversion.params).toHaveProperty("initialVelocity", "velocity");
    expect(def.conversion.params).toHaveProperty("velocity", "velocity");
    expect(def.conversion.params).toHaveProperty(
      "acceleration",
      "acceleration"
    );
    expect(def.conversion.params).toHaveProperty("distance", "distance");
  });

  it("should calculate from conversion", () => {
    expect(
      def.conversion.converters.velocityOverAcceleration({
        initialVelocity: 0,
        velocity: 100,
        acceleration: 5,
      })
    ).toBe(20);
    expect(
      def.conversion.converters.distanceOverVelocity({
        initialVelocity: 0,
        velocity: 100,
        distance: 1300,
      })
    ).toBe(26);
  });

  it("should calculate velocityOverAcceleration with default params", () => {
    expect(
      def.conversion.converters.velocityOverAcceleration({ acceleration: 5 })
    ).toBe(0);
  });
});
