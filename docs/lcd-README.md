> [👈 Back](../README.md)

# LCD Extension for MakeCode

![LCD Image](./images/lcd-icon.png)

This extension allows you to control an I2C LCD1602 display with the micro:bit.

This extension is an enhanced version of the code originally developed under the MIT License by [makecode-extensions/i2cLCD1602](https://github.com/makecode-extensions/i2cLCD1602.git).

We sincerely appreciate the efforts of the original developers who created the foundation for this extension.

- product page link: [https://bplab-us.com/microbit#lcd](https://bplab-us.com/microbit#lcd)

## 🚀 Features

- Easily control I2C LCD1602 display from microcontroller
- Can display numbers, strings using MakeCode blocks
- Also supports LCD backlight and screen pan function
- Can be registered as a MakeCode extension for easy use
- Support for Korean

## Blocks

### 1. LCD Initialization Block #lcd-initialize

- 🔹 Description

  - Initializes the LCD and sets the I2C address.
  - If Addr == 0, it will automatically seek the I2C address.
  - Sets to 4-bit mode and performs basic LCD setup.

- 🔹 Internal behavior

  - Call AutoAddr() to auto-detect I2C address (or use entered address)
  - Set 4-bit mode (cmd(0x33), cmd(0x28))
  - Enable backlight (BK = 8)
  - Clear screen (cmd(0x01))
  - Set Cursor Movement Mode (cmd(0x06))
  - Enable LCD (cmd(0x0C))

- ✅ Usage examples

  ```blocks
  bplab.lcd.initialize(bplab.lcd.LCDAddress.PCF8574)
  ```

  ```blocks
  bplab.lcd.initialize(bplab.lcd.LCDAddress.AutoDetect)
  ```

### 2. Number display block #lcd-shownumber

- 🔹 Description

  - This block outputs a number at a specific position (x, y).
  - It calls ShowString() after converting the number to a string.

- ✅ Usage example

  ```blocks
  bplab.lcd.initialize(bplab.lcd.LCDAddress.AutoDetect)
  bplab.lcd.showNumber(123, 0, 0)
  ```

### 3. String display block #lcd-showstring

- 🔹 Description

  - Displays a string at a specific position (x, y).

- 🔹 Internal behavior

  - cmd(a) → set cursor position (0x80 + x or 0xC0 + x)
  - dat(s.charCodeAt(i)) → Send character to LCD one by one

- ✅ Usage example

  ```blocks
  bplab.lcd.initialize(bplab.lcd.LCDAddress.AutoDetect)
  bplab.lcd.showString('Hello', 0, 0)
  bplab.lcd.showString('World', 5, 1)
  ```

### 4. LCD ON/OFF block #lcd-on #lcd-off

- 🔹 Description

  - on() → command to switch on the LCD screen (cmd(0x0C))
  - off() → Command to switch off the LCD screen (cmd(0x08))

- ✅ Usage example

  ```blocks
  bplab.lcd.initialize(bplab.lcd.LCDAddress.AutoDetect)
  bplab.lcd.on()
  bplab.lcd.off()
  ```

### 5. Screen clear block #lcd-clear

- 🔹 Description

  - Initializes the LCD screen by sending the cmd(0x01) command.
  - Move the cursor to the (0,0) position.

- ✅ Usage example

  ```blocks
  bplab.lcd.initialize(bplab.lcd.LCDAddress.AutoDetect)
  bplab.lcd.clear()
  ```

### 6. Backlight ON/OFF block #lcd-backlighton #lcd-backlightoff

- 🔹 Description

  - BacklightOn() → LCD backlight on (BK = 8)
  - BacklightOff() → turn off LCD backlight (BK = 0)

- ✅ Usage example

  ```blocks
  bplab.lcd.initialize(bplab.lcd.LCDAddress.AutoDetect)
  bplab.lcd.backlightOn()
  bplab.lcd.backlightOff()
  ```

### 7. Screen Shift block #lcd-shiftleft #lcd-shiftright

- 🔹 Description

  - shiftLeft() → Shift LCD screen left (cmd(0x18))
  - shiftRight() → Shift the LCD screen to the right (cmd(0x1C))

- ✅ Usage example

  ```blocks
  bplab.lcd.initialize(bplab.lcd.LCDAddress.AutoDetect)
  bplab.lcd.shiftLeft()
  bplab.lcd.shiftRight()
  ```

### 8. Pad Blank block #lcd-padblank

- 🔹 Description

  - padBlank(value: number, digitLength: number) → Format a number as a string with left padding using spaces, so the total width matches the given digit length.

- ✅ Usage example

  ```blocks
  bplab.lcd.initialize(bplab.lcd.LCDAddress.AutoDetect)
  bplab.lcd.showString(bplab.lcd.padBlank(7, 4), 0, 0)
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
