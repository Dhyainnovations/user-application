import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../shared/http.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from "@angular/forms";
import Swal from 'sweetalert2';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
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
export class Tab2Page {

  form: FormGroup;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private http: HttpService, route: ActivatedRoute,) {
    route.params.subscribe(val => {
      this.resultProductCardVisible = false;
      this.productNameList = [];
      this.storeTbid = ""
      this.getStoreList = [];
      this.selectProductName = ""
      this.storeList();
      this.resultStoreCardVisible = false;
      this.selectStore = ""

    });
  }

  ngOnInit() {
  }

  forProductbtnVisible: any = false
  forStorebtnVisible: any = true
  isVisible: any = false;
  isVisibleForProduct: any = false;
  isShown: any = true;
  selectStore: any = "";
  selectProductName: any;
  storeId: any;
  storeTbid: any = '';
  storeIdUseOfProductSetAlarm: any;
  productTbid: any;
  resultProductCardVisible: any = false
  resultStoreCardVisible: any = false
  forproduct: any = false;
  forstore: any = true;
  getStoreList: any = [];
  storeDetails: any = []
  resultProductDetails: any = []
  productNameList: any = []
  getProductList: any = []
  storeLogo: any;
  description: any;
  storeName: any;
  productImage: any;
  offerTime: any;
  productName: any;
  weight: any;
  unit: any;
  totalCost: any;
  offerPrice: any;

  storeLogForStore: any;
  storeNameForSrore: any;
  storeID: any


  searchPage() {
    this.router.navigate(['/searchpage'])
  }
  notification() {
    this.router.navigate(['/notification'])
  }

  forProduct() {
    this.forproduct = true;
    this.forstore = false;
    this.forProductbtnVisible = true
    this.forStorebtnVisible = false
    this.resultStoreCardVisible = false
    this.selectStore = ""
    this.isVisible = false;
    
  }

  forStore() {
    this.forstore = true;
    this.forproduct = false;
    this.forStorebtnVisible = true
    this.forProductbtnVisible = false
    this.selectStore = "";
    this.resultProductCardVisible = false;
    this.productNameList = [];
    this.isVisible = false;
    this.selectProductName = "";
    
  }

  forproductlist: any = false;



  selectStoreForProductSetAlarm(tbid, name) {
    this.selectStore = name;
    this.selectProductName = "";
    this.resultProductCardVisible = false;
    this.productNameList = []
    this.isVisible = true;
    this.forproductlist = false;
    this.storeTbid= tbid;

    const obj = {
      store_id: tbid
    }
    this.http.post('/product_list_user', obj).subscribe((response: any) => {
      console.log(response);
      this.productNameList = response.records
    }, (error: any) => {
      console.log(error);
    });
  }

  setAlarmForProduct() {

    const obj = {
      store_id: this.storeTbid,
      store_category_id: this.store_category_tbid,
      category_id: this.category_tbid,
      product_id: this.productTbid
    }
    console.log(obj);


    this.http.post('/product_alarm', obj).subscribe((response: any) => {
      console.log(response);
      if (response.success == "true") {
        this.selectProductName = ''
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
          title: 'Alarm Set successfully'
        })
        this.resultProductCardVisible = false;
        this.productNameList = [];
        this.getStoreList = []
      }
      this.router.navigate(['/myalarms'])
    }, (error: any) => {
      this.selectProductName = ''
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1200,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'error',
        title: 'Alarm Already Exist for this product.'
      })
      console.log(error);
    });
    this.resultProductCardVisible = false;
    this.productNameList = [];
  }

  category_tbid: any;
  store_category_tbid: any;
  selectProductToSetAlarm(name) {
    this.IfproductNamePresent = false;
    this.selectProductName = name;
    console.log(name);
    const s = name
    this.http.get('/product_search_user?s=' + s).subscribe((response: any) => {
      console.log(response.records[0]);

      this.category_tbid = response.records[0].category_id;
      this.store_category_tbid = response.records[0].store_category_id;
      this.selectProductName = name;
      this.storeLogo = response.records[0].store_logo
      this.storeName = response.records[0].store_name
      this.productName = response.records[0].product_name
      this.productImage = response.records[0].product_image
      this.description = response.records[0].description
      this.offerTime = response.records[0].offer_time
      this.weight = response.records[0].weight
      this.unit = response.records[0].unit
      this.totalCost = response.records[0].cost
      this.offerPrice = response.records[0].offer_price
      this.productTbid = response.records[0].tbid
      this.isVisibleForProduct = false
      this.resultProductCardVisible = true;
    }, (error: any) => {
      console.log(error);
    });



  }
  IfproductNamePresent: any;
  storeList() {
    this.storeTbid = ""
    this.productNameList = []
    console.log(this.getStoreList);
    this.http.get('/list_stores',).subscribe((response: any) => {
      console.log(response);
      this.getStoreList = response.records
      console.log(response.records);
      console.log(this.getStoreList);
    }, (error: any) => {
      console.log(error);
    });
  }


  searchStores(){
    this.isVisible = true;
    this.resultStoreCardVisible = false
    this.forproductlist = true;
  }

  searchStore() {
    this.isVisible = true;
    this.resultStoreCardVisible = false
  }
  storetbidstore: any;
  selectStoreForGetStoreDetails(tbid, name) {
    this.isVisible = false
    this.selectStore = name;
    this.storeID = tbid;

    const obj = {
      store_name: name
    }
    console.log(obj);

    this.http.post('/store_details_user', obj).subscribe((response: any) => {
      console.log(response);
      if (response.success == "true") {
        this.resultStoreCardVisible = true;
        this.storeLogForStore = response.records.store_logo
        this.storeNameForSrore = response.records.store_name
        this.storetbidstore = response.records.tbid
      }
    }, (error: any) => {
      console.log(error);
    });
  }

  setAlarmForStore() {
    console.log(this.storetbidstore);
    const obj = {
      store_id: this.storetbidstore
    }
    console.log(obj);
    this.http.post('/store_alarm', obj).subscribe((response: any) => {
      console.log(response);
      if (response.success == "true") {
        this.selectStore = ''
        this.resultProductCardVisible = false;
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
          title: 'Alarm Set successfully'
        })
        this.router.navigate(['/myalarms'])
      }

    }, (error: any) => {
      console.log(error);
      this.selectStore = ''
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
        title: 'Alarm Already Exist for this store.'
      })
    });
    this.resultStoreCardVisible = false;
    this.productNameList = [];
    this.selectStore = "";
  }





  productSearchBasedOnStore() {
    this.IfproductNamePresent = true;
    const obj = {
      store_id: this.selectProductName
    }
    console.log(obj);

    this.http.post('/product_list_user', obj).subscribe((response: any) => {
      console.log(response);
      this.getProductList = response.records
      console.log(response.records);
      console.log(this.getStoreList);
    }, (error: any) => {
      console.log(error);
    });

  }

  backToHome() {
    this.router.navigate(['/homepage'])
  }

}