import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SplashComponent } from './splash/splash.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: SplashComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent },
];
