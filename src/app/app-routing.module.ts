import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HolidayListComponent } from './holiday-list/holiday-list.component';


const routes: Routes = [
  { path: '', component: LoginComponent },

  { path: 'holiday', component: HolidayListComponent,  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
