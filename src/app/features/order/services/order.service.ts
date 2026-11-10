import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { order } from "../createorder/models/order";
import { Observable } from "rxjs";
import { CreateOrderResponse } from "../createorder/models/createorderresponse";
import { AuthService } from "../../auth/services/auth.service";
import { OrderSummary } from "../getorder/models/order-summary.model";
import { OrderDetails } from "../getorder/models/order-details.model";




@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);

  private readonly apiUrl =`${environment.apiUrls.order}/orders`;
 


   /* sendOrder(orderData: order): Observable<CreateOrderResponse> {

         const token = this.authService.getToken();
         const headers = {
              Authorization: `Bearer ${token}`
         }; 

          return this.http.post<CreateOrderResponse>(
              this.apiUrl + "/createorderwithitems",
              orderData,
              { headers }
          );
      } */

    
    sendOrder(orderData: order): Observable<CreateOrderResponse> {

          return this.http.post<CreateOrderResponse>(
              this.apiUrl + "/createorderwithitems",orderData);
      } 


    getOrdersByCustomerId(customerId: string): Observable<OrderSummary[]> {
          return this.http.get<OrderSummary[]>(
               `${this.apiUrl}/GetByIdCustomer/${customerId}`);
    }

  
    getOrderById(orderId: string): Observable<OrderDetails> {
      return this.http.get<OrderDetails>(
        `${this.apiUrl}/GetById/${orderId}`
      );
    }


}


