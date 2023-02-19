
import { Restaurant } from './restaurant';
import { shortRest } from './shortRest';
export interface Build{
    id: number,
    address: string,
    lat: number,
    lng: number,
    restaurants: shortRest[]
}