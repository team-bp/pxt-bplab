namespace bplab {
  /**
   * Servo 360
   */
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
    //% blockId="bp_servo_spin_one_way" weight=100
    //% block="spin one way pin %pin"
    //% pin.fieldEditor="gridpicker"
    //% pin.defl=AnalogPin.P1
    //% help=github:pxt-bplab/servo-360/README#servo360-spinoneway
    export function spinOneWay(pin = ServoPin.P1): void {
      if (pin === undefined) pin = ServoPin.P1;
      pins.servoWritePin(pin, 180);
    }

    /**
     * Spins the motor in other direction at full speed
     * @param pin Which pin the motor is on
     */
    //% subcategory="Servo 360" color=#03aa74 weight=1 icon="\uf2f1"
    //% blockId="bp_servo_spin_other_way" weight=80
    //% block="spin other way pin %pin"
    //% pin.fieldEditor="gridpicker"
    //% pin.defl=AnalogPin.P1
    //% help=github:pxt-bplab/servo-360/README#servo360-spinotherway
    export function spinOtherWay(pin = ServoPin.P1): void {
      pins.servoWritePin(pin, 0);
    }

    /**
     * Spins the motor in one direction, with a speed from 0 to 100
     * @param pin Which pin the motor is on
     * @param speed Speed from 0 to 100
     */
    //% subcategory="Servo 360" color=#03aa74 weight=1 icon="\uf2f1"
    //% blockId="bp_servo_spin_one_way_with_speed" weight=60
    //% block="spin one way pin %pin | with speed %speed"
    //% speed.min=0 speed.max=100
    //% pin.fieldEditor="gridpicker"
    //% pin.defl=AnalogPin.P1
    //% speed.defl=50
    //% help=github:pxt-bplab/servo-360/README#servo360-spinonewaywithspeed
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
    //% blockId="bp_servo_spin_other_way_with_speed" weight=40
    //% block="spin other way pin %pin | with speed %speed"
    //% speed.min=0 speed.max=100
    //% pin.fieldEditor="gridpicker"
    //% pin.defl=AnalogPin.P1
    //% speed.defl=50
    //% help=github:pxt-bplab/servo-360/README#servo360-spinotherwaywithspeed
    export function spinOtherWayWithSpeed(pin = ServoPin.P1, speed = 50): void {
      let spin = 90 - (speed * 90) / 100;
      pins.servoWritePin(pin, spin);
    }

    /**
     * Turns off the motor at this pin
     * @param pin Which pin the motor is on
     */
    //% subcategory="Servo 360" color=#03aa74 weight=1 icon="\uf2f1"
    //% blockId="bp_servo_turn_off_motor" weight=20
    //% block="turn off motor at pin %pin"
    //% pin.fieldEditor="gridpicker"
    //% pin.defl=AnalogPin.P1
    //% help=github:pxt-bplab/servo-360/README#servo360-turnoffmotor
    export function turnOffMotor(pin = ServoPin.P1): void {
      pins.digitalWritePin(pin, 0);
    }
  }
}
