export interface Pinout {
  id: string;
  name: string;
  description: string;
  pins: { pin: string; function: string }[];
}

export const PINOUT_DATA: Pinout[] = [
  {
    id: 'nodemcu',
    name: 'NodeMCU ESP8266 v3',
    description: 'Pinout referensi untuk modul NodeMCU Amica/Lolin.',
    pins: [
      { pin: 'D0', function: 'GPIO16, WAKE' },
      { pin: 'D1', function: 'GPIO5, I2C SCL' },
      { pin: 'D2', function: 'GPIO4, I2C SDA' },
      { pin: 'D3', function: 'GPIO0, FLASH' },
      { pin: 'D4', function: 'GPIO2, TXD1' },
      { pin: 'D5', function: 'GPIO14, HSPI CLK' },
      { pin: 'D6', function: 'GPIO12, HSPI MISO' },
      { pin: 'D7', function: 'GPIO13, HSPI MOSI' },
      { pin: 'D8', function: 'GPIO15, HSPI CS' },
      { pin: 'A0', function: 'ADC0 (Analog Input)' },
      { pin: 'TX', function: 'GPIO1, TXD0' },
      { pin: 'RX', function: 'GPIO3, RXD0' },
    ],
  },
  {
    id: 'esp32',
    name: 'ESP32 DevKit V1',
    description: 'Pinout referensi untuk modul ESP-WROOM-32 (30 PINS).',
    pins: [
      { pin: 'GPIO2', function: 'LED Built-in' },
      { pin: 'GPIO21', function: 'I2C SDA' },
      { pin: 'GPIO22', function: 'I2C SCL' },
      { pin: 'GPIO34', function: 'ADC / Input Only' },
      { pin: 'GPIO35', function: 'ADC / Input Only' },
      { pin: 'GPIO32', function: 'ADC / Touch' },
      { pin: 'GPIO33', function: 'ADC / Touch' },
      { pin: 'TX0', function: 'Serial TX' },
      { pin: 'RX0', function: 'Serial RX' },
      { pin: 'VIN', function: 'Power 5V' },
      { pin: 'GND', function: 'Ground' },
    ],
  },
];
