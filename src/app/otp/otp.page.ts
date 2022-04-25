import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {

  constructor(public modalCtrl: ModalController, private router: Router, private http: HttpService,
    private toastCtrl: ToastController, route: ActivatedRoute, public platform: Platform) { }

  ngOnInit() {
    this.mobileNumber = localStorage.getItem("24hrs-user-mobile-number-otp-verification");
    this.SendOTP();
  }


  //Initialization
  mobileNumber: any;
  otp: any;
  ResendOTPEnable: any;

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  SendOTP() {
    const obj = {
      mobile_number: this.mobileNumber
    }
    this.http.post('/user_get_otp', obj).subscribe((response: any) => {
      console.log(response);
      setTimeout(() => {
        this.enableResendOTP();
      }, 60000)
    }, (error: any) => {
      console.log(error);
    }
    )
  }



  verifyOTP() {
    const obj = {
      mobile_number: this.mobileNumber,
      verify_otp: this.otp
    }
    this.http.post('/user_verify_otp', obj).subscribe((response: any) => {
      console.log(response);
      this.dismiss();
      this.router.navigate(['/welcome'])
    }, (error: any) => {
      console.log(error);
    }
    )
  }

  enableResendOTP() {
    this.ResendOTPEnable = true;
  }


}
