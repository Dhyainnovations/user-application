import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { LocalNotifications, LocalNotificationSchema } from '@capacitor/local-notifications';
import { ActivatedRoute } from '@angular/router';
import { App } from '@capacitor/app';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  notificationsDelayInSeconds: string = "2";

  public appPages = [
    { title: 'Home', url: '/tabs/tab1',icon: 'assets/icon/home.PNG'},
    { title: 'Set Alarm', url: '/tabs/tab2', icon:'assets/icon/setalarm.png' },
    { title: 'My Alarms', url: '/myalarms',  icon:'assets/icon/myalarms.png' },
    { title: 'My Profile', url: '/tabs/tab3', icon:'assets/icon/myprofile.png' },
    { title: 'Support', url: '/support', icon:'assets/icon/support.png' },
    // { title: 'Log out', url: '/signinpage', icon:'assets/icon/logout.png' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
 
  constructor( private router: Router,private route: ActivatedRoute,private _location: Location) {
    route.params.subscribe(val => {
      App.addListener('backButton', () =>
      {
        if (this._location.isCurrentPathEqualTo('/tabs/tab1'))
        {
          navigator['app'].exitApp();
        } 
        else
        {
          this._location.back();
        }
      });
   
    
    });
   }

  logout() {    
    localStorage.clear()
    this.router.navigate(['/welcome'])
  }

  // ScheduleNotification() {
  //   var options: LocalNotificationSchema = {
  //     id: 123,
  //     title: "title",
  //     body: "Body",
  //     summaryText: "summaryText",
  //     largeBody: "largeBody",
  //     schedule: { at: new Date(new Date().getTime() + parseInt(this.notificationsDelayInSeconds) * 1000) },
  //     extra: "extra"
  //   }
  //   LocalNotifications.schedule({ notifications: [options] }).then(() => {
  //     alert("Notification" + options.schedule);
  //     alert("Notification" + options);
  //   })
  // }


}