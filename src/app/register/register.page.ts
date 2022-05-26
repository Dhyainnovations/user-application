import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { OtpPage } from '../otp/otp.page';



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(public modalCtrl: ModalController, private router: Router, private http: HttpService,
    private toastCtrl: ToastController, route: ActivatedRoute, public platform: Platform) { }

  ngOnInit() {
    this.passwordType = 'password'
  }
  signin() {
    this.router.navigate(['/welcome'])
  }
  username: any;
  mailid: any;
  mobileNumber: any;
  password: any;

  passwordType: string;
  show: boolean = true;
  //Check
  isNotEmailAlert: any;
  ValidNumber: any;
  passwordCheck: any;
  passwordRes: any;
  isUserNameAlert: any;


  onClick() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.show = true;
    } else {
      this.passwordType = 'password';
      this.show = false;
    }
  }



  navigateHome(){
    this.router.navigate(['/welcome'])
  }

  EmailCheck() {
    console.log(this.mailid);
    var expression = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    var regex = new RegExp(expression);
    if (regex.test(this.mailid) == true) {
      this.isNotEmailAlert = false;
    } else {
      this.isNotEmailAlert = true;
    }
  }



  mobileNumberCheck() {
    if (this.mobileNumber) {
      this.ValidNumber = false;

      if (this.mobileNumber.length < 10) {
        this.ValidNumber = true;

      } else {
        this.ValidNumber = false;
      }
    } else {
      this.ValidNumber = true;
    }
  }


  passwordChecking() {
    console.log(this.password);
    var expression = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    var regex = new RegExp(expression);
    if (regex.test(this.password) == true) {
      this.passwordCheck = false;
    } else {
      this.passwordCheck = true;
    }
  }

  usernameCheck() {
    console.log(this.username);
    if (this.username!) {
      this.isUserNameAlert = false;
    } else {
      this.isUserNameAlert = true;
    }
  }

  mailidCheckFalse() {
    this.isNotEmailAlert = false;
  }
  usernameCheckFalse() {
    this.isUserNameAlert = false;
  }

  MobileNumberCheckFalse() {
    this.ValidNumber = false;
  }

  passwordCheckFalse() {
    this.passwordCheck = false
  }
  signUp() {
    this.passwordChecking();
    this.usernameCheck();
    this.EmailCheck();
    this.mobileNumberCheck();
    if (this.isNotEmailAlert == false && this.isUserNameAlert == false && this.ValidNumber == false && this.passwordCheck == false) {
      var Data = {
        user_name: this.username,
        email_id: this.mailid,
        mobile_number: this.mobileNumber,
        password: this.password
      }
      this.http.post('/user_register', Data).subscribe((response: any) => {
        if (response.message != "Mobile Number Already Exist" && response.message != "Email-Id Already Exist" && response.message != "User name Already Exist") {
          console.log(response);
          this.SendOTP();
          this.username = null
          this.mailid = null
          this.mobileNumber = null
          this.password = null
        }
        if (response.message == "Mobile Number Already Exist" || response.message == "Email-Id Already Exist" || response.message == "User name Already Exist") {
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
            icon: 'error',
            title: 'User Details Already Exist'
          })


        }
      }, (error: any) => {
        console.log(error);

      });
    }

  }

  async SendOTP() {
    localStorage.setItem("24hrs-user-mobile-number-otp-verification", this.mobileNumber);
    const modal = await this.modalCtrl.create({
      component: OtpPage,
      animated: true,
      mode: 'ios',
      backdropDismiss: false,
      cssClass: 'login-modal',
    })

    return await modal.present();
  }



  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
}