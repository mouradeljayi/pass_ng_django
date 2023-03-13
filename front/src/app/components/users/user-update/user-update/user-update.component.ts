import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent {
  mode = 'list'

  // Users: User= {

  //   id: 0,
  //   Name:'' ,
  //   Email:'' ,
  //   Lastname:'' ,
  //   Role:'' ,
  //   Etat:'' ,
  //   Note:'' ,
  // Date: new Date(),

  //   field:'',
  //   image:'' ,
  //   };


  submitted = false;


  onCancel(){
    this.mode='list'
  }



  constructor(private UserService: UserService) { }

add(data : any){

  this.UserService.update(data.id,data)
  .subscribe({
    next: (res) => {
      console.log(res);
      this.submitted = true;
    },
    error: (e) => console.error(e)
  });

}





  form = new FormGroup({
    appname: new FormControl('', [Validators.required, Validators.minLength(3),Validators.minLength(5)]),
    appurl: new FormControl('', [Validators.required, Validators.minLength(3),Validators.minLength(5)]),
    date: new FormControl('', [Validators.required, Validators.minLength(3),Validators.minLength(5)]),
    role: new FormControl('', [Validators.required, Validators.minLength(3),Validators.minLength(5)]),
    prenom: new FormControl('', [Validators.required, Validators.minLength(3),Validators.minLength(5)]),
    nom: new FormControl('', [Validators.required, Validators.minLength(3),Validators.minLength(5)]),
  });

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
  }

}
