import { Routes } from '@angular/router';
import {LoginComponent} from './auth/components/login/login.component';
import {PostLogoutComponent} from './auth/components/post-logout/post-logout.component';
import {HomeComponent} from './admin/components/home/home.component';

export const routes: Routes = [
  {component: LoginComponent, path: 'login'},
  {component: PostLogoutComponent, path: 'post-logout'},
  {component: HomeComponent, path: 'home'},
];
