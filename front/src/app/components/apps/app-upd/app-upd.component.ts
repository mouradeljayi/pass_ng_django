import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Application } from 'src/app/models/Application';
import { ApplicationService } from 'src/app/services/application/application.service';

@Component({
  selector: 'app-app-upd',
  templateUrl: './app-upd.component.html',
  styleUrls: ['./app-upd.component.css']
})
export class AppUpdComponent implements OnInit {
  app: Application = {
    id: 0,
    NomApp: '',
    UrlApp: '',
    Datecreation: new Date,
  };

  allApps : Application[] = []




  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private appserv: ApplicationService
  ) {}
 
  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      var id = Number(param.get('id'));
      this.getById(id);
      
      
      console.log(id)
      console.log(this.getById(id))
      

     
    });


  }
 
  getById(id: number) {
    this.appserv.get(id).subscribe((data) => {
      this.app = data;

     
    });

 
  }
 
  // update() {
  //   this.appserv.update(this.app)
  //   .subscribe({
  //     next:(data) => {
  //       console.log(data.NomApp)
  //       this.router.navigate(["applist"]);
  //     },
  //     error:(err) => {
  //       console.log(err);
  //     }
  //   })
  // }


 
}
