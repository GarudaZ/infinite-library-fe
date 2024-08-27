import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SplashComponent } from './splash/splash.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'home', component: HomeComponent },
  { path: '', component: SplashComponent, pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
