import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service'; 

@Component({
  selector: 'subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css'],
  providers: [ DatabaseService ]
})
export class SubscribeComponent implements OnInit {
  sub:boolean = true;
  btnText:string = "Subscribe!";
  bottomText:string = "Or unsubscribe";
  confirmText:string = "Email added!";

  constructor(private databaseService:DatabaseService) { }

  ngOnInit() {
    document.getElementById("form").addEventListener("submit", this.submitForm.bind(this));
  }

  changeText(){
    this.sub = !this.sub;
    var confirmIcon = document.getElementById("confirm").getElementsByTagName("span")[0];
    if(this.sub){
      this.btnText = "Subscribe!";
      this.bottomText = "Or unsubscribe";
      this.confirmText = "Email is added!";
      confirmIcon.className = "glyphicon glyphicon-ok";
    }else{
      this.btnText = "Unsubscribe";
      this.bottomText = "Or subscribe!";
      this.confirmText = "Email is removed!";
      confirmIcon.className = "glyphicon glyphicon-remove";
    }
  }

  submitForm(){
    var email = (<HTMLInputElement>document.getElementById("mail")).value;
    if(this.sub){
      this.databaseService.addMail(email)
        .subscribe(msg => {
          if(msg.msg === "Email added" || msg.msg === "Email already exists"){
            var confirm = document.getElementById("confirm");
            confirm.style.display = "block";
            console.log(msg);
            setTimeout(function(){
              confirm.style.display = "none";
            }, 2000);
          }
        });
    }else{
      this.databaseService.deleteMail(email)
        .subscribe(msg => {
          if(msg.msg === "Succes"){
            var confirm = document.getElementById("confirm");
            confirm.style.display = "block";
            console.log(msg);
            setTimeout(function(){
              confirm.style.display = "none";
            }, 2000);
          }
        });
    }
    
  }

}
