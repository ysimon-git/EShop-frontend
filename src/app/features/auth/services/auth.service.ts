import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable, tap } from 'rxjs';


export interface LoginDto{
    email:string,
    password:string
}

export interface LoginResponse{
    token:string
}

export interface RegisterDto{
   firstname:string,
   name:string,
   email:string,
   password:string
}

export interface RegisterResponse{
  message:string
}




@Injectable({
  providedIn: 'root'  //only one instance for the whole application (jwt token shared in whole app)
})
export class AuthService {

  private readonly http = inject(HttpClient);
  private readonly apiUrl =`${environment.apiUrls.auth}/login`;
  private readonly apiUrlregister =`${environment.apiUrls.auth}/register`;

  //jwt saved in memory with signals
  readonly _token=signal<string | null>(null);
  private readonly _registerresponse=signal<string | null>(null);

  
  isAuthenticated():boolean{
     if(this._token() != null){
        return true;
      }else{
        return false;
      }
  }

  try_login(loginData:LoginDto):Observable<LoginResponse>{
    
        return this.http.post<LoginResponse>(this.apiUrl,loginData
        ).pipe( //like pipeline: execute after
            tap(response=>{ //execute an action without modify content of response
              this._token.set(response.token);
            }) 
        )
  }


    register(registerData:RegisterDto):Observable<RegisterResponse>{
    
        return this.http.post<RegisterResponse>(this.apiUrlregister,registerData
        ).pipe( //like pipeline: execute after
            tap(response=>{ //execute an action without modify content of response
              this._registerresponse.set(response.message);
            }) 
        )
  }

  logout():void{
    this._token.set(null);
  }

  getToken():string | null{
    return this._token();
  }



  getCustomerId(): string | null {

          const token = this._token();

          if (!token) {
            return null;
          }

          try {
            // 1. Extract JWT payload: HEADER.PAYLOAD.SIGNATURE
            const encodedPayload = token.split('.')[1];    

            // 2. Convert Base64URL to Base64
            const base64 = encodedPayload
              .replace(/-/g, '+')
              .replace(/_/g, '/');

            // 3. Decode the payload
            const json = atob(base64);

            // 4. Convert JSON string to JavaScript object
            const payload = JSON.parse(json);

            // 5. Retrieve the user identifier
            return payload.nameid
              ?? payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
              ?? payload.sub
              ?? null;

          } catch {
            return null;
          }
    }
 
}








