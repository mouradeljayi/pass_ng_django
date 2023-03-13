import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';

declare var window: any;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']

})

export class UserListComponent implements OnInit {

  title = 'pagination';
  searchText: any;

export class UserListComponent implements OnInit{
  
  roles:string[] =['admin','user','superadmin']


  bgColor = ''
  successMessage = ''
  errorMessage = ''

  users: User[] = [];

  currentUser: User = new User()

  usrs: User[] = []
  adminUsers: number = 0;
  simpleUsers: number = 0;

  roles: any[] = [];
  apps: any[] = [];

  defaultImg: string = 'assets/img.png';


  id: any
  Name: any
  Email: any
  Lastname: any
  Role: any
  Etat: any
  Note: any
  Datecreation: any
  field?: any
  image?: any


  filteredData:User[] = [];


  picture: any

  fil: any




  deleteModal: any
  idTodelete: number = 0


  //pagination variables

  page: number = 1;
  count: number = 0;
  tableSize: number = 4;
  tableSizes: any = [3, 6, 9, 12];

  makepdf() {

    var img = new Image()
    img.src = 'assets/img/logo.png'
    var img2 = new Image()
    img2.src = 'assets/img/banner2.png'
    var pdf = new jsPDF();
    pdf.addImage(img, 'png', 5, 5, 60, 25),
      pdf.text('La liste des utilisateurs', 70, 40);
    autoTable(pdf, {
      margin: { top: 50 },

      html: "#userlist"
    });
    pdf.addImage(img2, 'png', 1, 272, 208, 25),
      pdf.save("Users_List.pdf");
  }
  Users: User = {


filterByRole(event: any) {
  if (event.target.value === '') {
    this.filteredData = this.users;
  } else {
    this.filteredData = this.users.filter(data => data.Role === event.target.value);
  }
}

Users: User= {


    id: 0,
    Name: '',
    Email: '',
    Lastname: '',
    Role: '',
    // Etat:'' ,
    Note: '',
    Datecreation: '',
    field: '',
    image: '',
  };



  searchtext: any;

  constructor(private userService: UserService, private router: Router) {

  }
  popupVisible = false;
  rating = 0;
  stars = [false, false, false, false, false];

  showPopup() {
    this.popupVisible = true;
  }
  delait() {

  }
  downloafile(field: String) {



  }
  hidePopup() {
    this.popupVisible = false;
  }

  setRating(rating: number) {
    this.rating = rating;
    this.stars = this.stars.map((star, index) => index < rating);
  }
  ngOnInit() {

   this.allUsers();
   this.cd.detectChanges()
   this.deleteModal = new window.bootstrap.Modal(
    document.getElementById('delete')

  )
 
}




  allUsers() {
    this.userService.getAll().subscribe(
      res => {
        this.users = res
        this.filteredData=res
        this.cd.detectChanges()
      }, error => {
        console.log(error);
      }
    )
  }
  showRating = false;
  selectedItem: any;






  generaite() {
    this.router.navigate(["/password"])

  }

  navigate() {

    this.router.navigate(["/adduser"])

  }


  navigate1() {

    this.router.navigate(["/update"])

  }


  Openmodal(id: number) {
    this.idTodelete = id
    this.deleteModal.show()
  }
  delete() {
    this.userService.delete(this.idTodelete)
      .subscribe(
        data => {
          console.log(data);
          this.users = this.users.filter(_ => _.id != this.idTodelete)
          this.deleteModal.hide()
        },
        error => console.log(error));
  }

  uploadFile(event: any) {
    const file = event.target.files[0];
    this.fil = file

  }


  uploadImage(event: any) {
    const file = event.target.files[0];
    this.picture = file

  }




  updateUser(): void {


    this.currentUser = {
      id: this.id,
      Name: this.Name,
      Email: this.Email,
      Lastname: this.Lastname,
      Role: this.Role,
      //  Etat: this.Etat,
      Note: this.Note,
      Datecreation: this.Datecreation,
      field: this.field,
      image: this.image,
    };


    const formdata = new FormData()

    formdata.append("Name", this.Name)


    formdata.append("Lastname", this.Lastname)
    formdata.append("Email", this.Email)

    formdata.append("Note", this.Note)

    formdata.append("Role", this.Role)
    //formdata.append("Etat",this.Etat)

    if (this.picture) {
      formdata.append("image", this.picture)
    }

    if (this.fil) {
      formdata.append("field", this.fil)
    }




    this.userService.update(this.currentUser.id, formdata)
      .subscribe({
        next: (res) => {

          console.log(res);
          this.bgColor = "bg-success"
          this.successMessage = "Utilisateur modifié avec succès"
        },
        error: (err) => {
          console.log(err);
          this.bgColor = "bg-danger"
          this.errorMessage = "Erreur de modification"
        }

      });





  }


  getUserData(id: number,
    Name: any,
    Email: any,
    Lastname: any,
    Role: any,
    // Etat: any,
    Note: any,
    Datecreation: any,
    field: any,
    image: any) {
    this.id = id,
      this.Name = Name,
      this.Email = Email,
      this.Lastname = Lastname,
      this.Role = Role,
      //this.Etat = Etat,
      this.Note = Note,
      this.Datecreation = Datecreation,
      this.field = field,
      this.image = image
  }


  //pagination methodes

  onTableDataChange(event: any) {
    this.page = event;
    this.allUsers();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.allUsers();
  }

}
