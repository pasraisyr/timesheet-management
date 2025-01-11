import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

/** @title Simple form field */
@Component({
  selector: 'app-timesheet-form',
  templateUrl: './timesheet-form.component.html',
  styleUrls: ['./timesheet-form.component.css'],
  providers: [provideNativeDateAdapter()],
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatButtonModule, MatCardModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimesheetFormComponent implements OnInit {
  timesheetForm!: FormGroup;
  users: any[] = [];
  status: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.timesheetForm = this.fb.group({
      project: [''],
      task: [''],
      dateFrom: [''],
      dateTo: [''],
      status: [''],
      assignTo: ['']
    });

    this.fetchUsers();
    this.fetchStatus();
  }

  fetchUsers(): void {
    this.http.get<any[]>('http://localhost:8080/api/users')
      .subscribe(response => {
        this.users = response;
        console.log('Users fetched successfully', this.users);
      }, error => {
        console.error('Error fetching users', error);
      });
  }

  fetchStatus(): void {
    this.http.get<any[]>('http://localhost:8080/api/status')
      .subscribe(response => {
        this.status = response;
        console.log('Status fetched successfully', this.status);
      }, error => {
        console.error('Error fetching status', error);
      });
  }

  onSubmit(): void {
    this.http.post('http://localhost:8080/api/timesheets', this.timesheetForm.value)
      .subscribe(response => {
        console.log('Timesheet submitted successfully', response);
      }, error => {
        console.error('Error submitting timesheet', error);
      });
  }
}
