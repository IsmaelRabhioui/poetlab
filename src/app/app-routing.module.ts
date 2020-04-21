import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { PoemListComponent } from './poem/poem-list/poem-list.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user/user.component';
import { AuthGuard } from './auth/auth.guard';
import { PoemComponent } from './poem/poem/poem.component';
import { MyPoemsComponent } from './poem/my-poems/my-poems/my-poems.component';
import { UserdetailComponent } from './userdetail/userdetail.component';

const appRoutes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    children: [
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent }
    ]
  },
  { path: 'home', redirectTo: '/home/poem-list', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'poem-list', component: PoemListComponent },
      { path: 'poem', component: PoemComponent },
      { path: 'my-poems', component: MyPoemsComponent },
      { path: 'userdetail', component: UserdetailComponent }
    ],
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/user/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/user/login', pathMatch: 'full' }
];
//, { enableTracing: true })
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
