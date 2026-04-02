export interface WireDetails {
  id: number;
  color: string;
  hex: string;
  name: string;
}

export const STRAIGHT_CABLE: WireDetails[] = [
  { id: 1, color: 'Putih Orange', hex: '#ffedd5', name: 'White/Orange' }, // Using lighter shade for white-*
  { id: 2, color: 'Orange', hex: '#f97316', name: 'Orange' },
  { id: 3, color: 'Putih Hijau', hex: '#dcfce7', name: 'White/Green' },
  { id: 4, color: 'Biru', hex: '#3b82f6', name: 'Blue' },
  { id: 5, color: 'Putih Biru', hex: '#dbeafe', name: 'White/Blue' },
  { id: 6, color: 'Hijau', hex: '#22c55e', name: 'Green' },
  { id: 7, color: 'Putih Coklat', hex: '#f5f5f4', name: 'White/Brown' },
  { id: 8, color: 'Coklat', hex: '#78350f', name: 'Brown' },
];

export const CROSS_CABLE_A = STRAIGHT_CABLE;
export const CROSS_CABLE_B: WireDetails[] = [
  { id: 1, color: 'Putih Hijau', hex: '#dcfce7', name: 'White/Green' },
  { id: 2, color: 'Hijau', hex: '#22c55e', name: 'Green' },
  { id: 3, color: 'Putih Orange', hex: '#ffedd5', name: 'White/Orange' },
  { id: 4, color: 'Biru', hex: '#3b82f6', name: 'Blue' },
  { id: 5, color: 'Putih Biru', hex: '#dbeafe', name: 'White/Blue' },
  { id: 6, color: 'Orange', hex: '#f97316', name: 'Orange' },
  { id: 7, color: 'Putih Coklat', hex: '#f5f5f4', name: 'White/Brown' },
  { id: 8, color: 'Coklat', hex: '#78350f', name: 'Brown' },
];
