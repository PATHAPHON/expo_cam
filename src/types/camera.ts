export type FilterId = 'normal' | 'bw' | 'vivid';

export interface FilterOption {
  id: FilterId;
  label: string;
  nameEn: string;
  iconName: string;
  description: string;
  color: string;
}

export interface CapturedPhoto {
  id: string;
  uri: string;
  width: number;
  height: number;
  filter: FilterId;
  timestamp: number;
}

export const FILTER_OPTIONS: FilterOption[] = [
  {
    id: 'normal',
    label: 'ปกติ',
    nameEn: 'Normal',
    iconName: 'aperture-outline',
    description: 'ภาพถ่ายปกติ ไม่ใส่ฟิลเตอร์',
    color: '#3B82F6',
  },
  {
    id: 'bw',
    label: 'ขาวดำ',
    nameEn: 'B&W Monochrome',
    iconName: 'contrast-outline',
    description: 'ภาพขาวดำ คลาสสิก ย้อนยุค',
    color: '#9CA3AF',
  },
  {
    id: 'vivid',
    label: 'สดใส',
    nameEn: 'Vivid Warm',
    iconName: 'sparkles-outline',
    description: 'โทนสีอุ่น อบอุ่น สดใส มีมิติ',
    color: '#F59E0B',
  },
];
