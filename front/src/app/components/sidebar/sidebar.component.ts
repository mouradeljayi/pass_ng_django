import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { Menu } from './menu';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit  {


  public userRole: string ="";
 

  public menuProperties: Array<Menu> = [
    {
      id: '1',
      title: 'Tableau de bord',
      icon: 'fa-solid fa-house-user',
      isAdmin:false,
      url: 'dashboard',
      visibleRoles: ['superadmin'],
      sousMenu: [
        {
          id: '11',
          title: 'Statistiques',
          icon: 'fa-solid fa-chart-pie',
          url: 'dashboard',
        },
        
      ]
    },
    {
      id: '2',
      title: 'Gestion de passwords',
      icon: 'fa-solid fa-boxes',
      url: 'password',
      isAdmin:true,
      visibleRoles: ['admin', 'superadmin', 'user'],
      sousMenu: [
        {
          id: '21',
          title: 'password list',
          icon: 'fa-solid fa-list',
          url: 'password',
        },
        
      ]
    },
    {
      id: '3',
      title: 'Applications',
      icon: 'fa-solid fa-list',
      url: '',
      isAdmin:true,
      visibleRoles: ['admin', 'superadmin'],
      sousMenu: [
        {
          id: '31',
          title: 'Ajouter',
          icon: 'fa-solid fa-plus',
          url: 'appadd',
        },
        {
          id: '32',
          title: 'Liste',
          icon: 'fa-solid fa-list',
          url: 'applist',
        },
      ]
    },
    {
      id: '4',
      title: 'Utilisateurs',
      icon: 'fa-solid fa-users',
      url: '',
      isAdmin:true,
      visibleRoles: ['admin', 'superadmin'],
      sousMenu: [
        {
          id: '41',
          title: 'Ajouter',
          icon: 'fa-solid fa-plus',
          url: 'adduser',
        },
        {
          id: '42',
          title: 'List',
          icon: 'fa-solid fa-list',
          url: 'listuser',
        },
      ]
    },
    {
      id: '5',
      title: 'Parametrages',
      icon: 'fa-solid fa-cogs',
      url: '',
      visibleRoles: ['admin', 'superadmin', 'user'],
      sousMenu: [
        {
          id: '51',
          title: 'Categories',
          icon: 'fa-solid fa-list',
          url: 'categories',
        },
        {
          id: '52',
          title: 'Utilisateurs',
          icon: 'fa-solid fa-users',
          url: 'users',
        },
      ]
    },
  ];

  private lastSelectedMenu: Menu | undefined;

  
  constructor(private router:Router, public authService: AuthService) {
    this.userRole = authService.getUserRole() ?? 'user';
    // obtenir le rôle de l'utilisateur à partir du service d'authentification
   }

  ngOnInit(): void {
  }

  navigate(menu: Menu) {
    if (this.lastSelectedMenu) {
      this.lastSelectedMenu.active = false;
    }
    menu.active = true;
    this.lastSelectedMenu = menu;
    this.router.navigate([menu.url]);
  }

}