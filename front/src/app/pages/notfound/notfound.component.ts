import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent {
constructor(private location : Location){}


goBack() : void {
  this.location.back()
}

toggleDarkTheme(): void {
  document.body.classList.toggle('dark-theme');
}


}


