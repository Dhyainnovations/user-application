import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../shared/http.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations'; 
import Swal from 'sweetalert2';


@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
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
        animate('500ms 200ms ease-out', style({ transform: 'translateX(0%)', opacity: 1 }, ))
      ])
    ]),
    trigger('slideup', [
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(150%)' }),
        animate('500ms 200ms ease-out', style({ transform: 'translateY(0%)', opacity: 1 }, ))
      ])
    ])
  ]
})
export class SupportPage implements OnInit {

  constructor(private http: HttpService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {

  }
  userdetails: any = JSON.parse(atob(localStorage.getItem("24hrs-user-data")));

  problemDescription: any = '';


  backToPrivious() {
    this.router.navigate(['/homepage'])
  }



  searchPage() {
    this.router.navigate(['/searchpage'])
  }

  setalarm() {
    this.router.navigate(['/setalarm'])
  }

  notification() {
    this.router.navigate(['/notification'])
  }

  submit() {

    const Data = {
      tbid: this.userdetails.id,
      description: this.problemDescription
    }

    this.http.post('/user_description', Data).subscribe((response: any) => {
      if (response.success == "true") {
        this.problemDescription = '';
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
          title: 'Message Send Successfully'
        })
      } else {

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
    }
    );

  }

  navigateToFaq(){
    this.router.navigate(['/faq'])
  }

  
}




