/**
* BP Lab Extensions
*/
//% weight=1 color=#0066CB icon="\uf0ad" block="BP Lab"
//% groups='["7-Segment"]'
namespace BPLAB {
    export let TM1637_CMD1 = 0x40;
    export let TM1637_CMD2 = 0xC0;
    export let TM1637_CMD3 = 0x80;
    export let _SEGMENTS = [0x3F, 0x06, 0x5B, 0x4F, 0x66, 0x6D, 0x7D, 0x07, 0x7F, 0x6F, 0x77, 0x7C, 0x39, 0x5E, 0x79, 0x71];

    /**
     * TM1637 LED display
     */
    export class TM1637LEDs {
        buf: Buffer;
        clk: DigitalPin;
        dio: DigitalPin;
        _ON: number;
        brightness: number;
        count: number;  // number of LEDs

        /**
         * initial TM1637
         */
        init(): void {
            pins.digitalWritePin(this.clk, 0);
            pins.digitalWritePin(this.dio, 0);
            this._ON = 8;
            this.buf = pins.createBuffer(this.count);
            // this.clear(); // 에러 나서 주석 처리했는데 확인 필요함
            // 위에서 주석처리한 한 줄 block 쪽에서 코드만 가져옴
            for (let i = 0; i < this.count; i++) {
                this._dat(i, 0)
                this.buf[i] = 0
            }
        }

        /**
         * Start
         */
        _start() {
            pins.digitalWritePin(this.dio, 0);
            pins.digitalWritePin(this.clk, 0);
        }

        /**
         * Stop
         */
        _stop() {
            pins.digitalWritePin(this.dio, 0);
            pins.digitalWritePin(this.clk, 1);
            pins.digitalWritePin(this.dio, 1);
        }

        /**
         * send command1
         */
        _write_data_cmd() {
            this._start();
            this._write_byte(TM1637_CMD1);
            this._stop();
        }

        /**
         * send command3
         */
        _write_dsp_ctrl() {
            this._start();
            this._write_byte(TM1637_CMD3 | this._ON | this.brightness);
            this._stop();
        }

        /**
         * send a byte to 2-wire interface
         */
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
         * set data to TM1637, with given bit
         */
        _dat(bit: number, dat: number) {
            this._write_data_cmd();
            this._start();
            this._write_byte(TM1637_CMD2 | (bit % this.count))
            this._write_byte(dat);
            this._stop();
            this._write_dsp_ctrl();
        }

    }
}