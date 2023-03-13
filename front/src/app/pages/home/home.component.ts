import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  isVisible: boolean = true;


  ngOnInit(): void {
    
  }

  showSideBar() {
    this.isVisible = !this.isVisible
  }

}
