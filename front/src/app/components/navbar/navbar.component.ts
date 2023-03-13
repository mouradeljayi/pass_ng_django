import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth-service.service';
import { UserService } from 'src/app/services/user/user.service';


declare var window: any;


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  
  bgColor=''
  successMessage=''
  errorMessage=''  
  

  defaultImg: string = 'assets/user.png';
  user: User = new User()
  currentname: string | null = ""

  isDroped: boolean = false

  authUserInfo :any = new User()
  picture: any

  constructor(public router: Router, public authService: AuthService, public userServ: UserService) {}


  ngOnInit(): void {
    this.getAuthUser()
    console.log("user : "+  this.getAuthUser())
  }

  toggleDarkTheme(): void {
    document.body.classList.toggle('dark-theme');
  }
  

  showDropDown() {
    this.isDroped = !this.isDroped
  }

  getAuthUser() {
    this.userServ.get(localStorage.getItem('id')).subscribe(
      res => {
        this.authUserInfo = res
      },error => {
        console.log(error)
      }
    )
  }


      Datecreation : any=localStorage.getItem("Datecreation")
      field :any|null=localStorage.getItem("field") 
      image :any|null=localStorage.getItem("image")

      uploadImage(event : any){
        const file = event.target.files[0]
        this.picture = file
      }

      

  updateProfile() : void {


    const formdata = new FormData()

    formdata.append("Name", this.authUserInfo.Name)
    formdata.append("Lastname", this.authUserInfo.Lastname)
    formdata.append("Email", this.authUserInfo.Email)
    formdata.append("Role", this.authUserInfo.Role)
    formdata.append("Note", this.authUserInfo.Note)
    if(this.picture) {
        formdata.append("image", this.picture)
    }

    this.userServ.update(localStorage.getItem('id'), formdata).subscribe({

        next: (res) => {
        this.bgColor="bg-success"
        this.successMessage="Profile modifié avec succès"
        },
        error:(err) => {
          this.bgColor="bg-danger"
          this.errorMessage="Erreur de modification"
          console.log(err)
        }
      });


  }


  lougout() {
    this.authService.logout();
    this.router.navigate(['/login']);

  }



}


