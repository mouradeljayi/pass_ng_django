import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartOptions } from 'chart.js';
import { User } from 'src/app/models/user';
import { StatsService } from 'src/app/services/stats/stats.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit  {

  users:User [] = [];
  adminUsers: number = 0;
  simpleUsers: number = 0;
  superAdmins: number = 0;
  roles: any [] = []
  apps: any [] = []
  totalApps?: number 
  totalUsers: any
  todayUsers?: any
  lastWeekUsers?: any
  yearUsers?: any;

  constructor(private stats:StatsService) {
  }

  barChartData: ChartConfiguration<'bar'>['data'] | undefined;

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  ngOnInit(): void {
   this.allUsers()
   this.usersRoles()
   this.usersApps()
   this.getTotalApps()
   this.getUserStats()
  }

  getTotalApps() {
    this.stats.getTotalApps().subscribe(
      res => {
        this.totalApps = res.total_App
       
      }, error => {
        console.log(error);
      }
    )
  }


  getUserStats() {
     this.stats.getUserStats().subscribe(
      res => {
        this.totalUsers = res.users_count
        this.todayUsers = res.users_today
        this.yearUsers = res.users_this_year
        this.lastWeekUsers = res.users_last_week

       let num1 = ( ( this.lastWeekUsers ) / (this.todayUsers + this.yearUsers + this.lastWeekUsers) ) * 100
        
       let num2 = ( (this.yearUsers) / (this.lastWeekUsers + this.todayUsers + this.yearUsers) ) * 100

       let num3 = ( (this.todayUsers) / (this.lastWeekUsers + this.todayUsers + this.yearUsers) ) * 100
   
        this.barChartData = {
          labels: [ "Dernière semaine", "Cet année", "Aujourd'hui" ],
          datasets: [
            { data: [num1 ,num2, num3 ] , backgroundColor: ['#2196F3', '#9C27B0', '#FF9800'] },
            
          ]
        };
        
      }, error => {
        console.log(error);
      }
    )
  }

  allUsers() {
    this.stats.getAllUsers().subscribe(
     res => {
       this.users = res
     }, error => {
       console.log(error);
     }
   )
 }


  usersRoles() {
    this.stats.getRoleUsers().subscribe(
     (res:any) => {
       this.roles = res
       console.log(res);
      this.adminUsers = res.admin
      this.simpleUsers = res.user
      this.superAdmins = res.superadmin

       this.pieChartLabels = [  'Admin', 'Simple user', 'Super admin' ];
       this.pieChartDatasets = [ {
        data: [ this.adminUsers, this.simpleUsers, this.superAdmins ], backgroundColor: ['#FF6384', '#FFCE56', '#FF9800']
      } ];
     }, error => {
       console.log(error);
     }
   )
 }

 usersApps() {
  this.stats.getAppUsers().subscribe(
   (res:any) => {
     this.apps = res

     let appNames = [];
     let appValues = [];
     let colors =  []

     for(let i = 0; i < Object.keys(res).length; i++) {
      appNames.push(Object.keys(res)[i]);
     }

     for(let i = 0; i <  Object.values(res).length; i++) {
      appValues.push(Object.values(res)[i]);
     }

     
     for(let i = 0; i <  Object.values(res).length; i++) {
      colors.push("#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase());
     }
      this.pieChart2Labels = appNames;
      this.pieChart2Datasets = [ {
       data: appValues, backgroundColor: colors,
     } ];
   
   }, error => {
     console.log(error);
   }
 )
}

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };

  public pieChartLabels : any;
  public pieChartDatasets: any;
  public pieChartLegend = true;
  public pieChartPlugins = [];

  public pieChart2Labels: any;
  public pieChart2Datasets: any;

  public barChartLegend = true;
  public barChartPlugins = [];

  

  

 

    
 

 

  

}
