import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  get(serviceName: string) {
    const userdetails: any = JSON.parse(atob(localStorage.getItem("24hrs-user-data")));
    const url = environment.baseUrl + serviceName;
    const header = new HttpHeaders()
      // .set("Access-Control-Allow-Origin", "*")
      // .set("Access-Control-Allow-Methods", "GET,POST")
      // .set('Accept','application/json')
      // .set('Content-Type','application/json')
      // .set("Access-Control-Allow-Headers", "Token, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
      .set("Token", userdetails.token);
    //   let httpOptions = {
    //     headers: new HttpHeaders({
    //       "Access-Control-Allow-Origin": "*",
    //       "Access-Control-Allow-Methods": "*",
    //       "Access-Control-Allow-Headers":"Token, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
    //       'Authorization':userdetails.token,
    //       "Content-Type": "application/json"

    //     })
    // };

    const options = { headers: header, withCredentials: true };
    return this.http.get(url, { headers: header });
  }

  post(serviceName: any, data: any): any {
    const token: any = ((localStorage.getItem("token")));


    const url = environment.baseUrl + serviceName;
    if (serviceName == '/user_get_otp' || serviceName == '/user_verify_otp' || serviceName == '/register_using_mobile' || serviceName == '/login_using_mobile' || serviceName =='list_offer_category' || serviceName == '/user_register' || serviceName == '/user_google_signin') {
      const headers = new HttpHeaders()
      const options = { headers: headers, withCredentials: false };
      return this.http.post(url, JSON.stringify(data), { headers: headers });
    } else {
      const headers = new HttpHeaders().set("Token", token);
      const options = { headers: headers, withCredentials: true };
      return this.http.post(url, JSON.stringify(data), { headers: headers });
    }



  }

  postFormData(serviceName: any, data: any): any {
    const token: any = ((localStorage.getItem("token")));
    const url = environment.baseUrl + serviceName;

    const headers = {
      'enctype': 'multipart/form-data;',
      'Content-Type': 'multipart/form-data;',
      'Accept': 'plain/text',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
      'Access-Control-Allow-Headers': 'Authorization, Origin, Content-Type, X-CSRF-Token',
      'Token': token
    }

    // const headers = new HttpHeaders().set("Token", token );
    //  headers.set('Content-Type', 'multipart/form-data'); 
    const options = { headers: headers, withCredentials: true };
    return this.http.post(url, data, { headers: headers });

  }


}
