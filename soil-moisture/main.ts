namespace bplab {
  /**
   * Soil Moisture Sensor with LM393
   */
  //% subcategory="Soil Moisture" color=#795548 icon="\uf06c" weight=1
  export namespace soilMoisture {
    /**
     * Soil moisture value type
     */
    export enum ValueType {
      //% block="analog value(0~1023)"
      RAW = 0,
      //% block="percentage value(0~100%)"
      PERCENTAGE = 1
    }

    /**
     * Soil moisture pin
     */
    export enum SoilMoisturePin {
      //% block="P0"
      P0 = AnalogPin.P0,
      //% block="P1"
      P1 = AnalogPin.P1,
      //% block="P2"
      P2 = AnalogPin.P2
    }

    /**
     * Get soil moisture sensor value
     * @param pin Analog pin connected to sensor
     * @param valueType Select raw value or percentage
     */
    //% subcategory="Soil Moisture" color=#795548 icon="\uf06c" weight=1
    //% blockId="bp_soil_moisture" block="soil moisture pin %pin %valueType"
    //% tooltip="Reads the soil moisture level from sensor connected to the specified analog pin"
    //% pin.fieldEditor="gridpicker"
    export function soilMoistureValue(
      pin: SoilMoisturePin,
      valueType: ValueType
    ): number {
      // Read analog value
      let moisture = pins.analogReadPin(pin);

      // Ensure the reading is within valid range
      moisture = Math.constrain(moisture, 0, 1023);

      switch (valueType) {
        case ValueType.RAW:
          return moisture;
        case ValueType.PERCENTAGE:
          // Convert to percentage (inverted as more moisture = lower resistance)
          // Typically: Dry soil > 800, Water ~ 300
          return Math.map(moisture, 1023, 300, 0, 100);
        default:
          return 0;
      }
    }
  }
}
