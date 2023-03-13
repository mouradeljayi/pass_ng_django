import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Application } from 'src/app/models/Application';
import { ApplicationService } from 'src/app/services/application/application.service';


declare var window: any;

@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.css']
})
export class AppListComponent implements OnInit {
  //pagination variables
  
  page: number = 1;
  count: number = 0;
  tableSize: number = 4;
  tableSizes: any = [3, 6, 9, 12];


  bgColor=''
    successMessage=''
    errorMessage=''  

    cuname:any = localStorage.getItem("Name")
    culastname:any = localStorage.getItem("Lastname")
    date:Date=new Date()
    str :string= this.date.toLocaleString("fr-Fr")
    
    makepdf(){
      var img = new Image()
      img.src = 'assets/img/logo.png'
      var img2 =new Image()
      img2.src= 'assets/img/banner2.png'
      var pdf=new jsPDF();
      pdf.addImage(img, 'png', 5, 5, 60, 25),
      pdf.text('La liste des applications',70,60);
      autoTable(pdf,{
        margin: { top: 70 },
        html:"#table_export"});  
  
  
  
        // pdf.text('exported by '+this.cuname,133,40).setFontSize(20)
  
        
        pdf.text('exported by '+this.cuname,133,40)
        pdf.text(this.culastname,180,40)
        pdf.text(this.str,145,50)
        pdf.addImage(img2, 'png',1 , 272, 208, 25),
      pdf.save("applications_list.pdf");
    }
    
    
  




  id: any
  NomApp: any
  UrlApp: any
  Datecreation: any


  searchtext: any


  currentApp: Application = new Application()

  apps: Application[] = []


  // @Input() currentApp: Application = {
  //   id: 0,
  //   NomApp: '',
  //   UrlApp: '',
  //   Datecreation: new Date,
  // };



  deleteModal: any;
  idTodelete: number = 0;

  constructor(private appservice: ApplicationService, private router: Router) {

  }
  ngOnInit(): void {
    this.getApps()


    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('delete')
    );


  }

  navigate() {

    this.router.navigate(["/appadd"])

  }





  getApps() {
    this.appservice.getAll().subscribe(
      res => {
        this.apps = res
        console.log(res)
      }, error => {
        console.log(error)
      }
    )
  }

  // updateApp(): void {


  //   this.appservice.update(this.currentApp.id, this.currentApp)
  //     .subscribe({
  //       next: (res) => {
  //         console.log(res);
  //       },
  //       error: (e) => console.error(e)
  //     });
  // }


  updateApp(): void {

    console.log(this.NomApp)
    this.currentApp = {
      id: this.id,
      NomApp: this.NomApp,
      UrlApp: this.UrlApp,
      Datecreation: this.Datecreation
    };


    this.appservice.update(this.currentApp.id, this.currentApp)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.bgColor="bg-success"
          this.successMessage="Application modifié avec succès"
        },
        error:(err) => {
          console.log(err);
          this.bgColor="bg-danger"
          this.errorMessage="Erreur de modification"
        }

      });





  }




  deleteApp(id: number) {
    this.appservice.delete(id).subscribe(
      data => {

        console.log(data)
      }, error => {
        console.log(error)
      }
    )

  }


  getAppData(id: number,
    NomApp: any,
    UrlApp: any,
    Datecreation: any) {
    this.id = id,
      this.NomApp = NomApp,
      this.UrlApp = UrlApp,
      this.Datecreation = Datecreation
  }


  openDeleteModal(id: number) {
    this.idTodelete = id;
    this.deleteModal.show();
  }


  delete() {
    this.appservice.delete(this.idTodelete).subscribe({
      next: (data) => {
        this.apps = this.apps.filter(_ => _.id != this.idTodelete)
        this.deleteModal.hide();
      },
      error: (err) => {
        console.log(err);
      }



    });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getApps();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getApps();
  }
  

}