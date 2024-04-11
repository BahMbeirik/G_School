import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { ContentComponent } from './content/content.component';
import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { LayoutComponent } from './layout.component';


@NgModule({
  declarations: [
    ContentComponent,
    HeaderComponent,
    SideBarComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    InlineSVGModule
  ]
})
export class LayoutModule { }
