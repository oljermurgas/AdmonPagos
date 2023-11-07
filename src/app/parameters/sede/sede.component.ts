import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sede',
  templateUrl: './sede.component.html',
  styleUrls: ['./sede.component.scss']
})

export class SedeComponent  {
  endPointRuta: string ='Sede';
  items: any =[];

  constructor() { }

  ngOnInit(): void {
    }


}
