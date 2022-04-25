import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../shared/http.service';
import Swal from 'sweetalert2';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-myalarms',
  templateUrl: './myalarms.page.html',
  styleUrls: ['./myalarms.page.scss'],

  //------------- Animations ----------//
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
export class MyalarmsPage implements OnInit {

  constructor(private router: Router, private http: HttpService,
    private toastCtrl: ToastController, route: ActivatedRoute, public alertController: AlertController) {
    route.params.subscribe(val => {

      // this.getAlarmList()
      this.getStoreAlarmList()
      this.getproductAlarmList()

      

    });
  }

  ngOnInit() {
  }

  isVisible: any = false;
  storeAlarmList: any = []
  productAlarmList: any = []
  tbid: any;
  storeAlram: any = false;
  noDataFound:any = true;
  //-------------- Navigate to searchpage ----------//
  searchPage() {
    this.router.navigate(['/searchpage'])
  }

  //-------------- Navigate to notificationpage  ----------//
  notification() {
    this.router.navigate(['/notification'])
  }

  //-------------- Navigate to setalarmpage  ----------//
  newAlarm() {
    this.router.navigate(['/tabs/tab2'])
  }

  //-------------- Get alarm List Api func  ----------//
  getAlarmList() {
    this.http.get('/list_all_alarm').subscribe((response: any) => {

    }, (error: any) => {
      console.log(error);
    });
  }


  //---------- Delete storeAlarm ------------//
  deleteStoreAlarm(value) {
    this.storeAlram = true
    this.tbid = value;
    this.presentAlertConfirm()
  }

  //---------- Delete productAlarm ------------//
  deleteProductAlarm(value) {
    this.storeAlram = false
    this.tbid = value;
    this.presentAlertConfirm()
  }

  //------------- Alart confirmation popup -----------//
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'buttonCss ',

      header: 'Are you sure want to delete?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'alert-danger',
          handler: (blah) => {
            console.log('Confirm Cancel: No');
          }
        }, {
          text: 'Yes',
          cssClass: 'buttonCss',
          handler: () => {

            console.log('Confirm Okay');

            const obj = {
              tbid: this.tbid
            }
            console.log(obj)


            if (this.storeAlram == true) {
              this.http.post('/delete_store_alarm', obj).subscribe((response: any) => {
                console.log(response);
                if (response.success == "true") {
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
                    title: 'Alarm Deleted successfully'
                  })
                  
                  
                  this.storeAlarmList = []
                  this.getStoreAlarmList()
                }

              }, (error: any) => {
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
                  title: 'Something Went Wrong'
                })
                console.log(error);
              });
            } else {
              this.http.post('/delete_alarm_product', obj).subscribe((response: any) => {
                console.log(response);
                if (response.success == "true") {
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
                    title: 'Alarm Deleted successfully'
                  })
                  
                  this.productAlarmList = []
                  this.getproductAlarmList()
                }

              }, (error: any) => {
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
                  title: 'Something Went Wrong'
                })
                console.log(error);
              });
            }

          }
        }
      ]
    });

    await alert.present();
  }


  //------------- Get StoreAlarmList -----------//
  getStoreAlarmList() {
    
    this.http.get('/store_read_alarm').subscribe((response: any) => {
      this.storeAlarmList = response.records
      this.noDataFound = false
      console.log(response);

    }, (error: any) => {
      console.log(error);
    });
  }

  //------------- Get ProductAlarmList -----------//
  getproductAlarmList() {
    this.http.get('/product_read_alarm').subscribe((response: any) => {
      this.productAlarmList = response.records
      console.log(response);
      this.noDataFound = false;

    }, (error: any) => {
      console.log(error);
    });
  }

}
