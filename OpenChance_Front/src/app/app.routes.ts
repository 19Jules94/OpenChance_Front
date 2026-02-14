import { Routes } from '@angular/router';
import { LoginComponent } from '../app/pages/login/login.component';
import { LandingComponent } from './pages/landing/landing';
import { SignUpComponent } from './pages/sing-up/sign-up';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {path:'sign-up',component: SignUpComponent},
    {path:'',component: LandingComponent}
];
