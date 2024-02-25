import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeDialogComponent } from '../../atoms/employee-dialog/employee-dialog.component';
import { deleteEmployee, updateEmployee } from '../../../api/employee';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  openDialog(): void {
    const employeeAux = Object.assign({}, this.employee)
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      width: '300px',
      data: { dialogLabel: 'Detalhes do Funcionário', employee: employeeAux, confirmButtonLabel: 'Atualizar', showCancelButton: false },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        const { action, employee } = result

        switch (action) {
          case 'confirm':
            this.updateEmployeeHandle(employee)
            break;
          case 'delete':
            this.deleteEmployeeHandle()
            break;
        }
      }
    });
  }

  updateEmployeeHandle(employee: Employee) {
    updateEmployee(employee).then(() => {
      this._snackBar.open('Funcionário Atualizado!', 'Ok');
      this.employee = employee
    }).catch(() => {
      this._snackBar.open('Servidor Indisponivel tente novamente mais tarde', 'Ok');
    })
  }

  deleteEmployeeHandle() {
    deleteEmployee(this.employee).then(() => {
      this._snackBar.open('Funcionário Apagado do Registro!', 'Ok');
      this.deleteEmployeeFromList(this.employee)
    }).catch(() => {
      this._snackBar.open('Servidor Indisponivel tente novamente mais tarde', 'Ok');
    })

  }
}
