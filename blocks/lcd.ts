/**
* BP Lab Extensions
*/
//% weight=1 color=#0066CB icon="\uf0ad" block="BP Lab"
//% groups='["LCD"]'
namespace BPLAB {
  /**
   * Initialize LCD and set I2C address. PCF8574/PCF8574A address is 39/63
   * @param Addr LCD i2c address, eg: 0, 39, 63. 0 for auto detection
   */
  //% group="LCD"
  //% color=#0fbc11
  //% blockId="I2C_LCD1620_SET_ADDRESS" block="LCD initialize with Address %addr"
  //% weight=100 blockGap=8
  //% parts=LCD1602_I2C trackArgs=0
  export function LcdInit(Addr: number) {
      if (Addr == 0) i2cAddr = AutoAddr()
      else i2cAddr = Addr
      BK = 8
      RS = 0
      cmd(0x33)       // Set 4-bit mode
      basic.pause(5)
      set(0x30)
      basic.pause(5)
      set(0x20)
      basic.pause(5)
      cmd(0x28)       // Set mode
      cmd(0x0C)
      cmd(0x06)
      cmd(0x01)       // Clear screen
  }

  /**
   * Display number at specified position on LCD
   * @param n number to display, eg: 10, 100, 200
   * @param x LCD column position, eg: 0
   * @param y LCD row position, eg: 0
   */
  //% group="LCD"
  //% color=#0fbc11
  //% blockId="I2C_LCD1620_SHOW_NUMBER" block="show number %n|at x %x|y %y"
  //% weight=90 blockGap=8
  //% x.min=0 x.max=15
  //% y.min=0 y.max=1
  //% parts=LCD1602_I2C trackArgs=0
  export function ShowNumber(n: number, x: number, y: number): void {
      let s = n.toString()
      ShowString(s, x, y)
  }

  /**
   * Display string at specified position on LCD
   * @param s string to display, eg: "Hello"
   * @param x LCD column position, [0 - 15], eg: 0
   * @param y LCD row position, [0 - 1], eg: 0
   */
  //% group="LCD"
  //% color=#0fbc11
  //% blockId="I2C_LCD1620_SHOW_STRING" block="show string %s|at x %x|y %y"
  //% weight=90 blockGap=8
  //% x.min=0 x.max=15
  //% y.min=0 y.max=1
  //% parts=LCD1602_I2C trackArgs=0
  export function ShowString(s: string, x: number, y: number): void {
      let a: number

      if (y > 0)
          a = 0xC0
      else
          a = 0x80
      a += x
      cmd(a)

      for (let i = 0; i < s.length; i++) {
          dat(s.charCodeAt(i))
      }
  }

  /**
   * Turn on LCD
   */
  //% group="LCD"
  //% color=#0fbc11
  //% blockId="I2C_LCD1620_ON" block="turn on LCD"
  //% weight=81 blockGap=8
  //% parts=LCD1602_I2C trackArgs=0
  export function on(): void {
      cmd(0x0C)
  }

  /**
   * Turn off LCD
   */
  //% group="LCD"
  //% color=#0fbc11
  //% blockId="I2C_LCD1620_OFF" block="turn off LCD"
  //% weight=80 blockGap=8
  //% parts=LCD1602_I2C trackArgs=0
  export function off(): void {
      cmd(0x08)
  }

  /**
   * Clear all display contents
   */
  //% group="LCD"
  //% color=#0fbc11
  //% blockId="I2C_LCD1620_CLEAR" block="clear LCD"
  //% weight=85 blockGap=8
  //% parts=LCD1602_I2C trackArgs=0
  export function clear(): void {
      cmd(0x01)
  }

  /**
   * Turn on LCD backlight
   */
  //% group="LCD"
  //% color=#0fbc11
  //% blockId="I2C_LCD1620_BACKLIGHT_ON" block="turn on backlight"
  //% weight=71 blockGap=8
  //% parts=LCD1602_I2C trackArgs=0
  export function BacklightOn(): void {
      BK = 8
      cmd(0)
  }

  /**
   * Turn off LCD backlight
   */
  //% group="LCD"
  //% color=#0fbc11
  //% blockId="I2C_LCD1620_BACKLIGHT_OFF" block="turn off backlight"
  //% weight=70 blockGap=8
  //% parts=LCD1602_I2C trackArgs=0
  export function BacklightOff(): void {
      BK = 0
      cmd(0)
  }

  /**
   * Shift display left
   */
  //% group="LCD"
  //% color=#0fbc11
  //% blockId="I2C_LCD1620_SHL" block="Shift Left"
  //% weight=61 blockGap=8
  //% parts=LCD1602_I2C trackArgs=0
  export function shl(): void {
      cmd(0x18)
  }

  /**
   * Shift display right
   */
  //% group="LCD"
  //% color=#0fbc11
  //% blockId="I2C_LCD1620_SHR" block="Shift Right"
  //% weight=60 blockGap=8
  //% parts=LCD1602_I2C trackArgs=0
  export function shr(): void {
      cmd(0x1C)
  }
}