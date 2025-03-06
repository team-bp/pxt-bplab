/**
 * Servo 360
 */
namespace bplab {
  //% subcategory="Servo 360" color=#03aa74 weight=1 icon="\uf2f1"
  export namespace servo360 {
    /**
     * Servo 360 PWM pin
     */
    export enum ServoPin {
      //% block="P0"
      P0 = AnalogPin.P0,
      //% block="P1"
      P1 = AnalogPin.P1,
      //% block="P2"
      P2 = AnalogPin.P2
    }

    /**
     * Spins the motor in one direction at full speed
     * @param pin Which pin the motor is on
     */
    //% subcategory="Servo 360" color=#03aa74 weight=1 icon="\uf2f1"
    //% blockId=spinOneWay weight=100
    //% block="Spin one way pin %pin"
    //% pin.fieldEditor="gridpicker"
    export function spinOneWay(pin = ServoPin.P1): void {
      pins.servoWritePin(pin, 180);
    }

    /**
     * Spins the motor in other direction at full speed
     * @param pin Which pin the motor is on
     */
    //% subcategory="Servo 360" color=#03aa74 weight=1 icon="\uf2f1"
    //% blockId=spinOtherWay weight=80
    //% block="Spin other way pin %pin"
    //% pin.fieldEditor="gridpicker"
    export function spinOtherWay(pin = ServoPin.P1): void {
      pins.servoWritePin(pin, 0);
    }

    /**
     * Spins the motor in one direction, with a speed from 0 to 100
     * @param pin Which pin the motor is on
     * @param speed Speed from 0 to 100
     */
    //% subcategory="Servo 360" color=#03aa74 weight=1 icon="\uf2f1"
    //% blockId=spinOneWayWithSpeed weight=60
    //% block="Spin one way pin %pin | with speed %speed"
    //% speed.min=0 speed.max=100
    //% pin.fieldEditor="gridpicker"
    export function spinOneWayWithSpeed(pin = ServoPin.P1, speed = 50): void {
      let spin = (speed * 90) / 100 + 90;
      pins.servoWritePin(pin, spin);
    }

    /**
     * Spins the motor in the other direction, with a speed from 0 to 100
     * @param pin Which pin the motor is on
     * @param speed Speed from 0 to 100
     */
    //% subcategory="Servo 360" color=#03aa74 weight=1 icon="\uf2f1"
    //% blockId=spinOtherWayWithSpeed weight=40
    //% block="Spin other way pin %pin | with speed %speed"
    //% speed.min=0 speed.max=100
    //% pin.fieldEditor="gridpicker"
    export function spinOtherWayWithSpeed(pin = ServoPin.P1, speed = 50): void {
      let spin = 90 - (speed * 90) / 100;
      pins.servoWritePin(pin, spin);
    }

    /**
     * Turns off the motor at this pin
     * @param pin Which pin the motor is on
     */
    //% subcategory="Servo 360" color=#03aa74 weight=1 icon="\uf2f1"
    //% blockId=turnOffMotor weight=20
    //% block="Turn off motor at pin %pin"
    //% pin.fieldEditor="gridpicker"
    export function turnOffMotor(pin = ServoPin.P1): void {
      pins.digitalWritePin(pin, 0);
    }
  }
}
