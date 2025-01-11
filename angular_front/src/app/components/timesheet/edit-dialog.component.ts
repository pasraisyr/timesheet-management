import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TimesheetElement } from './timesheet.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import this module
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCardModule,
    CommonModule 
  ]
})
export class EditDialogComponent implements OnInit {
  editForm: FormGroup;
  users: any[] = [];
  status: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TimesheetElement,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.editForm = this.fb.group({
      project: [data.project, Validators.required],
      task: [data.task, Validators.required],
      dateFrom: [data.dateFrom, Validators.required],
      dateTo: [data.dateTo, Validators.required],
      status: [data.status, Validators.required],
      assignTo: [data.assignTo, Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchUsers();
    this.fetchStatus();
  }

  fetchUsers(): void {
    this.http.get<any[]>('http://localhost:8080/api/users').subscribe(users => {
      this.users = users;
    });
  }
  fetchStatus(): void {
    this.http.get<any[]>('http://localhost:8080/api/status').subscribe(status => {
      this.status = status;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.editForm.valid) {
      this.dialogRef.close(this.editForm.value);
    }
  }
}
