import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home',
      active: false
    },
    {
      title: 'Voorspelling',
      url: '/prediction',
      icon: 'list',
      active: false
    }
  ];
}