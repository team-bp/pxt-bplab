> [👈 Back](../README.md)

# 7-Segment Display Extension for MakeCode

![7-Segment Image](./images/seven-segment-icon.png)

This extension allows you to control TM1637 based 4-digit 7-segment LED displays with the micro:bit.

This extension is an enhanced version of the code originally developed under the MIT License by [makecode-extensions/TM1637](https://github.com/makecode-extensions/bplab.sevenSegment.git).

We sincerely appreciate the efforts of the original developers who created the foundation for this extension.

- product page link: [https://bplab-us.com/microbit#sevenSegment](https://bplab-us.com/microbit#sevenSegment)

## 🚀 Features

- Easy control of TM1637 LED displays
- Support for up to 4 digits
- Display numbers and hexadecimal values
- Adjustable brightness control
- Show/hide decimal points
- Simple on/off control
- Can be registered as a MakeCode extension for easy use
- Support for Korean

## Blocks

### 1. Create Display Block #sevensegment-create

- 🔹 Description

  - Initializes a new TM1637 LED display
  - Sets up communication pins and initial brightness
  - Default LED count is 4 digits

- 🔹 Parameters

  - `clk`: Clock pin (default: P12)
  - `dio`: Data pin (default: P13)
  - `intensity`: Brightness level (0-7)
  - `count`: Number of digits (1-4)

- ✅ Usage example

  ```blocks
  let tm = bplab.sevenSegment.create(DigitalPin.P12, DigitalPin.P13, 7, 4)
  ```

### 2. Show Number Block #sevensegment-tm1637leds-shownumber

- 🔹 Description

  - Displays a decimal number
  - Handles negative numbers
  - Supports up to 4 digits

- ✅ Usage example

  ```blocks
  let tm = bplab.sevenSegment.create(DigitalPin.P12, DigitalPin.P13, 7, 4)
  tm.showNumber(1234)
  ```

### 3. Show Hex Number Block #sevensegment-tm1637leds-showhex

- 🔹 Description

  - Displays a hexadecimal number
  - Supports values from 0 to FFFF
  - Shows negative numbers with minus sign

- ✅ Usage example

  ```blocks
  let tm = bplab.sevenSegment.create(DigitalPin.P12, DigitalPin.P13, 7, 4)
  tm.showHex(0x0)
  ```

### 4. Show Digit Block #sevensegment-tm1637leds-showbit

- 🔹 Description

  - Shows a single digit at specified position
  - Position starts from 0 (leftmost)
  - Supports numbers 0-9 and hex digits A-F

- ✅ Usage example

  ```blocks
  let tm = bplab.sevenSegment.create(DigitalPin.P12, DigitalPin.P13, 7, 4)
  tm.showBit(5, 0)
  ```

### 5. Show Colons Block #sevensegment-tm1637leds-showcolons

- 🔹 Description

  - Shows or hides colons

- ✅ Usage example

  ```blocks
  let tm = bplab.sevenSegment.create(DigitalPin.P12, DigitalPin.P13, 7, 4)
  tm.showColons(true)
  ```

### 6. Set Intensity Block #sevensegment-tm1637leds-intensity

- 🔹 Description

  - Sets the brightness of the display
  - Range: 0 (off) to 8 (brightest)

- ✅ Usage example

  ```blocks
  let tm = bplab.sevenSegment.create(DigitalPin.P12, DigitalPin.P13, 7, 4)
  tm.intensity(5)
  ```

### 7. Clear Display Block #sevensegment-tm1637leds-clear

- 🔹 Description

  - Clears all digits on the display
  - Resets internal buffer

- ✅ Usage example

  ```blocks
  let tm = bplab.sevenSegment.create(DigitalPin.P12, DigitalPin.P13, 7, 4)
  tm.clear()
  ```

### 8. Display ON/OFF Blocks #sevensegment-tm1637leds-on #sevensegment-tm1637leds-off

- 🔹 Description

  - Controls display power state
  - Maintains display memory when off

- ✅ Usage example

  ```blocks
  let tm = bplab.sevenSegment.create(DigitalPin.P12, DigitalPin.P13, 7, 4)
  tm.on()
  tm.off()
  ```

## 📜 License

MIT License

## 💡 About BPLab

BPLab is a specialized company that provides coding education that anyone can easily learn. We provide in-person and online coding education for children, teens, adults, institutions, organizations, small groups, and schools in Korea in various fields such as IoT, artificial intelligence, micro:bit and Arduino.

We are also leading the way in developing and distributing coding education kits that allow learners to build, program, and experience the principles of coding. These kits utilize microcontrollers such as Arduino and micro:bit, as well as various sensors. This micro:bit extension is available for use in courses taught by BPLab.

Visit our websites:

- Korea: [https://bplab.kr](https://bplab.kr)
- Global: [https://bplab-us.com](https://bplab-us.com)
- Japan: [https://bplab-jp.com](https://bplab-jp.com)

## 📍 Supported targets

- for PXT/microbit

<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
