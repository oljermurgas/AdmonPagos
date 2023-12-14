import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../services/menus/menu.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss']
})
export class MenuLateralComponent implements OnInit {
  servicesOpen: boolean = false;

  constructor(private router : Router,
              private menuService: MenuService) { }
  ngOnInit(): void {}


  toggleServices() {
    console.log("Estado : ",  this.servicesOpen);
    this.servicesOpen = !this.servicesOpen;
  }

  navigateTo(opcion: string) {
    this.menuService.setOpcionMenu(opcion);
    // this.router.navigate(['/menu-usuario/factura-registro']);
  }

}
