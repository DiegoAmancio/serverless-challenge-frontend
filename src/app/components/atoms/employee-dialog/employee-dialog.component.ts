import { Component, Inject, Input } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Employee } from '../../molecules/employee-cards/employee-cards.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  standalone: true,
  imports: [CommonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  styleUrl: './employee-dialog.component.css',
})
export class EmployeeDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<EmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { dialogLabel: string; employee: Employee, confirmButtonLabel: 'Atualizar' | 'Confirmar', showCancelButton: boolean },
  ) { }

  onDelete(): void {
    this.dialogRef.close({ action: 'delete', employee: this.data.employee });
  }

  emptyCargo = () => this.data.employee.Cargo === ''
  emptyNome = () => this.data.employee.Nome === ''
  emptyIdade = () => this.data.employee.Idade === ''
  invalidIdadeNumber = () => !this.isNumber(this.data.employee.Idade)
  canConfirm = () => !this.emptyCargo() && !this.emptyNome() && !this.emptyIdade() && !this.invalidIdadeNumber()

  isNumber(number: string) {
    return !isNaN(parseFloat(number)) && isFinite(parseFloat(number));
  }

  onConfirm(): void {
    this.dialogRef.close({ action: 'confirm', employee: this.data.employee });
  }
  onCancel(): void {
    this.dialogRef.close({ action: 'cancel', employee: this.data.employee });
  }
}
