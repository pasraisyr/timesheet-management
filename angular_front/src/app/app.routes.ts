import { Routes } from '@angular/router';
import { TimesheetComponent } from './components/timesheet/timesheet.component';
import {UpperContainer} from './components/upper-container/upper-container.component';
import {TimesheetFormComponent} from './components/timesheet-form/timesheet-form.component';
import { EditDialogComponent } from './components/timesheet/edit-dialog.component';

export const routes: Routes = [
  { 
    path: '', 
    component: TimesheetComponent, 
    // canActivate: [AuthGuard, RoleGuard], // Protect with both AuthGuard and RoleGuard
    // data: { role: 'admin' } // Restrict to 'admin' role
  },
  { 
    path: '', 
    component: TimesheetComponent, 
    // canActivate: [AuthGuard, RoleGuard], // Protect with both AuthGuard and RoleGuard
    // data: { role: 'admin' } // Restrict to 'admin' role
  },
  { 
    path: '', 
    component: EditDialogComponent, 
    // canActivate: [AuthGuard, RoleGuard], // Protect with both AuthGuard and RoleGuard
    // data: { role: 'admin' } // Restrict to 'admin' role
  },
  { 
    path: 'upper-container', 
    component: UpperContainer, 
    // canActivate: [AuthGuard, RoleGuard], // Protect with both AuthGuard and RoleGuard
    // data: { role: 'admin' } // Restrict to 'admin' role
  },
  { 
    path: 'timesheet-form', 
    component: TimesheetFormComponent, 
    // canActivate: [AuthGuard, RoleGuard], // Protect with both AuthGuard and RoleGuard
    // data: { role: 'admin' } // Restrict to 'admin' role
  },

];
