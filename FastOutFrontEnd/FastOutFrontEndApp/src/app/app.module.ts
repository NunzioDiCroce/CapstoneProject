import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// import Route, RouterModule per gestione rotte
import { Route, RouterModule } from '@angular/router';

// import HttpClientModule per gestione metodi http
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { PlatformsComponent } from './components/platforms/platforms.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { EquipmentsComponent } from './components/equipments/equipments.component';
import { UsersComponent } from './components/users/users.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { PlatformDetailsComponent } from './components/platform-details/platform-details.component';
import { ResourceDetailsComponent } from './components/resource-details/resource-details.component';
import { EquipmentDetailsComponent } from './components/equipment-details/equipment-details.component';
import { LoginComponent } from './auth/login/login/login.component';
import { RegisterComponent } from './auth/register/register/register.component';

// definizione array delle rotte di tipo Route
const routes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'platforms', component: PlatformsComponent },
  { path: 'platforms/:id', component: PlatformDetailsComponent },
  { path: 'resources', component: ResourcesComponent },
  { path: 'resources/:id', component: ResourceDetailsComponent },
  { path: 'equipments', component: EquipmentsComponent },
  { path: 'equipments/:id', component: EquipmentDetailsComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/:id', component: UserDetailsComponent },
  { path: '**', redirectTo: '' }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PlatformsComponent,
    ResourcesComponent,
    EquipmentsComponent,
    UsersComponent,
    UserDetailsComponent,
    PlatformDetailsComponent,
    ResourceDetailsComponent,
    EquipmentDetailsComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    // import RouterModule con metodo forRoot applicato alle rotte
    RouterModule.forRoot(routes),
    // import HttpClientModule per gestione metodi http
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
