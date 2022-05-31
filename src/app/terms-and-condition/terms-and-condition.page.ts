import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-terms-and-condition',
  templateUrl: './terms-and-condition.page.html',
  styleUrls: ['./terms-and-condition.page.scss'],
})
export class TermsAndConditionPage implements OnInit {
  @ViewChild('scroller1') scroller: ElementRef;
  constructor(private router: Router,route: ActivatedRoute) { 
   }

  ngOnInit() {
      
  }
  acceptConditions(){
    this.router.navigate(['/register'],{queryParams:{checkbox:true}})
    
  }

  backToprivious(){
    this.router.navigate(['/signuppage'])
  }
}