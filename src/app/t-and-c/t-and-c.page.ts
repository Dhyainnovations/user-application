import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-t-and-c',
  templateUrl: './t-and-c.page.html',
  styleUrls: ['./t-and-c.page.scss'],
})
export class TAndCPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  backToprivious(){
    this.router.navigate(['/support'])
  }

  

}
