/**
* BP Lab Extensions
*/
//% weight=1 color=#0066CB icon="\uf0ad" block="BP Lab"
//% groups='["LCD"]'
namespace BPLAB {
  export let i2cAddr: number // 0x3F: PCF8574A, 0x27: PCF8574
  export let BK: number      // Backlight control
  export let RS: number      // Command/Data selection

  // LCD register setup
  function setreg(d: number) {
      pins.i2cWriteNumber(i2cAddr, d, NumberFormat.Int8LE)
      basic.pause(1)
  }

  // Send data through I2C bus
  export function set(d: number) {
      d = d & 0xF0
      d = d + BK + RS
      setreg(d)
      setreg(d + 4)
      setreg(d)
  }

  // Send command
  export function cmd(d: number) {
      RS = 0
      set(d)
      set(d << 4)
  }

  // Send data
  export function dat(d: number) {
      RS = 1
      set(d)
      set(d << 4)
  }

  // Auto detect LCD address
  export function AutoAddr() {
      let k = true
      let addr = 0x20
      let d1 = 0, d2 = 0
      while (k && (addr < 0x28)) {
          pins.i2cWriteNumber(addr, -1, NumberFormat.Int32LE)
          d1 = pins.i2cReadNumber(addr, NumberFormat.Int8LE) % 16
          pins.i2cWriteNumber(addr, 0, NumberFormat.Int16LE)
          d2 = pins.i2cReadNumber(addr, NumberFormat.Int8LE)
          if ((d1 == 7) && (d2 == 0)) k = false
          else addr += 1
      }
      if (!k) return addr

      addr = 0x38
      while (k && (addr < 0x40)) {
          pins.i2cWriteNumber(addr, -1, NumberFormat.Int32LE)
          d1 = pins.i2cReadNumber(addr, NumberFormat.Int8LE) % 16
          pins.i2cWriteNumber(addr, 0, NumberFormat.Int16LE)
          d2 = pins.i2cReadNumber(addr, NumberFormat.Int8LE)
          if ((d1 == 7) && (d2 == 0)) k = false
          else addr += 1
      }
      if (!k) return addr
      else return 0
  }
}