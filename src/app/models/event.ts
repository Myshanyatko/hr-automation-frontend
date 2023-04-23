import { Material } from './material';
export interface Event {
  id: number;
  name: string;
  address: string | null;
  date: Date;
  materials: Material[] | null;
  description: string | null;
  format: 'ONLINE' | 'OFFLINE' | 'COMBINED';
  pictureUrl: string;
  cityId: number;
  lat: number | null;
  lng: number | null;
}
