import { Component, OnInit, OnDestroy } from '@angular/core';
import { FacturaService } from '../services/shared/services/factura.services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-factura-listado',
  templateUrl: './factura-listado.component.html',
  styleUrls: ['./factura-listado.component.scss']
})
export class FacturaListadoComponent implements OnInit, OnDestroy {
  endPoint: string = '/Factura';
  datosFacturas: any[] = [];
  private facturaSubscription: Subscription = new Subscription();


  constructor(private facturaService: FacturaService) {
    this.datosFacturas = [];
  }

  ngOnInit(): void {
    this.facturaSubscription = this.facturaService.obtenerListadoFacturas(this.endPoint).subscribe(data => {
      this.datosFacturas = data;
    });
  }

  ngOnDestroy(): void {
    // Asegúrate de darte de baja de la suscripción cuando el componente se destruye.
    if (this.facturaSubscription) {
      this.facturaSubscription.unsubscribe();
    }
  }
}
