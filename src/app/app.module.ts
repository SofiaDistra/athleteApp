import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SetupComponent } from './setup/setup.component';
import {AppRoutingModule} from "./app-routing.module";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SetupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js',
      {
        registrationStrategy: 'registerImmediately'
      })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
