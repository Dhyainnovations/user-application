import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpService } from '../shared/http.service';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.page.html',
  styleUrls: ['./searchpage.page.scss'],
})
export class SearchpagePage implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private http: HttpService, route: ActivatedRoute) {
    route.params.subscribe(val => {
      this.getProductList()
    });
  }


  ngOnInit() {
  }

  cardVisible: any = false;
  isVisible: any = false;
  isShown: any = false;
  searchResultVisible: any = false
  searchProductName: any;
  searchResult: any = []
  searchProductList: any = []
  storeLogo: any;
  storeName: any;
  productName: any;
  productImage: any;
  description: any;
  weight: any;
  unit: any;
  totalCost: any;
  offerPrice: any;
  offerTime: any;
  whatsapp_status: any;
  instagram_status: any;
  website_status: any;
  facebook_status: any;
  youtube_status: any;
  contact_status: any;
  newDateFormat: any;
  offerTimer: any;
  noTimer: any;
  //-------------- Navigate to notificationPage ----------//
  notification() {
    this.router.navigate(['/notification'])
  }


  searchProduct() {
    this.searchProductList=[];
    console.log(this.searchProductName);
    this.getProductList()
    this.isVisible = true;
    this.isShown = true;
    this.cardVisible = false;
    this.searchResultVisible = true;

    if (this.searchProductName == "") {
      this.isShown = false;
    }
    this.http.get('/product_search_user' + this.searchProductName).subscribe((response: any) => {
      if (response.success == "true") {
        this.searchProductList = response.records;
        console.log(response);

      }

    }, (error: any) => {
      console.log(error);
    });

    var i = 0;
    var initTime = new Date();
    console.log(i);
    
   
  }

  clearTime :any = null;

  clearData() {
    this.searchProductName = " ";
    this.cardVisible = false


  }
  IfOfferPresent: any;
  IfOtherOfferPresent: any;
  other_offer: any;
  offer: any;
  totalPrice: any;
  searchRecord: any = []
  product_image: any;
  product: any
  product_weight: any;
  product_unit: any;
  store_name: any;
  offer_price: any;
  offer_end_time: any;
  Socialdetailavailable:any;
  ProductDelivery:any;
  selectSearchProduct(name) {
    clearInterval(this.clearTime)
    this.searchProductName = name;
    const s = name;
    console.log(s);
    this.searchResultVisible = false;
    this.cardVisible = true;
    this.http.get('/offer_search_user?s=' + s).subscribe((response: any) => {
      console.log(response);
      this.totalPrice = response.records[0].total_cost
      this.offerPrice = response.records[0].offer_price
      this.other_offer = response.records[0].other_offer
      this.offer = response.records[0].product_weight
      this.product_image = response.records[0].product_image
      this.product = response.records[0].product
      this.product_weight = response.records[0].product_weight
      this.product_unit = response.records[0].product_unit
      this.store_name = response.records[0].store_name
      this.offer_price = response.records[0].offer_price
      this.offer_end_time = response.records[0].offer_end_time
      if (this.other_offer == "") {
        this.IfOfferPresent = true;
        this.IfOtherOfferPresent = false;
      } else {
        this.IfOfferPresent = false;
        this.IfOtherOfferPresent = true;
      }
      if (response.records[0].seller_toggle.whatsapp == false) {
        this.whatsapp_status = false
      } else {
        this.whatsapp_status = true
      }

      if (response.records[0].seller_toggle.instagram == false) {
        this.instagram_status = false;
      } else {
        this.instagram_status = true
      }


      if (response.records[0].seller_toggle.delivery_availability == "1") {
        this.ProductDelivery = true;
      } else {
        this.ProductDelivery = false
      }
      

      if (response.records[0].seller_toggle.website == false) {
        this.website_status = false
      } else {
        this.website_status = true
      }
      if (response.records[0].seller_toggle.facebook == false) {
        this.facebook_status = false
      } else {
        this.facebook_status = true
      }
      if (response.records[0].seller_toggle.youtube == false) {
        this.youtube_status = false
      } else {
        this.youtube_status = true
      }
      if (response.records[0].seller_toggle.contact_number == false) {
        this.contact_status = false
      } else {
        this.contact_status = true
      }
      if (response.records[0].seller_toggle.whatsapp == false && response.records[0].seller_toggle.contact_number == false && response.records[0].seller_toggle.instagram == false && response.records[0].seller_toggle.youtube == false && response.records[0].seller_toggle.facebook == false && response.records[0].seller_toggle.website == false) {
        this.Socialdetailavailable=true
      }else{
        this.Socialdetailavailable=false
      }
      console.log(this.other_offer);
      this.searchRecord = response.records;
      this.HideOfferCard=false;
    }, (error: any) => {
      console.log(error);
      this.cardVisible=false;
      this.HideOfferCard=true;
    });

    var i = 0;

    const DecTimer = setInterval(() => {
      i++;
        var newDateFormat = new Date(this.offer_end_time).valueOf()
        var noTime = this.offer_end_time.split(' ')[0];        
        var newTime = new Date(newDateFormat - i * 1000);        
        var testTime = newTime.toLocaleTimeString()
        this.offerTimer = testTime;
        this.noTimer = noTime;
    }, 1000);
    this.clearTime = DecTimer

  }

  HideOfferCard:any;
  getProductList() {
    this.http.get('/list_all_product_user').subscribe((response: any) => {
      this.searchProductList = response.records;
      console.log(response);

    }, (error: any) => {
      console.log(error);
    });
  }

  backToHome() {
    this.router.navigate(['/homepage'])
  }

}

