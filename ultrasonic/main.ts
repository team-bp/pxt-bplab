namespace bplab {
  /**
   * Ultrasonic and ping utilities
   */
  //% subcategory="Ultrasonic" color="#2c3e50" weight=1 icon="\uf2ce"
  export namespace ultrasonic {
    /**
     * Ultrasonic Ping Unit
     */
    export enum PingUnit {
      //% block="μs"
      MicroSeconds,
      //% block="cm"
      Centimeters,
      //% block="inches"
      Inches
    }

    /**
     * Send a ping and get the echo time (in microseconds) as a result
     * @param trig Trigger pin, eg: DigitalPin.P14
     * @param echo Echo pin, eg: DigitalPin.P15
     * @param unit Desired conversion unit
     */
    //% subcategory="Ultrasonic" color="#2c3e50" weight=1 icon="\uf2ce"
    //% blockId="bp_ultrasonic_ping" block="ultrasonic measurement|trig %trig|echo %echo|unit %unit"
    //% tooltip="Measures the distance to an object using an ultrasonic sensor."
    //% inlineInputMode=external
    //% trig.fieldEditor="gridpicker"
    //% echo.fieldEditor="gridpicker"
    //% help=github:pxt-bplab/ultrasonic/README#ultrasonic-ping
    export function ping(
      trig: DigitalPin = DigitalPin.P14,
      echo: DigitalPin = DigitalPin.P15,
      unit: PingUnit = PingUnit.Centimeters
    ): number {
      const maxCmDistance = 500;

      // send pulse
      pins.setPull(trig, PinPullMode.PullNone);
      pins.digitalWritePin(trig, 0);
      control.waitMicros(2);
      pins.digitalWritePin(trig, 1);
      control.waitMicros(10);
      pins.digitalWritePin(trig, 0);

      // read pulse
      const d = pins.pulseIn(echo, PulseValue.High, maxCmDistance * 58);

      switch (unit) {
        case PingUnit.Centimeters:
            return Math.round(Math.idiv(d, 58));
        case PingUnit.Inches:
            return Math.round(Math.idiv(d, 148));
        default:
            return Math.round(d);
      }
    }
  }
}
