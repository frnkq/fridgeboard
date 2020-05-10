import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentComponent } from './content/content.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppMenuComponent } from './app-menu/app-menu.component';



@NgModule({
  declarations: [HeaderComponent, FooterComponent, SidebarComponent, ContentComponent, AppMenuComponent],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ContentComponent,
    AppMenuComponent
  ]
})
export class CoreModule { }
