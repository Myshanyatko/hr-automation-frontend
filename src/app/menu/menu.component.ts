import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  showLoader = false;
  public menuItems = [
    { name: 'Сотрудники', url: 'users' },
    { name: 'FAQ', url: 'faq-list' },
    { name: 'Продукты', url: 'products' },
    { name: 'Рестораны', url: 'products' },
  ];

  constructor() {}
}
