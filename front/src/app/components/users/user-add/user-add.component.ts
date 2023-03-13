import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'user-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent {
  constructor(private userService: UserService, private router: Router, private http: HttpClient) {}

  bgColor=''
  successMessage=''
  errorMessage=''

  mode = 'list';
  Roles?: string;
  onSelected(value: string): void {
    this.Roles = value;
  }
  Etats?: string;

  listRole: any[] = [];
  listEtat: any[] = [];

  userf = {
    id: 1,
    Name: '',
    Email: '',
    Lastname: '',
    Role: '',
   // Etat: '',
    Note: '',
    field: '',
    image: '',
    Datecreation: new Date(),
  };

  img: any;
  submitted = false;
  form = new FormGroup({
    Name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    Email: new FormControl('', [Validators.required, Validators.minLength(3)]),
    Lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    Note: new FormControl('', [Validators.required, Validators.minLength(3)]),
    Role: new FormControl('', [Validators.required]),
    //Etat: new FormControl(''),
    image: new FormControl(''),
    field: new FormControl(''),
  });

  createUser() {

    const formData =  new FormData()
    formData.append("Name", this.userf.Name);
    formData.append("Lastname", this.userf.Lastname);
    formData.append("Email", this.userf.Email);
    formData.append("Role", this.userf.Role);
   // formData.append("Etat", this.userf.Etat);
    formData.append("Note", this.userf.Note);
    formData.append("field", this.userf.field);
    formData.append("image", this.userf.image);


    this.userService.create(formData).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/listuser']);
        this.submitted = true;
        
      },
      error:(err) => {
        console.log(err);
        this.bgColor="bg-danger"
        this.errorMessage="Erreur d'ajout'"
      }
    });
  }

  onCancel() {
    this.mode = 'list';
  }
  uploadFile(event: any) {
    const file = event.target.files[0];
    this.userf.field=file

  }


  uploadImage(event: any) {
    const file = event.target.files[0];
    this.userf.image=file

  }


  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
  }
}
