import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from '../timesheet/confirmation-dialog.component';
import { EditDialogComponent } from '../timesheet/edit-dialog.component';
import { FormsModule } from '@angular/forms';
import { TimesheetFormComponent } from '../timesheet-form/timesheet-form.component';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe, CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';


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
  displayedColumns: string[] = ['project', 'task', 'assignTo','dateFrom', 'dateTo', 'status','actions'];
  dataSource = new MatTableDataSource<TimesheetElement>();
  sortColumns: string[] = ['asc', 'asc', 'asc', 'asc', 'asc', 'asc'];  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  


  constructor(private http: HttpClient, public dialog: MatDialog, private datePipe: DatePipe) { }

  ngOnInit(): void {
    
  }

  fetchData(): void {
    this.http.get<TimesheetElement[]>('http://localhost:8080/api/timesheets').subscribe(data => {
      data.forEach(item => {
        item.dateFrom = new Date(this.datePipe.transform(item.dateFrom, 'MM-dd-yyyy')!);
        item.dateTo = new Date(this.datePipe.transform(item.dateTo, 'MM-dd-yyyy')!);
      });
      this.dataSource.data = data;
    });
  }

  deleteElement(element: TimesheetElement): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { id: element.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.delete(`http://localhost:8080/api/timesheets/${element.id}`).subscribe(() => {
          this.fetchData();
        });
      }
    });
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (!filterValue) {
      this.dataSource.filter = '';
    }
  }

  searchTimesheets(): void {
    this.fetchData();
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
        this.http.put(`http://localhost:8080/api/timesheets/${element.id}`, result).subscribe(() => {
          this.fetchData();
        });
      }
    });
  }
  
  getPageTimeSheet(page: number, sortBy: string, ascending: string): void {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', '10')
      .set('sortBy', sortBy)
      .set('ascending', ascending);

    this.http.get<any>('http://localhost:8080/api/timesheets/page', { params }).subscribe(data => {
      const timesheetData = data.content; 
      timesheetData.forEach((item: TimesheetElement) => {
        item.dateFrom = new Date(this.datePipe.transform(item.dateFrom, 'MM-dd-yyyy')!);
        item.dateTo = new Date(this.datePipe.transform(item.dateTo, 'MM-dd-yyyy')!);
      });
      this.dataSource.data = timesheetData;
      this.dataSource.paginator = this.paginator;
    });
  }

  sortBy(arrayLoc: number): void {
    const sortColumn = this.displayedColumns[arrayLoc];
    const sortOrder = this.sortColumns[arrayLoc] === 'asc' ? 'false' : 'true';
    this.sortColumns[arrayLoc] = this.sortColumns[arrayLoc] === 'asc' ? 'desc' : 'asc';
    this.getPageTimeSheet(0, sortColumn, sortOrder);
  }
}


