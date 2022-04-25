import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../shared/http.service';
import Swal from 'sweetalert2';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {



  constructor(private router: Router, private http: HttpService,
    private toastCtrl: ToastController, route: ActivatedRoute) {
    route.params.subscribe(val => {

      this.faq();
    });
  }

  ngOnInit() {
  }

  question: any;
  answer: any;


  backToPrivious() {
    this.router.navigate(['/support'])
  }
  faqs: any = [];
  faq() {


    this.http.get('/user_faq').subscribe((response: any) => {
      this.faqs = response.message.records
    }, (error: any) => {
      console.log(error);
    }
    );
  }
}
