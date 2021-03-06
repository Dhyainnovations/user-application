import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-splashscreen',
  templateUrl: './splashscreen.page.html',
  styleUrls: ['./splashscreen.page.scss'],
})
export class SplashscreenPage implements OnInit {

  constructor( private router: Router, route: ActivatedRoute) { 
    route.params.subscribe(val => {
      console.log(localStorage.getItem("user-tbid"));
      var userdetails = (localStorage.getItem("user-tbid"));
      console.log(userdetails);
      
      
      setTimeout(()=>{
        if(userdetails){
          this.router.navigate(['/tabs'])
        }else{
          this.router.navigate(['/ref'])
        }
      },2200)
    });
  }

  ngOnInit() {
  }

}
