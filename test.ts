/**
 * BP Lab Components Comprehensive Test
 * Tests all BP Lab components: LCD, 7-Segment Display, DHT11,
 * Servo 360, Soil Moisture Sensor and Ultrasonic Sensor
 */

// Core test variables
let testRunning = true;
let currentTest = "";
let testSuccess = true;

/**
 * LCD Display Test Functions
 */
function testLCD() {
  currentTest = "LCD";
  basic.showString("LCD");

  // Initialize LCD with auto-detect address
  bplab.lcd.initialize(bplab.lcd.LCDAddress.AutoDetect);

  // Basic display test
  bplab.lcd.clear();
  bplab.lcd.showString("LCD Test", 0, 0);
  bplab.lcd.showString("Running...", 0, 1);
  basic.pause(1000);

  // Test display functions
  bplab.lcd.clear();
  bplab.lcd.showString("Display Number:", 0, 0);
  bplab.lcd.showNumber(12345, 0, 1);
  basic.pause(1500);

  // Test backlight control
  bplab.lcd.clear();
  bplab.lcd.showString("Backlight Test", 0, 0);
  basic.pause(500);
  bplab.lcd.backlightOff();
  basic.pause(1000);
  bplab.lcd.backlightOn();
  basic.pause(500);

  // Test display shift
  bplab.lcd.clear();
  bplab.lcd.showString("Shift Test", 0, 0);
  bplab.lcd.showString(">>>>>>", 5, 1);
  for (let i = 0; i < 3; i++) {
    basic.pause(300);
    bplab.lcd.shiftRight();
  }
  for (let i = 0; i < 3; i++) {
    basic.pause(300);
    bplab.lcd.shiftLeft();
  }

  // Test display on/off
  bplab.lcd.clear();
  bplab.lcd.showString("Display On/Off", 0, 0);
  basic.pause(500);
  bplab.lcd.off();
  basic.pause(1000);
  bplab.lcd.on();

  // Complete
  bplab.lcd.clear();
  bplab.lcd.showString("LCD Test", 0, 0);
  bplab.lcd.showString("Complete!", 0, 1);
  basic.pause(1000);
}

/**
 * 7-Segment Display Test Functions
 */
function test7Segment() {
  currentTest = "7-Segment";
  basic.showString("7SEG");

  // Create 7-segment display on pins P12 & P13
  let sevenSegment = bplab.sevenSegment.create(
    DigitalPin.P12,
    DigitalPin.P13,
    7,
    4
  );

  // Test showing numbers
  sevenSegment.clear();
  sevenSegment.showNumber(0);
  basic.pause(500);

  // Count up from 0 to 9
  for (let i = 0; i <= 9; i++) {
    sevenSegment.showNumber(i);
    basic.pause(300);
  }

  // Test specific digits
  sevenSegment.clear();
  basic.pause(300);
  sevenSegment.showBit(1, 0);
  basic.pause(300);
  sevenSegment.showBit(2, 1);
  basic.pause(300);
  sevenSegment.showBit(3, 2);
  basic.pause(300);
  sevenSegment.showBit(4, 3);
  basic.pause(1000);

  // Test brightness
  sevenSegment.showNumber(8888);
  for (let brightness = 1; brightness <= 8; brightness++) {
    sevenSegment.intensity(brightness);
    basic.pause(200);
  }

  // Test hex display
  sevenSegment.clear();
  basic.pause(500);
  sevenSegment.showHex(0xabcd);
  basic.pause(1000);

  // Test colons (if supported by the display)
  sevenSegment.clear();
  sevenSegment.showNumber(1234);
  sevenSegment.showColons(true);
  basic.pause(1000);
  sevenSegment.showColons(false);
  basic.pause(500);

  // Test on/off
  sevenSegment.off();
  basic.pause(1000);
  sevenSegment.on();
  basic.pause(500);

  // Complete
  sevenSegment.showNumber(8888);
  basic.pause(1000);
  sevenSegment.clear();
}

/**
 * DHT11 Sensor Test Functions
 */
function testDHT11() {
  currentTest = "DHT11";
  basic.showString("DHT11");

  // Define DHT11 pin
  let dht11Pin = DigitalPin.P2;

  // Read temperature and humidity
  let temperature = bplab.dht11.dht11value(
    dht11Pin,
    bplab.dht11.DHT11Type.TemperatureC
  );
  let humidity = bplab.dht11.dht11value(
    dht11Pin,
    bplab.dht11.DHT11Type.Humidity
  );

  // Display readings on microbit
  basic.showString("T:");
  basic.showNumber(temperature);
  basic.pause(1000);
  basic.showString("H:");
  basic.showNumber(humidity);

  // If LCD is connected, display on LCD
  if (currentTest === "DHT11") {
    // Try to initialize LCD
    try {
      bplab.lcd.initialize(bplab.lcd.LCDAddress.AutoDetect);
      bplab.lcd.clear();
      bplab.lcd.showString("Temp: " + temperature + "C", 0, 0);
      bplab.lcd.showString("Humidity: " + humidity + "%", 0, 1);
      basic.pause(3000);
    } catch (e) {
      // LCD not connected or failed
    }
  }

  basic.pause(1000);
}

/**
 * Servo 360 Test Functions
 */
function testServo360() {
  currentTest = "Servo360";
  basic.showString("SERVO");

  // Define servo pin
  let servoPin = bplab.servo360.ServoPin.P1;

  // Test one way full speed
  basic.showString("ONE");
  bplab.servo360.spinOneWay(servoPin);
  basic.pause(2000);

  // Test other way full speed
  basic.showString("OTHER");
  bplab.servo360.spinOtherWay(servoPin);
  basic.pause(2000);

  // Test variable speeds in one direction
  basic.showString("VAR");
  for (let speed = 0; speed <= 100; speed += 25) {
    bplab.servo360.spinOneWayWithSpeed(servoPin, speed);
    basic.pause(1000);
  }

  // Test variable speeds in other direction
  for (let speed = 0; speed <= 100; speed += 25) {
    bplab.servo360.spinOtherWayWithSpeed(servoPin, speed);
    basic.pause(1000);
  }

  // Turn off the motor
  basic.showString("OFF");
  bplab.servo360.turnOffMotor(servoPin);
  basic.pause(1000);
}

/**
 * Soil Moisture Sensor Test Functions
 */
function testSoilMoisture() {
  currentTest = "SoilMoisture";
  basic.showString("SOIL");

  // Define soil moisture pin
  let soilPin = bplab.soilMoisture.SoilMoisturePin.P0;

  // Read raw and percentage values
  let rawValue = bplab.soilMoisture.soilMoistureValue(
    soilPin,
    bplab.soilMoisture.ValueType.RAW
  );
  let percentValue = bplab.soilMoisture.soilMoistureValue(
    soilPin,
    bplab.soilMoisture.ValueType.PERCENTAGE
  );

  // Display on microbit
  basic.showString("RAW:");
  basic.showNumber(rawValue);
  basic.pause(1000);
  basic.showString("%:");
  basic.showNumber(percentValue);

  // If LCD is connected, display on LCD
  if (currentTest === "SoilMoisture") {
    // Try to initialize LCD
    try {
      bplab.lcd.initialize(bplab.lcd.LCDAddress.AutoDetect);
      bplab.lcd.clear();
      bplab.lcd.showString("Soil Raw: " + rawValue, 0, 0);
      bplab.lcd.showString("Moisture: " + percentValue + "%", 0, 1);
      basic.pause(3000);
    } catch (e) {
      // LCD not connected or failed
    }
  }

  basic.pause(1000);
}

/**
 * Ultrasonic Sensor Test Functions
 */
function testUltrasonic() {
  currentTest = "Ultrasonic";
  basic.showString("ULTRA");

  // Define ultrasonic pins
  let trigPin = DigitalPin.P14;
  let echoPin = DigitalPin.P15;

  // Perform measurements in different units
  let distanceCm = bplab.ultrasonic.ping(
    trigPin,
    echoPin,
    bplab.ultrasonic.PingUnit.Centimeters
  );
  basic.pause(100);
  let distanceInch = bplab.ultrasonic.ping(
    trigPin,
    echoPin,
    bplab.ultrasonic.PingUnit.Inches
  );

  // Display on microbit
  basic.showString("CM:");
  basic.showNumber(distanceCm);
  basic.pause(1000);
  basic.showString("IN:");
  basic.showNumber(distanceInch);

  // If LCD is connected, display on LCD
  if (currentTest === "Ultrasonic") {
    // Try to initialize LCD
    try {
      bplab.lcd.initialize(bplab.lcd.LCDAddress.AutoDetect);
      bplab.lcd.clear();
      bplab.lcd.showString("Distance: " + distanceCm + "cm", 0, 0);
      bplab.lcd.showString(distanceInch + " inches", 0, 1);
      basic.pause(3000);
    } catch (e) {
      // LCD not connected or failed
    }
  }

  // Continuous measurement mode (10 readings)
  for (let i = 0; i < 10; i++) {
    let distance = bplab.ultrasonic.ping(
      trigPin,
      echoPin,
      bplab.ultrasonic.PingUnit.Centimeters
    );
    basic.showNumber(distance);
    basic.pause(500);
  }
}

/**
 * Combined Test of All Components
 */
function testAllComponents() {
  // Display test start message
  basic.showString("ALL");

  // Test sequence
  testLCD();
  basic.pause(500);

  test7Segment();
  basic.pause(500);

  testDHT11();
  basic.pause(500);

  testServo360();
  basic.pause(500);

  testSoilMoisture();
  basic.pause(500);

  testUltrasonic();
  basic.pause(500);

  // Test complete
  basic.showString("DONE");
}

/**
 * Individual Component Test Selection via Buttons
 */
input.onButtonPressed(Button.A, function () {
  // Cycle through tests
  if (currentTest === "") {
    testLCD();
  } else if (currentTest === "LCD") {
    test7Segment();
  } else if (currentTest === "7-Segment") {
    testDHT11();
  } else if (currentTest === "DHT11") {
    testServo360();
  } else if (currentTest === "Servo360") {
    testSoilMoisture();
  } else if (currentTest === "SoilMoisture") {
    testUltrasonic();
  } else {
    testLCD();
  }
});

input.onButtonPressed(Button.B, function () {
  // Run full test sequence
  testAllComponents();
});

// Main program
basic.showString("BP TEST");
basic.showString("A:Next B:All");

// Start with LCD test
currentTest = "";
