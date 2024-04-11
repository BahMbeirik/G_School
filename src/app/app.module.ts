import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './pages/layout/layout.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/components/home/home.component';
import { StudentsComponent } from './pages/components/students/students.component';
import { ClassesComponent } from './pages/components/classes/classes.component';
import { ProfsComponent } from './pages/components/profs/profs.component';
import { SettingComponent } from './pages/components/setting/setting.component';
import { PhelpComponent } from './pages/components/phelp/phelp.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StudentsComponent,
    ClassesComponent,
    ProfsComponent,
    SettingComponent,
    PhelpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
