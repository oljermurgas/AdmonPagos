import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menus/menu.service';

@Component({
  selector: 'app-menu-usuario',
  templateUrl: './menu-usuario.component.html',
  styleUrls: ['./menu-usuario.component.scss']
})
export class MenuUsuarioComponent implements OnInit {
  opcionMenu: string = '';
  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.menuService.getOpcionMenu().subscribe((opcion: string) => {
      this.opcionMenu = opcion;
    });
  }

}
