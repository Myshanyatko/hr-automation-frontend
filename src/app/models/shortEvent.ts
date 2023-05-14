export interface ShortEvent {
  id: number;
  name: string;
  address: string;
  format: 'ONLINE' | 'OFFLINE' | 'COMBINED';
  date: Date;
  isOnline: boolean;
  pictureUrl: string;
}
