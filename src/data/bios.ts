export interface BiosCode {
  id: string;
  pattern: string;
  meaning: string;
  type: 'AMI' | 'AWard';
}

export const BIOS_CODES: BiosCode[] = [
  // AMI Beep Codes
  { id: '1', type: 'AMI', pattern: '1 Beep Pendek', meaning: 'DRAM Flash Error / Normal POST' },
  { id: '2', type: 'AMI', pattern: '2 Beep Pendek', meaning: 'Memory parity checking error' },
  { id: '3', type: 'AMI', pattern: '3 Beep Pendek', meaning: 'Basic memory 64K address check error' },
  { id: '4', type: 'AMI', pattern: '4 Beep Pendek', meaning: 'System Timer error' },
  { id: '5', type: 'AMI', pattern: '5 Beep Pendek', meaning: 'Processor (CPU) error' },
  { id: '6', type: 'AMI', pattern: '6 Beep Pendek', meaning: 'Keyboard controller error / Gate A20 error' },
  { id: '7', type: 'AMI', pattern: '7 Beep Pendek', meaning: 'Virtual mode exception error' },
  { id: '8', type: 'AMI', pattern: '8 Beep Pendek', meaning: 'Display memory read/write test error (VGA)' },
  { id: '9', type: 'AMI', pattern: '9 Beep Pendek', meaning: 'ROM BIOS checksum error' },
  { id: '10', type: 'AMI', pattern: '10 Beep Pendek', meaning: 'CMOS shutdown read/write error' },
  { id: '11', type: 'AMI', pattern: '11 Beep Pendek', meaning: 'Cache Memory error' },
  { id: '12', type: 'AMI', pattern: '1 Beep Panjang, 3 Pendek', meaning: 'Memory test failure (Bad RAM)' },
  { id: '13', type: 'AMI', pattern: '1 Beep Panjang, 8 Pendek', meaning: 'Display test failure (Monitor/VGA)' },
  // AWard Beep Codes
  { id: '14', type: 'AWard', pattern: '1 Beep Panjang', meaning: 'Normal POST / Semua komponen sehat' },
  { id: '15', type: 'AWard', pattern: '1 Panjang, 2 Pendek', meaning: 'Video error (VGA rusak/lepas)' },
  { id: '16', type: 'AWard', pattern: '1 Panjang, 3 Pendek', meaning: 'Keyboard controller error' },
  { id: '17', type: 'AWard', pattern: 'Beep Terus Menerus', meaning: 'RAM atau VGA card tidak terpasang' },
];
