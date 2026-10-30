import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { order } from "../models/order";
import { Observable } from "rxjs";
import { CreateOrderResponse } from "../models/createorderresponse";
import { AuthService } from "../../auth/services/auth.service";




@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);

  private readonly apiUrl =`${environment.apiUrls.order}/orders`;
 


   sendOrder(orderData: order): Observable<CreateOrderResponse> {

          const token = this.authService.getToken();

          const headers = {
              Authorization: `Bearer ${token}`
          };

          return this.http.post<CreateOrderResponse>(
              this.apiUrl + "/createorderwithitems",
              orderData,
              { headers }
          );
}


}


