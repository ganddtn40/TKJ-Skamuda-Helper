export interface Sensor {
  id: string;
  name: string;
  description: string;
  pins: { name: string; desc: string }[];
  wiring: string;
}

export const SENSOR_DATA: Sensor[] = [
  {
    id: 'dht11',
    name: 'DHT11 (Suhu & Kelembapan)',
    description: 'Sensor digital untuk mengukur suhu udara dan kelembapan.',
    pins: [
      { name: 'VCC', desc: '3.3V - 5V' },
      { name: 'Data', desc: 'Digital Pin (MCU)' },
      { name: 'NC', desc: 'Not Connected' },
      { name: 'GND', desc: 'Ground' },
    ],
    wiring: 'VCC -> 3.3V, Data -> D2 (Digital), GND -> GND',
  },
  {
    id: 'hcsr04',
    name: 'HC-SR04 (Ultrasonic)',
    description: 'Sensor jarak menggunakan gelombang ultrasonik (2cm - 400cm).',
    pins: [
      { name: 'VCC', desc: '5V' },
      { name: 'Trig', desc: 'Digital Pin (Output)' },
      { name: 'Echo', desc: 'Digital Pin (Input)' },
      { name: 'GND', desc: 'Ground' },
    ],
    wiring: 'VCC -> 5V, Trig -> D5, Echo -> D6, GND -> GND',
  },
  {
    id: 'relay',
    name: 'Relay Module (1-Channel)',
    description: 'Saklar elektronik untuk mengontrol beban AC/DC besar.',
    pins: [
      { name: 'VCC', desc: '5V' },
      { name: 'GND', desc: 'Ground' },
      { name: 'IN', desc: 'Digital Pin (Control)' },
    ],
    wiring: 'VCC -> 5V, GND -> GND, IN -> D1',
  },
];
