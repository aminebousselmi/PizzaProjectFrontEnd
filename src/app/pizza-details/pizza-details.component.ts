import { Component, OnInit } from '@angular/core';
import { Pizza } from '../pizza';
import { ActivatedRoute } from '@angular/router';
import { PizzaService } from '../pizza.service';
import { PayPalConfig, PayPalEnvironment, PayPalIntegrationType } from 'ngx-paypal';
import { Observable } from 'rxjs';
import { OrderService } from '../REST';

@Component({
  selector: 'app-pizza-details',
  templateUrl: './pizza-details.component.html',
  styleUrls: ['./pizza-details.component.css']
})
export class PizzaDetailsComponent implements OnInit {
    public payPalConfig?: PayPalConfig;
    pizza: Pizza;
 

  constructor(private activateRoute: ActivatedRoute,private pizzaService: PizzaService,private orderService:OrderService) { }

  ngOnInit() {
      this.getPizza();
  }
  getPizza(){
    const id = +this.activateRoute.snapshot.paramMap.get('id');
    this.pizzaService.PizzaByID(id)
        .subscribe(pizza =>{ this.pizza = pizza;this.initConfig()})
    
}


    initConfig(): void {
        this.payPalConfig = new PayPalConfig(PayPalIntegrationType.ClientSideREST, PayPalEnvironment.Sandbox, {
          commit: true,
          client: {
            sandbox: 'AbId54aE1WuNg_bKylX4OB-ATI9KpvFEa6ypuQULvP7XwJVmNqt6jD-ewJKMFhuhR31ohAZQIx-rQMRV'
          },
          button: {
            label: 'paypal',
          },
          onPaymentComplete: (data, actions) => {
            console.log(data,actions);
          },
          onCancel: (data, actions) => {
            console.log('OnCancel');
          },
          onError: (err) => {
            console.log('OnError');
          },
          transactions: [{
            amount: {
              currency: 'EUR',
              total: this.pizza.price
            }
          }]
        });
      }


}
