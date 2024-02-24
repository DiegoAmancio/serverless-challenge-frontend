import { Component, Inject } from '@angular/core';
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

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  styleUrl: './employee-dialog.component.css',
})
export class EmployeeDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public employee: any
  ) { }

  onDelete(): void {
    this.dialogRef.close({ action: 'delete', employee: this.employee });
  }

  onUpdate(): void {
    this.dialogRef.close({ action: 'update', employee: this.employee });
  }
  onCancel(): void {
    this.dialogRef.close({ action: 'cancel', employee: this.employee });
  }
}
