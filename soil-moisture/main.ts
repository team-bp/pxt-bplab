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
    //% help=github:pxt-bplab/soil-moisture/README#soilmoisture-soilmoisturevalue
    export function soilMoistureValue(
      pin: SoilMoisturePin = SoilMoisturePin.P0,
      valueType: ValueType = ValueType.PERCENTAGE
    ): number {
        let max = 0;
        let min = 0;

        if (control.hardwareVersion().slice(0, 1) !== "1") {
            // V2
            max = 590;
            min = 325;
        } else {
            // V1
            max = 1019;
            min = 392;
        }

        // Read analog value
        let moisture = pins.analogReadPin(pin);

        // Ensure the reading is within valid range
        moisture = Math.constrain(moisture, 0, 1023);

        switch (valueType) {
        case ValueType.RAW:
            return Math.round(moisture);
        case ValueType.PERCENTAGE:
            // Convert to percentage (inverted as more moisture = lower resistance)
            // Typically: Dry soil > 800, Water ~ 300
            return Math.round(Math.map(moisture, max, min, 0, 100));
        default:
            return 0;
        }
    }
  }
}
