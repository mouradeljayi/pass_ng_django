import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-popup-notification',
  templateUrl: './popup-notification.component.html',
  styleUrls: ['./popup-notification.component.css']
})
export class PopupNotificationComponent implements OnInit{
  @Input() message="";
  private el: HTMLElement;

  @Input() bgColor?="";
  
  constructor(private renderer: Renderer2, private elRef: ElementRef) {
    this.el = elRef.nativeElement;
  }
  ngOnInit(): void {
    this.show()
  }



   show() {
     
     this.renderer.setStyle(this.el, 'display', 'flex');
    setTimeout(() => {
      this.hide();
      location.reload()
    }, 1000);
  }

  hide() {
    this.renderer.setStyle(this.el, 'display', 'none');
  }

  close() {
    this.hide();
    this.message = ''
    location.reload()

  }
}
