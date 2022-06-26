import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from '@shared/shared.module';
import { NavComponent } from './components/nav/nav.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LayoutComponent } from './components/layout/layout.component';


@NgModule({
  declarations: [
    NavComponent,
    OverviewComponent,
    ProfileComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    OverlayModule,
    SharedModule
  ]
})
export class AppModule { }
