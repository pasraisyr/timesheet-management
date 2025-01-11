import { Component, ChangeDetectionStrategy, inject, Input, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TimesheetFormComponent } from '../timesheet-form/timesheet-form.component';
import { MatTableDataSource } from '@angular/material/table';
import { TimesheetElement } from '../timesheet/timesheet.component';

/** @title Simple form field */
@Component({
  selector: 'form-field-overview-example',
  templateUrl: './upper-container.component.html',
  styleUrls: ['./upper-container.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpperContainer implements OnInit {
  @Input() dataSource!: MatTableDataSource<TimesheetElement>;
  searchQuery: string = '';

  private dialog = inject(MatDialog);

  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open(TimesheetFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Handle the result if needed
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  searchTimesheets(): void {
    this.dataSource.filter = this.searchQuery.trim().toLowerCase();
  }
}
