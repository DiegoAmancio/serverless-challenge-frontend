import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';

export type Employee = {
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
  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      width: '300px',
      data: Object.assign({}, this.employee)
    });

    dialogRef.afterClosed().subscribe(result => {
      const { action, employee } = result

      console.log('The dialog was closed');

      switch (action) {
        case 'update':
          this.updateEmployee(employee)
          break;
        case 'delete':
          this.deleteEmployee()
          break;

      }

    });
  }

  updateEmployee(employee: Employee) {
    console.log(employee);

    //chamar backend
  }

  deleteEmployee() {
    console.log(this.employee);

    //chamar backend
  }
}
