import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeCardsComponent } from "./employee-cards/employee-cards.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, EmployeeCardsComponent, CommonModule]
})
export class AppComponent {
  title = 'serverless-challenge-frontend';
  employees = [
    { Id: '', Nome: 'João', Cargo: 'Desenvolvedor', Idade: '25' },
    { Id: '', Nome: 'Maria', Cargo: 'Designer', Idade: '25' },
    { Id: '', Nome: 'Pedro', Cargo: 'Analista de Dados', Idade: '25' }
  ];

}
