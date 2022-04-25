import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../shared/http.service';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { trigger, style, state, animate, transition } from '@angular/animations';
import { ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {
  @ViewChild(IonContent) content: IonContent;

  scrollToTop() {
    this.content.scrollToTop(400);
  }
  ionViewDidEnter() {
    this.scrollToTop();
  }
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private http: HttpService, route: ActivatedRoute, public popoverController: PopoverController, private popover: PopoverController) {
    route.params.subscribe(val => {
      this.getSelectCategory()
      this.locationList()
      this.UserDetails()
      this.offerList()
    });
  }

  ngOnInit() {
    this.start()
  }
  ngOnDestroy() { this.clearTimer(); }

  intervalId = 0;
  Counter = '';
  seconds = 11;
  hour = 1;

  city: any = "All";

  clearTimer() { clearInterval(this.intervalId); }
  start() { this.countDown(); }
  stop() {
    this.clearTimer();
    this.Counter = `$ ${this.hour} {this.seconds} `;
  }

  private countDown() {
    this.clearTimer();
    this.intervalId = window.setInterval(() => {
      this.seconds -= 1;
      if (this.seconds === 0) {
        this.Counter = 'Offers Ends..!';
      } else {
        if (this.seconds < 0) { this.seconds = 60; } // reset
        this.Counter = `${this.hour}. ${this.seconds} Hrs`;
      }
    }, 1000);
  }


  username: any = (localStorage.getItem("userName"));
  userdetails: any = JSON.parse(atob(localStorage.getItem("24hrs-user-data")));
  slideName: any = 'Home';
  isvisible: any = false;
  IfOfferPresent: any;
  deliveryAvilability: any;
  popUpisvisible: any = false;
  productDetails: any = true;
  IfOtherOfferPresent: any;
  storedetailsVisible: any = false;
  noDataFound: any = false;
  ExpirynoDataFound: any = true;
  offerListVisible: any = true;
  getCategoryList: any = [];
  other_offer: any;
  offerlist: any = [];
  offerView: any = []
  storedetails: any = []
  storeTbid: any;
  storeLogo: any;
  storeName: any;
  productName: any;
  productImage: any;
  description: any;
  offer: any;
  totalPrice: any;
  offerPrice: any;
  offerTime: any;
  storeAddress: any;
  websiteLink: any;
  whatsApp: any;
  contact: any;
  instagram: any;
  others: any;
  storeID: any;
  spamMsg: any;
  storeNa: any;
  offerDenaid: any;
  spam_msg: any;
  store: any;
  offer_denied: any;
  locationChangeVisible: any = false;
  unit: any;
  otherofferlist: any = [];
  loginUserTbid: any;
  loginUserName: any;
  loginUserNumber: any;
  loginUserLocation: any;
  loginUserToken: any;

  UserDetails() {

    this.http.get('/user_details',).subscribe((response: any) => {

      this.loginUserTbid = response.records.user_name;
      if (response.records.user_name == null) {
        this.loginUserName = "User";
      } else {
        this.loginUserName = response.records.user_name;
      }
      this.loginUserNumber = response.records.user_name;
      this.loginUserLocation = response.records.user_name;
      this.loginUserToken = response.records.user_name;

    }, (error: any) => {
      console.log(error);
    });

  }


  hidepopup() {
    this.popUpisvisible = false;
  }
  showPopup() {
    this.popUpisvisible = true;

  }
  //--------------- Ion slide option ----------//
  slideOpts = {
    slidesPerView: 3,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
  }

  // ----------- spam report -----------//
  spam(val) {
    if (this.spamMsg == true) {
      this.spam_msg = "spam Msg"
    } else {
      this.spam_msg = ""
    }

  }

  // ----------- storeNA report -----------//
  storeNA(val) {
    if (this.store == true) {
      this.store = "store NA"
    } else {
      this.store = ""
    }
  }

  // ----------- OfferDenaid report -----------//
  OfferDenaid(val) {
    if (this.store == true) {
      this.offer_denied = "offer Denaid"
    } else {
      this.offer_denied = ""
    }
  }


  // ----------- Seller report Api call -----------//
  reportSeller() {
    const obj = {
      store_name: this.storeID,
      spam_msg: this.spam_msg,
      store: this.store,
      offer_denied: this.offer_denied,
      others: this.others
    }

    this.http.post('/seller_report', obj).subscribe((response: any) => {
      if (response.success == "true") {
        this.others = ''
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
          title: 'Report Successfully'
        })
        this.popUpisvisible = false
      }

    }, (error: any) => {
      console.log(error);
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
    });
  }

  PopupModel: any;
  //------------- Read one Offer(card) Api call ------------//
  singleCard(product) {
    this.deliveryAvilability = ''
    const o = product
    this.isvisible = true;
    this.PopupModel = true;
    this.storedetailsVisible = false
    this.productDetails = true
    this.http.get('/readone_offer_user?o=' + o).subscribe((response: any) => {


      if (response.success == "true") {
        this.contact = response.records.contact_number;
        this.storeTbid = response.records.tbid
        this.storeLogo = response.records.store_logo
        this.storeName = response.records.store_name
        this.productName = response.records.product
        this.productImage = response.records.product_image
        this.description = response.records.description
        this.offer = response.records.product_weight
        this.totalPrice = response.records.total_cost
        this.offerPrice = response.records.offer_price
        this.other_offer = response.records.other_offer
        this.offerTime = response.records.offer_end_time
        this.whatsapp_href = "https://wa.me/" + response.records.whatsapp
        this.instagram_href = "https://www.instagram.com/" + response.records.instagram + "/";
        this.youtube_href = response.records.youtube;
        this.facebook_href = "https://www.facebook.com/" + response.records.facebook + "/";
        this.contact = response.records.contact_number
        this.websiteLink = response.records.website

        if (response.records.seller_toggle.whatsapp == "false") {
          this.whatsapp_status = false
        } else {
          this.whatsapp_status = true
        }

        if (response.records.seller_toggle.instagram == "false") {
          this.instagram_status = false;
        } else {
          this.instagram_status = true
        }
        if (response.records.delivery_availability == "1") {
          this.ProductDelivery = true
        } else if (response.records.delivery_availability == "") {
          this.ProductDelivery = false
        }
        if (response.records.seller_toggle.website == "false") {
          this.website_status = false
        } else {
          this.website_status = true
        }
        if (response.records.seller_toggle.facebook == "false") {
          this.facebook_status = false
        } else {
          this.facebook_status = true
        }
        if (response.records.seller_toggle.youtube == "false") {
          this.youtube_status = false
        } else {
          this.youtube_status = true
        }
        if (response.records.seller_toggle.contact_number == "false") {
          this.contact_status = false
        } else {
          this.contact_status = true
        }


        this.unit = response.records.product_unit
        if (this.other_offer == "") {
          this.IfOfferPresent = true;
          this.IfOtherOfferPresent = false;
        } else {
          this.IfOfferPresent = false;
          this.IfOtherOfferPresent = true;
        }
      }
      console.log(response.records);

      this.scrollToTop();
    }, (error: any) => {
      console.log(error);
    });
  }

  whatsapp_status: any = false;
  instagram_status: any = false;
  website_status: any = false;
  facebook_status: any = false;
  youtube_status: any = false;
  contact_status: any = false;
  youtube: any;
  facebook: any;
  ProductDelivery: any;
  //---------------Get Store Details  Api call -------------//
  storeDetails(storename) {
    this.ProductDelivery = false
    this.storedetailsVisible = true;
    this.productDetails = false;
    const obj = {
      store_name: storename
    }
    this.http.post('/store_details_user', obj).subscribe((response: any) => {
      this.storedetails = response.records;
      this.storeAddress = response.records.address_line_1 + " " + response.records.address_line_2 + " " + response.records.city + " : " + response.records.pincode + " " + response.records.state;
      this.websiteLink = response.records.website
      this.whatsApp = response.records.whatsapp
      this.contact = response.records.contact_number
      this.instagram = response.records.instagram
      this.youtube = response.records.youtube
      this.facebook = response.records.facebook
      this.storeID = response.records.tbid
      this.storeLogo = response.records.store_logo
      this.deliveryAvilability = response.records.delivery_availability
      this.whatsapp_href = "https://wa.me/" + response.records.whatsapp
      this.instagram_href = "https://www.instagram.com/" + response.records.instagram + "/";
      this.youtube_href = response.records.youtube;
      this.facebook_href = "https://www.facebook.com/" + response.records.facebook + "/";
      if (response.records.delivery_availability == "Available") {
        this.deliveryAvilability = true
      } else if (response.records.delivery_availability == "") {
        this.deliveryAvilability = false
      }
    }
      , (error: any) => {
        console.log(error);
      }
    );
  }
  youtube_href: any;
  whatsapp_href: any;
  instagram_href: any;
  facebook_href: any;
  //-------------- Navigate to dashboard ----------//
  navigateHome() {
    this.storedetailsVisible = false;
    this.isvisible = false;
    this.productDetails = true;
    this.PopupModel = false;

  }



  //-------------- Navigate to searchPage ----------//
  searchPage() {
    this.router.navigate(['/searchpage'])
  }

  //-------------- Navigate to setalarmPage ----------//
  setalarm() {
    this.router.navigate(['/setalarm'])
  }

  //-------------- Navigate to notificationPage ----------//
  notification() {
    this.router.navigate(['/notification'])
  }

  //--------- Get User Selected store Category's------------//
  getSelectCategory() {
    this.http.get('/store_category_user').subscribe((response: any) => {
      this.getCategoryList = response.records

    }, (error: any) => {
      console.log(error);
    });
  }





  offerList() {
    this.offerlist = [];
    const data = {
      city: this.city
    }
    this.http.post('/list_all_offer', data).subscribe((response: any) => {
      for (var i = 0; i < response.records.length; i++) {
        // if (response.records[i].offer != "") {
        const data = {
          store_name: response.records[i].store_name,
          product_image: response.records[i].product_image,
          offer_time: response.records[i].offer_end_time,
          total_cost: response.records[i].total_cost,
          product: response.records[i].product,
          product_unit: response.records[i].product_unit,
          offer: response.records[i].offer,
          offer_price: response.records[i].offer_price,
          tbid: response.records[i].tbid,
          product_weight: response.records[i].product_weight,
          other_offer: response.records[i].other_offer
        }
        this.offerlist.push(data);
        // }
      }

      if (response.message == "No offers found.") {
        this.noDataFound = true;
      } else {
        this.noDataFound = false;
      }

    }, (error: any) => {
      console.log(error);
      this.noDataFound = true;
    }
    );
  }


  //------------- get offer list -----------//


  //------------- click home slider ----------//
  clickSlideHome() {
    this.offerlist = []
    this.slideName = "Home";
    this.offerListVisible = true;
    this.noDataFound = false;
    this.isvisible = false
    this.offerList();
  }


  store_category_id: any;
  clickSlide(item) {
    this.store_category_id = item;
    this.isvisible = false
    this.slideName = item;
    if (this.slideName == "Home") {
      this.offerListVisible = true;
      this.noDataFound = false;
      this.offerList()
    }


    const obj = {
      store_category_id: item,
      city: this.city
    }
    this.http.post('/list_offer_category', obj).subscribe((response: any) => {
      this.offerlist = [];
      for (var i = 0; i < response.records.length; i++) {
        // if (response.records[i].offer != "") {
        const data = {
          store_name: response.records[i].store_name,
          product_image: response.records[i].product_image,
          offer_time: response.records[i].offer_end_time,
          total_cost: response.records[i].total_cost,
          product: response.records[i].product,
          product_unit: response.records[i].product_unit,
          offer: response.records[i].offer,
          offer_price: response.records[i].offer_price,
          tbid: response.records[i].tbid,
          product_weight: response.records[i].product_weight,
          other_offer: response.records[i].other_offer,
        }

        this.offerlist.push(data);
        // }
      }

      this.offerListVisible = true;
      this.noDataFound = false;
    }, (error: any) => {
      console.log(error);
      this.offerListVisible = false;
      this.noDataFound = true;

    }
    );
  }

  locationsList: any = []
  locationList() {
    this.locationsList = [];
    this.http.get('/list_location').subscribe((response: any) => {
      for (var i = 0; i <= response.records.length; i++) {
        if (response.records[i].city != null) {
          this.locationsList.push(response.records[i])
        }
      }
    }, (error: any) => {
      console.log(error);
    });

  }


  locationBased() {
    if (this.city == "All") {
      this.offerList()
    } else {
      this.offerlist = [];
      var city = {
        city: this.city
      }
      this.http.post('/list_offer_city', city).subscribe((response: any) => {
        console.log(response.records);
        this.offerlist = [];
        for (var i = 0; i < response.records.length; i++) {
          // if (response.records[i].offer != "") {
          const data = {
            store_name: response.records[i].store_name,
            product_image: response.records[i].product_image,
            offer_time: response.records[i].offer_end_time,
            total_cost: response.records[i].total_cost,
            product: response.records[i].product,
            product_unit: response.records[i].product_unit,
            offer: response.records[i].offer,
            offer_price: response.records[i].offer_price,
            tbid: response.records[i].tbid,
            product_weight: response.records[i].product_weight,
            other_offer: response.records[i].other_offer,
          }

          this.offerlist.push(data)
          // }
        }

        if (response.message == "No offers found.") {
          this.noDataFound = true;
        } else {
          this.noDataFound = false;
        }
      }, (error: any) => {
        console.log(error);
        this.noDataFound = true;
      }
      );
    }
    if (this.store_category_id) {
      this.clickSlide(this.store_category_id);
    }

  }



  locationChange() {
    this.locationChangeVisible = !this.locationChangeVisible;
  }

  testSlide() {
    this.router.navigate(['/slide-test'])
  }




}