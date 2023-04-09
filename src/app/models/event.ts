export interface Event {
  id: number;
  name: string;
  address: string | null
  date: Date;
  materials: string[] | null;
  description: string | null;
  online: boolean;
  pictureUrl: string;
  cityId: number
}
