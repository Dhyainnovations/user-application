import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../shared/http.service';
import Swal from 'sweetalert2';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-change-category',
  templateUrl: './change-category.page.html',
  styleUrls: ['./change-category.page.scss'],
})
export class ChangeCategoryPage implements OnInit {

  constructor(private router: Router, private http: HttpService,
    private toastCtrl: ToastController, route: ActivatedRoute) {
    route.params.subscribe(val => {
      this.getCategory()
      this.selectedCategories()
      console.log(this.alredySelectedCategoryList);
      this.CategoryCheck();
    });
  }


  ngOnInit() {
  }

  userdetails: any = JSON.parse(atob(localStorage.getItem("24hrs-user-data")));
  getCategoryList: any = [];
  selectedCategoryList: any = []
  alredySelectedCategoryList: any = []

  buttonColor: string = '#000'; //Default Color
  addEvent() {
    this.buttonColor = '#345465'; //desired Color
  }


  CategoryCheck() {
    if (this.selectedCategoryList.length < 1) {
      this.CategoryVerification = true;
    } else {
      this.CategoryVerification = false;
    }
  }

  backToPrivious() {
    this.router.navigate(['/tabs/tab3'])
  }


  toggleClass(item) {
    if(item){
    item.active = !item.active;
    this.selectedCategoryList.push(item.tbid);
    // console.log(item);
    console.log(this.selectedCategoryList.length);
    this.CategoryCheck();
  }
    
  }

  CategoryVerification: any;
  verify() {
    this.CategoryCheck();
    if (this.CategoryVerification == false) {
      const storeCategory = this.selectedCategoryList.toString();
      console.log(storeCategory);

      const Data = {
        tbid: this.userdetails.id,
        store_category: storeCategory
      }
      console.log(Data);
      this.http.post('/update_store_category', Data).subscribe((response: any) => {
      }, (error: any) => {
        console.log(error);
      });

      this.router.navigate(['/tabs/tab3'])
    }
  }

  getCategory() {
    console.log(this.selectedCategoryList);
    this.http.get('/list_store_category',).subscribe((response: any) => {
      this.getCategoryList = response.records
    }, (error: any) => {
      console.log(error);
    });
  }

  selectedCategories() {
    this.http.get('/store_category_user',).subscribe((response: any) => {
      console.log(response);

      this.alredySelectedCategoryList = response.records
    }, (error: any) => {
      console.log(error);
    });
  }
}
