import { Component, Input, OnInit } from '@angular/core';
import { EmployeeDialogComponent } from '../../atoms/employee-dialog/employee-dialog.component';
import { Employee } from '../employee-cards/employee-cards.component';
import { MatDialog } from '@angular/material/dialog';
import { createEmployee } from '../../../api/employee';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-floating-button',
  standalone: true,
  imports: [],
  templateUrl: './floating-button.component.html',
  styleUrl: './floating-button.component.css'
})
export class FloatingButtonComponent {
  @Input() addEmployeeInList: any;
  private employee = {
    Id: '',
    Nome: '',
    Cargo: '',
    Idade: ''
  }

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) { }

  openDialog(): void {
    const employeeAux = Object.assign({}, this.employee)

    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      width: '300px',
      data: { dialogLabel: 'Registrar Funcionário', employee: employeeAux, confirmButtonLabel: 'Confirmar', showCancelButton: false },
    });

    dialogRef.afterClosed().subscribe((result: { action: string; employee: Employee; }) => {
      const { action, employee } = result

      if (action === 'confirm') {
        this.addEmployeeInListHandle(employee)
      }
    });
  }
  addEmployeeInListHandle(employee: any) {
    createEmployee(employee).then(({ data }) => {
      this.addEmployeeInList(data)
    }).catch(() => {
      this._snackBar.open('Servidor Indisponivel tente novamente mais tarde', 'Ok');
    })
  }
}