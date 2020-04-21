import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { AppRoutingModule } from './app-routing.module';
import { PoemModule } from './poem/poem.module';
import { UserComponent } from './user/user/user.component';
import { MaterialModule } from './material/material.module';
import { HomeComponent } from './home/home.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddPoemsDialogComponent } from './poem/my-poems/my-poems/add-poems/add-poems-dialog.component';
import { PoemDialogComponent } from './poem/poem/poem-dialog/poem-dialog.component';
import { UserdetailComponent } from './userdetail/userdetail.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainNavComponent,
    UserComponent,
    HomeComponent,
    UserdetailComponent
  ],
  entryComponents: [AddPoemsDialogComponent, PoemDialogComponent],
  imports: [
    PoemModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    ToastrModule.forRoot(),
    FontAwesomeModule,
    ServiceWorkerModule.register('./ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
