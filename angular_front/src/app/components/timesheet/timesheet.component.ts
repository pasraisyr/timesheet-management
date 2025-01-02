import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from '../timesheet/confirmation-dialog.component';
import { EditDialogComponent } from '../timesheet/edit-dialog.component';
import { FormsModule } from '@angular/forms';
import { TimesheetFormComponent } from '../timesheet-form/timesheet-form.component';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe, CommonModule } from '@angular/common';

export interface TimesheetElement {
  id: number;
  project: string;
  task: string;
  dateFrom: Date;
  dateTo: Date;
  status: string;
  assignTo: string;
}

@Component({
  selector: 'app-timesheet',
  providers: [DatePipe],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, FormsModule, MatButtonModule],
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {
  searchQuery: string = '';
  displayedColumns: string[] = ['project', 'task', 'dateFrom', 'dateTo', 'status', 'assignTo', 'actions'];
  dataSource = new MatTableDataSource<TimesheetElement>();

  constructor(private http: HttpClient, public dialog: MatDialog, private datePipe: DatePipe) { }

  ngOnInit(): void {
    // Initially, do not load data
  }

  fetchData(): void {
    this.http.get<TimesheetElement[]>('http://localhost:8082/api/timesheets').subscribe(data => {
      // Format the date fields using DatePipe
      data.forEach(item => {
        item.dateFrom = new Date(this.datePipe.transform(item.dateFrom, 'yyyy-MM-dd')!);
        item.dateTo = new Date(this.datePipe.transform(item.dateTo, 'yyyy-MM-dd')!);
      });
      this.dataSource.data = data;
      this.dataSource.filterPredicate = (data: TimesheetElement, filter: string) => {
        const searchString = filter.trim().toLowerCase();
        return data.project.toLowerCase().includes(searchString) ||
               data.task.toLowerCase().includes(searchString) ||
               this.datePipe.transform(data.dateFrom, 'yyyy-MM-dd')?.includes(searchString) ||
               this.datePipe.transform(data.dateTo, 'yyyy-MM-dd')?.includes(searchString) ||
               data.status.toLowerCase().includes(searchString) ||
               data.assignTo.toLowerCase().includes(searchString);
      };
    });
  }

  deleteElement(element: TimesheetElement): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { id: element.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.delete(`http://localhost:8082/api/timesheets/${element.id}`).subscribe(() => {
          this.fetchData();
        });
      }
    });
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (!filterValue) {
      this.dataSource.filter = ''; // Reset filter if search query is empty
    }
  }

  searchTimesheets(): void {
    this.fetchData(); // Fetch data whenever search is performed
    this.applyFilter(this.searchQuery);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TimesheetFormComponent);
  }

  editElement(element: TimesheetElement): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '400px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.put(`http://localhost:8082/api/timesheets/${element.id}`, result).subscribe(() => {
          this.fetchData();
        });
      }
    });
  }
}