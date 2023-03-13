import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { PasswordService } from 'src/app/services/password/password.service';

@Component({
  selector: 'app-addapppassword',
  templateUrl: './addapppassword.component.html',
  styleUrls: ['./addapppassword.component.css']
})
export class AddAppPasswordComponent implements OnInit {

  IdApp?:string
  listApps: any[] =[]

  iduser?:number
  Etat?:string
	onSelected(value:string): void {
		this.IdApp = value;
	}
  onSelectede(value:string): void {
		this.Etat = value;
	}

  password = ""
  passwordLength = 0
  includeLetters = false
  includeNumbers = false
  includeSymbols = false

  mode = 'list';
  constructor(private passwordService: PasswordService,
    private router: Router, private route:ActivatedRoute) {}

    bgColor=''
    successMessage=''
    errorMessage=''  
      
    

    cuId:any = localStorage.getItem("id")
    userid=parseInt(this.cuId)

  ngOnInit(): void {
    this.getAppsList()
    //throw new Error('Method not implemented.');
    this.route.paramMap.subscribe(params => {
      var id = Number(params.get('id'));
      this.iduser=id
      console.log(id)
    })

  }

  form= new FormGroup({
    pwd:new FormControl('',[Validators.required,Validators.minLength(5)]),
  })
  get f(){
    return this.form.controls;
  }
 
  
  Addpwd(){
    const data = {
      Password: this.password,
      IdUser: this.iduser,
      Etat:this.Etat,
      IdApp: this.IdApp
    };
    

    console.log(data)
    this.passwordService.addPassword(data)
    .subscribe({
      next:(res) => {
        console.log(res)
        this.bgColor="bg-success"
        this.successMessage="Mot de passe ajouté avec succès"
      },
      error:(err) => {
        console.log(err);
        this.bgColor="bg-danger"
        this.errorMessage="Application existe déjà"
      }
    })
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
  getAppsList() {
    this.passwordService.getAppsList().subscribe(
      res => {
        this.listApps=res
        console.log(this.listApps)
      },error =>
      {
        console.log(error)
      }
    )
    };
}
