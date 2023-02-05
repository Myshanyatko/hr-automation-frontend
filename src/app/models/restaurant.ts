import { RestStatus } from './restStatus';
import { Review } from './review';
import {Сoordinates} from './сoordinates'
export interface Restaurant {
    id: number,
    name: String, //название рестика
    rating: number, //звезды
    statusId: number, //id статусa (ресторан, кафе...)
    check: number, //средний чек
    address: String, //адрес рестика ('Ленина 1')
    lat: number,
    lng: number, //координаты в гугл мапе{lat: 5.456564, lng: 5.353354}
    reviews: Review[]  //отзывы
}