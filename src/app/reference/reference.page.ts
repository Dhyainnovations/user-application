import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-reference',
  templateUrl: './reference.page.html',
  styleUrls: ['./reference.page.scss'],
})

export class ReferencePage implements OnInit {

  @ViewChild('mySlider') slides: IonSlides;

  @ViewChild('el', { static: false }) namedElement: ElementRef;
  constructor(private router: Router) {
    setInterval(() => {
      this.slides.startAutoplay();
    }, 5000);
  }



  ngOnInit() {


  }





  ngAfterViewInit() {
    this.slides.startAutoplay();

  }

  // slide() {
  //   this.ngAfterViewInit()
  // }




  onClick() {
    console.log('element clicked');
    alert('test');
    return true


  }




  navigateToLoginScreen() {
    this.router.navigate(['/welcome'])
  }


}
