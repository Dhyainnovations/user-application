import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';
import { ToastController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  animations: [
    trigger('fadein', [
      state('void', style({ opacity: 0 })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate('900ms ease-out', style({ opacity: 1 }))
      ])
    ]),
    trigger('slidelefttitle', [
      transition('void => *', [
        style({ opacity: 0, transform: 'translateX(150%)' }),
        animate('600ms 300ms ease-out', style({ transform: 'translateX(0%)', opacity: 1 },))
      ])
    ]),
    trigger('slideup', [
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(150%)' }),
        animate('900ms 300ms ease-out', style({ transform: 'translateY(0%)', opacity: 1 },))
      ])
    ])
  ]
})
export class SignupPage implements OnInit {
  modalCtrl: any;

  constructor(private router: Router, private http: HttpService,
    private toastCtrl: ToastController, public popoverController: PopoverController, private route: ActivatedRoute) {
  }


  ngOnInit() {
    this.locationList()
    this.UserDetails();
  }


  userTbid: any = ((localStorage.getItem("tbid")));
  mobilenumber: any = ((localStorage.getItem("mobilenumber")));

  city: any;
  userName: any = "";
  mobileNumber: any;


  locationsList: any = []
  locationList() {
    this.locationsList = [];
    this.http.get('/list_location',).subscribe((response: any) => {
      console.log(response);
      for (var i = 0; i <= response.records.length; i++) {
        if (response.records[i].city != null) {
          this.locationsList.push(response.records[i])
        }
      }
      console.log(response.records.city);

    }, (error: any) => {
      console.log(error);
    });
  }



  UserDetails() {

    this.http.get('/user_details',).subscribe((response: any) => {
      console.log(response);
      if (response.records.user_name == null) {
        this.userName = "User";
      } else {
        this.userName = response.records.user_name;
      }
      this.mobileNumber = response.records.mobile_number;

    }, (error: any) => {
      console.log(error);
    });

  }


  userDetailsUpload() {
    const data = {
      "tbid": this.userTbid,
      "user_name": this.userName,
      "mobile_number": this.mobilenumber,
      "location": this.city

    }
    console.log(data);

    this.http.post('/user_update_profile', data).subscribe((response: any) => {
      console.log(response);
      if (response.success == "true") {
        localStorage.setItem("userName", this.userName)
        localStorage.setItem("location", this.city)
        this.router.navigate(['/selectcategories'])
      }
    }, (error: any) => {
      console.log(error);
    });
  }

  navigateHome() {
    this.router.navigate(['/selectcategories'])
  }



}

