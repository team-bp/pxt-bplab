namespace bplab {
    /**
     * I2C LCD 1602
     */
    //% block="LCD" weight=1 color=#0fbc11 icon="\uf26c"
    export namespace lcd {
        let address: number; // 0x3F: PCF8574A, 0x27: PCF8574
        let backlightControlValue: number; // 8: ON, 0: OFF
        let registerSelectionValue: number; // 0: Command, 1: Data

        export enum I2CLCDAddress {
            //% block="auto detect"
            AutoDetect = 0,
            //% block="PCF8574(0x27)"
            PCF8574 = 39, // 0x27
            //% block="PCF8574A(0x3F)"
            PCF8574A = 63 // 0x3f
        }

        export enum LCDCommand {
            NOP = 0x00, // NOP(No Operation): Do nothing. Use for delay or synchronization
            ClearDisplay = 0x01, // Clear everything on the screen and move the cursor to the home position (0,0). Wait 1.52 ms after execution
            EntryModeSet = 0x06, // Set cursor movement direction to right. Cursor automatically moves to the right when typing text

            DisplayOff = 0x08, // Turn off the display. Data is retained
            DisplayOn = 0x0c, // Turn on the screen and hide the cursor
            ShiftDisplayLeft = 0x18, // Move full-screen content one space to the left
            ShiftDisplayRight = 0x1c, // Move full-screen content one space to the right

            Set4bitMode = 0x28, // Set 4-bit mode, two-line display, 5x8 dot font
            Set4bitModeInit = 0x33, // Initiate 4-bit mode initialization.

            AddrTo0 = 0x80 // Move the cursor to the start of the first line Set the DDRAM address to 0
        }

        // LCD register setup
        function _setRegister(data: number) {
            pins.i2cWriteNumber(address, data, NumberFormat.Int8LE);
            basic.pause(1);
        }

        // Send data through I2C bus
        function _sendNibble(data: number) {
            data = data & 0xf0;
            data = data + backlightControlValue + registerSelectionValue;
            _setRegister(data);
            _setRegister(data + 4);
            _setRegister(data);
        }

        // Send command
        function _sendCommand(command: number) {
            registerSelectionValue = 0;
            _sendNibble(command);
            _sendNibble(command << 4);
        }

        // Send data
        function _sendData(data: number) {
            registerSelectionValue = 1;
            _sendNibble(data);
            _sendNibble(data << 4);
        }

        // Auto detect LCD address
        function _autoDetectAddress() {
            let continueSearch = true;
            let currentAddress = 0x20;
            let response1 = 0,
                response2 = 0;

            // Search first address range (0x20 ~ 0x27)
            while (continueSearch && currentAddress < 0x28) {
                pins.i2cWriteNumber(currentAddress, -1, NumberFormat.Int32LE);
                response1 =
                    pins.i2cReadNumber(currentAddress, NumberFormat.Int8LE) % 16;
                pins.i2cWriteNumber(currentAddress, 0, NumberFormat.Int16LE);
                response2 = pins.i2cReadNumber(currentAddress, NumberFormat.Int8LE);

                if (response1 == 7 && response2 == 0) {
                    continueSearch = false; // Device found
                } else {
                    currentAddress += 1; // Check next address
                }
            }
            if (!continueSearch) return currentAddress; // Device found in first range

            // Search second address range (0x38 ~ 0x3F)
            currentAddress = 0x38;
            while (continueSearch && currentAddress < 0x40) {
                pins.i2cWriteNumber(currentAddress, -1, NumberFormat.Int32LE);
                response1 =
                    pins.i2cReadNumber(currentAddress, NumberFormat.Int8LE) % 16;
                pins.i2cWriteNumber(currentAddress, 0, NumberFormat.Int16LE);
                response2 = pins.i2cReadNumber(currentAddress, NumberFormat.Int8LE);

                if (response1 == 7 && response2 == 0) {
                    continueSearch = false; // Device found
                } else {
                    currentAddress += 1; // Check next address
                }
            }
            if (!continueSearch)
                return currentAddress; // Device found in second range
            else return 0; // No device found
        }

        /**
         * Initialize LCD and set I2C address. PCF8574/PCF8574A address is 39/63
         * @param address LCD i2c address 
         */
        //% subcategory="LCD" weight=1 color=#0fbc11 icon="\uf26c"
        //% blockId="bp_lcd_initialize" block="LCD initialize with address %addr"
        //% weight=100 blockGap=8
        //% addr.defl=bplab.lcd.I2CLCDAddress.PCF8574
        export function initialize(addr: I2CLCDAddress = I2CLCDAddress.PCF8574): void {
            if (addr == 0) address = _autoDetectAddress();
            else address = addr;
            backlightControlValue = 8;
            registerSelectionValue = 0;

            _sendCommand(LCDCommand.Set4bitModeInit); // Set 4-bit mode
            basic.pause(5);
            _sendNibble(0x30);
            basic.pause(5);
            _sendNibble(0x20);
            basic.pause(5);
            _sendCommand(LCDCommand.Set4bitMode); // Set mode
            _sendCommand(LCDCommand.DisplayOn);
            _sendCommand(LCDCommand.EntryModeSet);
            _sendCommand(LCDCommand.ClearDisplay); // Clear screen
        }

        /**
         * Display number at specified position on LCD
         * @param n number to display, eg: 10, 100, 200
         * @param x LCD column position, eg: 0
         * @param y LCD row position, eg: 0
         */
        //% subcategory="LCD" weight=1 color=#0fbc11 icon="\uf26c"
        //% blockId="bp_lcd_show_number" block="show number %n|at x %x|y %y"
        //% weight=90 blockGap=8
        //% x.min=0 x.max=15
        //% y.min=0 y.max=1
        export function showNumber(n: number, x: number, y: number): void {
            let s = n.toString();
            showString(s, x, y);
        }

        /**
         * Display string at specified position on LCD
         * @param s string to display, eg: "Hello"
         * @param x LCD column position, [0 - 15], eg: 0
         * @param y LCD row position, [0 - 1], eg: 0
         */
        //% subcategory="LCD" weight=1 color=#0fbc11 icon="\uf26c"
        //% blockId="bp_lcd_show_string" block="show string %s|at x %x|y %y"
        //% weight=90 blockGap=8
        //% x.min=0 x.max=15
        //% y.min=0 y.max=1
        export function showString(s: string, x: number, y: number): void {
            let a: number;

            if (y > 0) a = 0xc0;
            else a = 0x80;
            a += x;
            _sendCommand(a);

            for (let i = 0; i < s.length; i++) {
                _sendData(s.charCodeAt(i));
            }
        }

        /**
         * Turn on LCD
         */
        //% subcategory="LCD" weight=1 color=#0fbc11 icon="\uf26c"
        //% blockId="bp_lcd_on" block="turn on LCD"
        //% weight=81 blockGap=8
        export function on(): void {
            _sendCommand(LCDCommand.DisplayOn);
        }

        /**
         * Turn off LCD
         */
        //% subcategory="LCD" weight=1 color=#0fbc11 icon="\uf26c"
        //% blockId="bp_lcd_off" block="turn off LCD"
        //% weight=80 blockGap=8
        export function off(): void {
            _sendCommand(LCDCommand.DisplayOff);
        }

        /**
         * Clear all display contents
         */
        //% subcategory="LCD" weight=1 color=#0fbc11 icon="\uf26c"
        //% blockId="bp_lcd_clear" block="clear LCD"
        //% weight=85 blockGap=8
        export function clear(): void {
            _sendCommand(LCDCommand.ClearDisplay);
        }

        /**
         * Turn on LCD backlight
         */
        //% subcategory="LCD" weight=1 color=#0fbc11 icon="\uf26c"
        //% blockId="bp_lcd_backlight_on" block="turn on backlight"
        //% weight=71 blockGap=8
        export function backlightOn(): void {
            backlightControlValue = 8;
            _sendCommand(LCDCommand.NOP);
        }

        /**
         * Turn off LCD backlight
         */
        //% subcategory="LCD" weight=1 color=#0fbc11 icon="\uf26c"
        //% blockId="bp_lcd_backlight_off" block="turn off backlight"
        //% weight=70 blockGap=8
        export function backlightOff(): void {
            backlightControlValue = 0;
            _sendCommand(LCDCommand.NOP);
        }

        /**
         * Shift display left
         */
        //% subcategory="LCD" weight=1 color=#0fbc11 icon="\uf26c"
        //% blockId="bp_lcd_shift_left" block="shift left"
        //% weight=61 blockGap=8
        export function shiftLeft(): void {
            _sendCommand(LCDCommand.ShiftDisplayLeft);
        }

        /**
         * Shift display right
         */
        //% subcategory="LCD" weight=1 color=#0fbc11 icon="\uf26c"
        //% blockId="bp_lcd_shift_right" block="shift right"
        //% weight=60 blockGap=8
        export function shiftRight(): void {
            _sendCommand(LCDCommand.ShiftDisplayRight);
        }
    }
}