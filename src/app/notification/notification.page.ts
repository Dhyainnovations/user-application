import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../shared/http.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  notificationsDelayInSeconds: string = "2";

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private http: HttpService, route: ActivatedRoute,) {
    route.params.subscribe(val => {
      this.alaramList()


    });
  }

  ngOnInit() {
  }

  notificationList: any = []
  isShown: any = false;
  //-------------- Navigate to searchpage ----------//
  searchPage() {
    this.router.navigate(['/searchpage'])
  }

  //-------------- Navigate to setalarmPage ----------//
  setalarm() {
    this.router.navigate(['/setalarm'])
  }
  notificationListOtherOffer: any;
  //-------------- Get Alaram List ----------//
  alaramList() {
    this.http.get('/alarm_notification',).subscribe((response: any) => {
      console.log(response);
      this.isShown = false;
      if (response.message == "No Records Found") {
        this.isShown = true
      }
      this.notificationListOtherOffer = [];
      for (var i = 0; i < response.records.length; i++) {
        if (response.records[i].other_offer != "") {
          const data = {
            product_image: response.records[i].product_image,
            store_name: response.records[i].store_name,
            offer_time: response.records[i].offer_time,
            total_cost: response.records[i].total_cost,
            other: response.records[i].offer,
            product: response.records[i].product,
            product_unit: response.records[i].product_unit,
            other_offer: response.records[i].other_offer,
            product_weight: response.records[i].product_weight,
            tbid: response.records[i].tbid,
            created_at: response.records[i].created_at,
            store_logo: response.records[i].store_logo
          }
          console.log(this.notificationListOtherOffer);
          this.notificationListOtherOffer.push(data);
        }
      }
      for (var i = 0; i < response.records.length; i++) {
        if (response.records[i].other_offer == "") {
          const data = {
            product_image: response.records[i].product_image,
            store_name: response.records[i].store_name,
            offer_time: response.records[i].offer_time,
            total_cost: response.records[i].total_cost,
            offer: response.records[i].offer,
            product: response.records[i].product,
            product_unit: response.records[i].product_unit,
            product_weight: response.records[i].product_weight,
            tbid: response.records[i].tbid,
            created_at: response.records[i].created_at,
            store_logo: response.records[i].store_logo
          }
          console.log(this.notificationList);
          this.notificationList.push(data);
        }
      }
      console.log(this.notificationList);
      // this.ScheduleNotification()
    }, (error: any) => {
      console.log(error);
      this.isShown = true
    });
  }


  // ScheduleNotification() {
  //   var options: LocalNotificationSchema = {
  //     id: 123,
  //     title: "Sparrow",
  //     body: "Test",
  //     summaryText: "Test Msg",
  //     largeBody: "largeBody",
  //     schedule: { at: new Date(new Date().getTime() + parseInt(this.notificationsDelayInSeconds) * 1000) },
  //     extra: "extra"
  //   }
  //   LocalNotifications.schedule({ notifications: [options] }).then(() => {

  //   })
  // }

}
