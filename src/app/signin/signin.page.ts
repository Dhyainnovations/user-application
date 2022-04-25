import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { ModalController } from '@ionic/angular';


import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
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
        animate('900ms 300ms ease-out', style({ transform: 'translateX(0%)', opacity: 1 },))
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
export class SigninPage implements OnInit {
  intervalId = 0;
  message = '';
  seconds = 0;
  hour = 0;
  lat: number;
  lon: number;
  userInfo = null;

  constructor(public modalCtrl: ModalController, private router: Router, private http: HttpService,
    private toastCtrl: ToastController, route: ActivatedRoute, public platform: Platform) {
    route.params.subscribe(val => {
      this.loginsts = ((localStorage.getItem("loginstatus")));
      this.mobileNumber = '';
      this.otp = '';

    });
    // this.platform.ready().then(async () => {
    //   GoogleAuth.initialize();
    // });

  }

  // async googleSignup() {
  //   const googleUser = await GoogleAuth.signIn() as any;
  //   console.log('my user: ', googleUser);
  //   this.userInfo = googleUser;
  // }

  ngOnInit() {
    this.MobInputcolSize = 12;
    this.OtpInputcolSize = 12;
    // this.geolocation.getCurrentPosition().then((resp) => {
    //   this.lat = resp.coords.latitude
    //   this.lon = resp.coords.longitude
    // }).catch((error) => {
    //   console.log('Error getting location', error);
    // });

    // let watch = this.geolocation.watchPosition();
    // watch.subscribe((data) => {
    //   // data can be a set of coordinates, or an error (if an error occurred).
    //   // data.coords.latitude
    //   // data.coords.longitude
    // });
  }

  ngOnDestroy() { this.clearTimer(); }


  loginsts: any = ((localStorage.getItem("loginstatus")));
  registersts: any;

  mobileNumber: any = '';
  otp: any = '';
  MobInputcolSize: any;
  OtpInputcolSize: any;
  sendOtpBtnVisible: any = false;
  submitBtnVisible: any = false;
  resendOtpVisible: any = false;
  timerVisible: any = false

  clearTimer() { clearInterval(this.intervalId); }
  start() { this.countDown(); }
  stop() {
    this.clearTimer();
    this.message = `$ ${this.hour} {this.seconds} `;
  }

  private countDown() {
    this.clearTimer();
    this.intervalId = window.setInterval(() => {
      this.seconds -= 1;
      if (this.seconds === 0) {
        // this.message = 'Offers Ends..!';
      } else {
        if (this.seconds < 0) { this.seconds = 60; } // reset
        this.message = `${this.hour}. ${this.seconds}s`;
      }
    }, 1000);
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  enterMobile() {
    this.MobInputcolSize = 8;
    this.sendOtpBtnVisible = true;
  }
  enterOtp() {
    this.OtpInputcolSize = 8;
    this.submitBtnVisible = true;
  }

  sendOtp() {
    this.seconds = 60;
    this.MobInputcolSize = 12;
    this.sendOtpBtnVisible = false;
    this.resendOtpVisible = true;

    const Data = {
      mobile_number: this.mobileNumber,
    }
    console.log(Data);

    console.log(this.registersts);
    //--------------- Register Api ------------//
    this.http.post('/register_using_mobile', Data).subscribe((response: any) => {
      console.log(response);
      this.loginsts = response.user_status

    }, (error: any) => {
      console.log(error);

    });

    //--------------- Get otp Api ------------//
    this.http.post('/user_get_otp', Data).subscribe((response: any) => {
      console.log(response);
      this.registersts = response.user_status;
      localStorage.setItem("registerstatus", response.user_status)
    }, (error: any) => {
      console.log(error);

    });






  }


  //--------------------- Resent Otp ------------------//
  ResendOtp() {
    this.timerVisible = true;
    this.start()

    const Data = {
      mobile_number: this.mobileNumber,
    }
    console.log(Data);

    this.http.post('/user_get_otp', Data).subscribe((response: any) => {
      console.log(response);

    }, (error: any) => {
      console.log(error);

    });

  }


  //------------------- signIn api call -----------//

  signIn() {

    const Data = {
      mobile_number: this.mobileNumber,
      verify_otp: this.otp
    }

    this.http.post('/user_verify_otp', Data).subscribe((response: any) => {
      console.log(response);

      if (response.success == "true") {
        this.dismiss()
        this.http.post('/login_using_mobile', Data).subscribe((response: any) => {
          console.log(response);
          localStorage.setItem("token", response.token)
          localStorage.setItem("tbid", response.tbid)
          localStorage.setItem("mobilenumber", response.mobile_number)

          const obj = {
            id: response.tbid,
            username: response.user_name,
            mobile: response.mobile_number,
            token: response.token,
            loginstatus: response.user_status
          }

          this.loginsts = response.user_status

          console.log(obj);

          const encodeText: any = btoa(JSON.stringify(obj))
          localStorage.setItem("24hrs-user-data", encodeText)

          localStorage.setItem("loginstatus", response.user_status)

          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
  
          Toast.fire({
            icon: 'success',
            title: 'Login successfully'
          })

          console.log(this.registersts);
          if (this.registersts == "1" || this.loginsts == "First Login" && this.loginsts != undefined) {
            console.log(this.registersts);
            console.log("1st");
            this.router.navigate(['/signuppage'])
          } else {
            console.log("2nd");
            this.router.navigate(['/tabs'])
          }

        }, (error: any) => {
          console.log(error);

        });
      }

    }, (error: any) => {
      console.log(error);

    });

  }

  // ------------------- navigation checking -------------//
  // navigateTabs() {

  //   if (this.loginsts == "1") {
  //     console.log(this.loginsts);
  //     console.log("1st");
  //     this.router.navigate(['/signuppage'])
  //   }
  //   if (this.loginsts == "2") {
  //     console.log("2nd");
  //     this.router.navigate(['/homepage'])
  //   }
  // }

  signupPage() {
    this.router.navigate(['/signuppage'])
  }


  signin() {
    this.router.navigate(['/homepage'])
  }

  navigateToLocal() {
    this.router.navigate(['/home'])
  }
  signup(){
    this.router.navigate(['/register'])
    this.dismiss();
  }
}
