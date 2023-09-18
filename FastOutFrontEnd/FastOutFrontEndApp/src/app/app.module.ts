import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import { Route, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './auth/auth.guard';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

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
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileComponent } from './components/profile/profile/profile.component';
import { PlatformCreateComponent } from './components/platform-create/platform-create.component';
import { ResourceCreateComponent } from './components/resource-create/resource-create.component';
import { EquipmentCreateComponent } from './components/equipment-create/equipment-create.component';


// definizione array delle rotte di tipo Route
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const routes: Route[] = [
  { path: '', component: HomeComponent },

  { path: 'platforms', component: PlatformsComponent, canActivate: [AuthGuard] },
  { path: 'platforms/:id', component: PlatformDetailsComponent, canActivate: [AuthGuard] },
  { path: 'createPlatform', component: PlatformCreateComponent, canActivate: [AuthGuard] },

  { path: 'resources', component: ResourcesComponent, canActivate: [AuthGuard] },
  { path: 'resources/:id', component: ResourceDetailsComponent, canActivate: [AuthGuard] },
  { path: 'createResource', component: ResourceCreateComponent, canActivate: [AuthGuard] },

  { path: 'equipments', component: EquipmentsComponent, canActivate: [AuthGuard] },
  { path: 'equipments/:id', component: EquipmentDetailsComponent, canActivate: [AuthGuard] },
  { path: 'createEquipment', component: EquipmentCreateComponent, canActivate: [AuthGuard] },

  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'users/:id', component: UserDetailsComponent, canActivate: [AuthGuard] },

  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },

  { path:'login', component:LoginComponent },
  { path:'register', component:RegisterComponent },

  { path: '**', redirectTo: '' }
]
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


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
    RegisterComponent,
    ProfileComponent,
    PlatformCreateComponent,
    ResourceCreateComponent,
    EquipmentCreateComponent
  ],
  imports: [
    BrowserModule,

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    RouterModule.forRoot(routes), // import RouterModule con metodo forRoot applicato alle rotte
    HttpClientModule, // import HttpClientModule per gestione metodi http
    FormsModule
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
