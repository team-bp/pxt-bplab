namespace bplab {
  /**
   * 7-Segment(Four Digit Display)
   */
  //% subcategory="7-Segment" weight=1 color=#5c68a6 icon="\uf25c"
  export namespace sevenSegment {
    let TM1637_CMD1 = 0x40; // Transfer data in auto-increase mode
    let TM1637_CMD2 = 0xc0; // Write data to a specific place (address)
    let TM1637_CMD3 = 0x80; // Display ON/OFF and Brightness Settings
    let _SEGMENTS = [
      0x3f, 0x06, 0x5b, 0x4f, 0x66, 0x6d, 0x7d, 0x07, 0x7f, 0x6f, 0x77, 0x7c,
      0x39, 0x5e, 0x79, 0x71
    ];

    /**
     * TM1637 LED display
     */
    export class TM1637LEDs {
      buf: Buffer;
      clk: DigitalPin;
      dio: DigitalPin;
      ledOn: number;
      brightness: number;
      count: number; // number of LEDs

      initialize(): void {
        pins.digitalWritePin(this.clk, 0);
        pins.digitalWritePin(this.dio, 0);
        this.ledOn = 8;
        this.buf = pins.createBuffer(this.count);
        this.clear();
      }

      _start() {
        pins.digitalWritePin(this.dio, 0);
        pins.digitalWritePin(this.clk, 0);
      }

      _stop() {
        pins.digitalWritePin(this.dio, 0);
        pins.digitalWritePin(this.clk, 1);
        pins.digitalWritePin(this.dio, 1);
      }

      _writeDataCommand() {
        this._start();
        this._write_byte(TM1637_CMD1);
        this._stop();
      }

      _write_dsp_ctrl() {
        this._start();
        this._write_byte(TM1637_CMD3 | this.ledOn | this.brightness);
        this._stop();
      }

      _write_byte(b: number) {
        for (let i = 0; i < 8; i++) {
          pins.digitalWritePin(this.dio, (b >> i) & 1);
          pins.digitalWritePin(this.clk, 1);
          pins.digitalWritePin(this.clk, 0);
        }
        pins.digitalWritePin(this.clk, 1);
        pins.digitalWritePin(this.clk, 0);
      }

      /**
       * set TM1637 intensity, range is [0-8], 0 is off.
       * @param value the brightness of the TM1637, eg: 7
       */
      //% subcategory="7-Segment" weight=1 color=#5c68a6 icon="\uf25c"
      //% blockId="bp_7segment_set_intensity" block="%tm|set intensity %val"
      //% weight=50 blockGap=8
      intensity(value: number = 7) {
        if (value < 1) {
          this.off();
          return;
        }
        if (value > 8) value = 8;
        this.ledOn = 8;
        this.brightness = value - 1;
        this._writeDataCommand();
        this._write_dsp_ctrl();
      }

      /**
       * set data to TM1637, with given bit
       */
      _dat(bit: number, dat: number) {
        this._writeDataCommand();
        this._start();
        this._write_byte(TM1637_CMD2 | bit % this.count);
        this._write_byte(dat);
        this._stop();
        this._write_dsp_ctrl();
      }

      /**
       * show a number in given position.
       * @param num number will show, eg: 5
       * @param bit the position of the LED, eg: 0
       */
      //% subcategory="7-Segment" weight=1 color=#5c68a6 icon="\uf25c"
      //% blockId="bp_7segment_show_bit" block="%tm|show digit %num |at %bit"
      //% weight=90 blockGap=8
      showBit(num: number = 5, bit: number = 0) {
        this.buf[bit % this.count] = _SEGMENTS[num % 16];
        this._dat(bit, _SEGMENTS[num % 16]);
      }

      /**
       * show a number.
       * @param num is a number, eg: 0
       */
      //% subcategory="7-Segment" weight=1 color=#5c68a6 icon="\uf25c"
      //% blockId="bp_7segment_show_num" block="%tm|show number %num"
      //% weight=91 blockGap=8
      showNumber(num: number = 0) {
        if (num < 0) {
          this._dat(0, 0x40); // '-'
          num = -num;
        } else this.showBit(Math.idiv(num, 1000) % 10);
        this.showBit(num % 10, 3);
        this.showBit(Math.idiv(num, 10) % 10, 2);
        this.showBit(Math.idiv(num, 100) % 10, 1);
      }

      /**
       * show a hex number.
       * @param num is a hex number, eg: 0
       */
      //% subcategory="7-Segment" weight=1 color=#5c68a6 icon="\uf25c"
      //% blockId="bp_7segment_show_hex" block="%tm|show hex number %num"
      //% weight=90 blockGap=8
      showHex(num: number = 0) {
        if (num < 0) {
          this._dat(0, 0x40); // '-'
          num = -num;
        } else this.showBit((num >> 12) % 16);
        this.showBit(num % 16, 3);
        this.showBit((num >> 4) % 16, 2);
        this.showBit((num >> 8) % 16, 1);
      }

      /**
       * show or hide dot point.
       * @param show is show/hide dp, eg: true
       */
      //% subcategory="7-Segment" weight=1 color=#5c68a6 icon="\uf25c"
      //% blockId="bp_7segment_show_colons" block="%tm|colons(:) show %show"
      //% weight=70 blockGap=8
      showColons(show: boolean = true) {
        let bit = 1;
        bit = bit % this.count;
        if (show) this._dat(bit, this.buf[bit] | 0x80);
        else this._dat(bit, this.buf[bit] & 0x7f);
      }

      /**
       * clear LED.
       */
      //% subcategory="7-Segment" weight=1 color=#5c68a6 icon="\uf25c"
      //% blockId="bp_7segment_clear" block="clear %tm"
      //% weight=80 blockGap=8
      clear() {
        for (let i = 0; i < this.count; i++) {
          this._dat(i, 0);
          this.buf[i] = 0;
        }
      }

      /**
       * turn on LED.
       */
      //% subcategory="7-Segment" weight=1 color=#5c68a6 icon="\uf25c"
      //% blockId="bp_7segment_on" block="turn on %tm"
      //% weight=86 blockGap=8
      on() {
        this.ledOn = 8;
        this._writeDataCommand();
        this._write_dsp_ctrl();
      }

      /**
       * turn off LED.
       */
      //% subcategory="7-Segment" weight=1 color=#5c68a6 icon="\uf25c"
      //% blockId="bp_7segment_off" block="turn off %tm"
      //% weight=85 blockGap=8
      off() {
        this.ledOn = 0;
        this._writeDataCommand();
        this._write_dsp_ctrl();
      }
    }

    /**
     * create a TM1637 object.
     * @param clk the CLK pin for TM1637, eg: DigitalPin.P12
     * @param dio the DIO pin for TM1637, eg: DigitalPin.P13
     * @param intensity the brightness of the LED, eg: 7
     * @param count the count of the LED, eg: 4
     */
    //% subcategory="7-Segment" weight=1 color=#5c68a6 icon="\uf25c"
    //% weight=200 blockGap=8
    //% blockId="bp_7segment_create" block="CLK %clk|DIO %dio|intensity %intensity|LED count %count"
    //% intensity.min=0 intensity.max=7
    //% count.min=1 count.max=4
    //% clk.fieldEditor="gridpicker"
    //% dio.fieldEditor="gridpicker"
    //% blockSetVariable=tm
    export function create(
      clk: DigitalPin = DigitalPin.P12,
      dio: DigitalPin = DigitalPin.P13,
      intensity: number = 7,
      count: number = 4
    ): TM1637LEDs {
      let tm = new TM1637LEDs();
      tm.clk = clk;
      tm.dio = dio;
      if (count < 1 || count > 5) count = 4;
      tm.count = count;
      tm.brightness = intensity;
      tm.initialize();
      return tm;
    }
  }
}
