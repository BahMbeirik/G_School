import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { StudentsComponent } from "./components/students/students.component";
import { ClassesComponent } from "./components/classes/classes.component";
import { ProfsComponent } from "./components/profs/profs.component";
import { SettingComponent } from "./components/setting/setting.component";
import { PhelpComponent } from "./components/phelp/phelp.component";

const Routing: Routes = [
    {
        path:'', redirectTo: 'home', pathMatch: 'full'
    },
    {  
        path: 'home', component: HomeComponent 
    },
    {
      path:'students', component:StudentsComponent
    },
      {
        path:'classes',
        component:ClassesComponent
      },
      {
        path:'profs',
        component:ProfsComponent
      },
      {
        path:'setting',
        component:SettingComponent
      },
      {
        path:'help',
        component:PhelpComponent
      },
  
      {
          path: '**',
          redirectTo: 'error/404',
      },
]

export { Routing };