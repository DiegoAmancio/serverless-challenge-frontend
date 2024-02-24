import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeDialogComponent } from '../../atoms/employee-dialog/employee-dialog.component';
import { deleteEmployee, updateEmployee } from '../../../api/employee';

export type Employee = {
  Id: string;
  Nome: string;
  Cargo: string;
  Idade: string;
}
@Component({
  selector: 'app-employee-cards',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './employee-cards.component.html',
  styleUrl: './employee-cards.component.css'
})
export class EmployeeCardsComponent {
  @Input('employee') employee = {
    Id: '',
    Nome: '',
    Cargo: '',
    Idade: ''
  }
  @Input() deleteEmployeeFromList: any;
  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      width: '300px',
      data: Object.assign({}, this.employee)
    });

    dialogRef.afterClosed().subscribe(result => {
      const { action, employee } = result

      switch (action) {
        case 'update':
          this.updateEmployeeHandle(employee)
          break;
        case 'delete':
          this.deleteEmployeeHandle()
          break;

      }

    });
  }

  updateEmployeeHandle(employee: Employee) {
    updateEmployee(employee)
  }

  deleteEmployeeHandle() {
    this.deleteEmployeeFromList(this.employee)
  }
}
