import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { Password } from 'src/app/models/Password';
import { PasswordService } from 'src/app/services/password/password.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Application } from 'src/app/models/Application';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { User } from 'src/app/models/user';


declare var window:any;
@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.component.html',
  styleUrls: ['./passwords.component.css']
})
export class PasswordsComponent implements OnInit{

  bgColor=''
  successMessage=''
  errorMessage=''  

  cUser :any
  cEmail=''
  mypwd=false

  searchText:any;

  showPwds = false;

  iuser?:any
  useremail?:''

  mypassword:string=''
  message = '';

  
  idpass:any
  user_name:any
  app_name:any
  Password:any
  Datecreation:any
  IdUser:any
  Etat:any
  IdApp:any

  currentPassword: Password =new Password()
  

  myapp:Application=new Application();

  isPasswordVisible: boolean = false
  inputType='password'
  color:any=""
 
  passwords: Password[] =[]
  userApps:any[]=[]
  
  password = ''
  passwordLength = 0
  includeLetters = false
  includeNumbers = false
  includeSymbols = false
  listApps: any[] =[]
  mode = 'list';

  Email:String|null = localStorage.getItem("Email")
  Role:String|null = localStorage.getItem("Role")

  cuId:any = localStorage.getItem("id")
  userid=parseInt(this.cuId)

  deleteModal:any
  idTodelete:number=0
  constructor(private clipboard: Clipboard ,private passwordService: PasswordService,
    private router: Router,private route:ActivatedRoute) {
    }
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
      pdf.text('La liste de mots de passe',70,40);
      autoTable(pdf,{
        margin: { top: 50 },
        html:"#pwdtable"});  
        pdf.text('exported by '+this.cuname,133,40)
      pdf.text(this.culastname,180,40)
      pdf.text(this.str,145,50)
      pdf.addImage(img2, 'png',1 , 272, 208, 25),
      pdf.save("passwords_list.pdf");
  }
    
  ngOnInit() {
    this.reloadData();
    this.getuserbyid();
    this.getEmail();
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('delete')
    )
    this.route.paramMap.subscribe(params => {
      var usid = Number(params.get('id'));
      this.iuser=usid
      
    })
  }

  updateEtat(p:Password){
    p.Etat = !p.Etat
    this.passwordService.updatePassword(p.id, p).subscribe({
      next: (res) => {
        this.bgColor="bg-success"
        this.successMessage="L'etat est modifié avec succès"
      },
      error:(err) => {
        console.log(err);
        this.bgColor="bg-danger"
        this.errorMessage="Erreur de modification"
      }
    });
  }

  getuserbyid(){
    const iduser=this.route.snapshot.params["id"]
    this.cUser= this.passwordService.getUser(iduser).subscribe({
      next: (res) => {
        console.log(res);
        this.cUser=res
      },
      error: (e) => console.error(e)
    });
  }

  getEmail(){
    this.cEmail=this.cUser.Email
    return this.cEmail
  }

    getuid(){
      return this.iuser;
    }
  
  showPassword(id:number) {
      this.mypwd=true
      //this.inputType=this.inputType=== 'text'?'password':'text'
    
  }

  modal(id:number,user_name:any,app_name:any,Datecreation:any ,Etat:any,IdUser:any,IdApp:any){
      this.idpass=id;
      this.user_name=user_name
      this.app_name=app_name;
      this.Datecreation=Datecreation;
      this.Etat=Etat
      this.IdUser=IdUser;
      this.IdApp=IdApp;
  }
  
 

  getid(){
    return this.idpass;
  }

 reloadData() {
  this.getUserPasswords()
  this.getAppsList()
}
onsubmit(){
  console.log('it does nothing',this.password);
}

  updatepassword() :void{
    console.log('it does nothing',this.password);
    console.log(this.Datecreation)
    this.message = '';

    this.currentPassword = {
      id:this.idpass,
      user_name: this.user_name,
      app_name: this.app_name,
      Password:this.password,
      Datecreation:this.Datecreation,
      Etat:this.Etat,
      IdUser:this.IdUser,
      IdApp:this.IdApp
    };

    //console.log('it does nothing',this.currentPassword.IdUser);
    this.passwordService.updatePassword(this.currentPassword.id, this.currentPassword).subscribe({
      next: (res) => {
        console.log(res);
        this.message =  'This tutorial was updated successfully!';
        location.reload()
      },
      error: (e) => console.error(e)
    });
  }

  
  //copy text on double click for 12 seconds
  copyText(textToCopy: any) {
    this.clipboard.copy(textToCopy);
    setTimeout(() => {
      this.clipboard.copy(" ");
    }, 12000);
  
  }
  onCancel()
  {
    this.mode='list';
  }
  disabledBth() {
    return !(this.passwordLength > 0 && this.passwordLength < 25 && (this.includeLetters || this.includeNumbers || this.includeSymbols))
  }
  onChangeLength(value: string) {
    const parsedValue = parseInt(value)

    if (!isNaN(parsedValue)) {
      this.passwordLength = parsedValue
    }
  }

  onChangeUseLetters() {
    this.includeLetters = !this.includeLetters
  }

  onChangeUseNumbers() {
    this.includeNumbers = !this.includeNumbers
  }

  onChangeUseSymbols() {
    this.includeSymbols = !this.includeSymbols
  }

  generatePassword() {
    const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
    const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numbers = '0123456789'
    const symbols = '!@#$%^&*()_-,.'

    let availableCharacters = ''

    
    if (this.includeLetters) {
      availableCharacters += lowerCaseLetters
      availableCharacters += upperCaseLetters
    }

    if (this.includeNumbers) {
      availableCharacters += numbers
    }

    if (this.includeSymbols) {
      availableCharacters += symbols
    }

    availableCharacters.split('')
    const generatedPassword = []

    for (let i = 0; i < this.passwordLength; i += 1) {
      const max = availableCharacters.length
      const ran = Math.random()
      const idx = Math.floor(ran * (max + 1))

      generatedPassword.push(availableCharacters[idx])

    }

    this.password = generatedPassword.join('')
  }

  
  getUserPasswords() {
    this.passwordService.getPasswordsList().subscribe(
      res => {
        this.passwords=res
      },error =>
      {
        console.log(error)
      }
    )
    };

    getAppsList() {
      this.passwordService.getAppsList().subscribe(
        res => {
          this.listApps=res
        },error =>
        {
          console.log(error)
        }
      )
      };

      Openpwdmodal(id:number){
        this.idTodelete=id
        this.deleteModal.show()
      }

    deletePassword() {
      this.passwordService.deletePassword(this.idTodelete)
        .subscribe(
          data => {
            console.log(data);
            this.passwords=this.passwords.filter(_ => _.id != this.idTodelete)
            this.deleteModal.hide()
          },
          error => console.log("hhhhhhhh"));
    }
    
    
    getuserid(){
      return this.userid
    }
}
