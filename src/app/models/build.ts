
import { Restaurant } from './restaurant';
import { ShortRest } from './shortRest';
export interface Build{
    id: number,
    address: string,
    lat: number,
    lng: number,
    restaurants: ShortRest[]
}