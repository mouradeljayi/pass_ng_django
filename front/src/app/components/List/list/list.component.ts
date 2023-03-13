import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  users: User[] = [];

  // @Input() currentUsers: User= {

  //   id: 1,
  //   Name: '' ,
  //   Email: '' ,
  //   Lastname: new String() ,
  //   Role: '' ,
  //   Etat: '' ,
  //   Note:'' ,
  // Date: new Date(),

  //   field:'',
  //   image:'' ,
  //   };
    submitted = false;


  constructor(private appservice: UserService) { }

  ngOnInit(): void {
    this.getUser();
  }



  getUser(): void {
    this.appservice.getAll().subscribe(
      (res: User[]) => {
        this.users = res;
        console.log(res);
      },
      error => {
        console.log(error);
      }
    );
  }

  // updateApp(): void {
  //   this.appservice.update(this.currentUsers.id, this.currentUsers).subscribe({
  //     next: (res: User) => {
  //       console.log(res);
  //     },
  //     error: (e: any) => console.error(e)
  //   });
  // }

  deleteApp(id: number): void {
    this.appservice.delete(id).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
}
