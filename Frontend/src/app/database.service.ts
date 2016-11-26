import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DatabaseService {

  constructor(private http:Http) { }

  addMail(mail:string){
    var body = {"mail": mail};
    return this.http.post("https://dreary-eyelash.hyperdev.space/api/mail/", body)
      .map(res => res.json());
  }

  deleteMail(mail:string){
    return this.http.delete("https://dreary-eyelash.hyperdev.space/api/mail/" + mail)
      .map(res => res.json());
  }
}
