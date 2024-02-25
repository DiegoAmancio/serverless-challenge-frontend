import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Employee, EmployeeCardsComponent } from "./components/molecules/employee-cards/employee-cards.component";
import { getEmployees } from "./api/employee";
import { FloatingButtonComponent } from "./components/molecules/floating-button/floating-button.component";


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, EmployeeCardsComponent, CommonModule, FloatingButtonComponent]
})
export class AppComponent {
  title = 'serverless-challenge-frontend';
  employees: Employee[] = [];

  constructor() {
    this.deleteEmployeeFromList = this.deleteEmployeeFromList.bind(this)
    this.addEmployeeInList = this.addEmployeeInList.bind(this)
  }
  deleteEmployeeFromList(deletedEmployee: Employee) {
    this.employees = this.employees.filter(({ Id }) => Id !== deletedEmployee.Id)
  }
  addEmployeeInList(employee: Employee) {
    this.employees.push(employee)
  }

  getLastId = () => {
    const employeesAux = Object.assign([], this.employees)
    const lastItem = employeesAux.pop()

    if (lastItem !== undefined) {
      return lastItem['Id']
    }

    return undefined
  }
  getEmployeesHandle(limit = 10) {
    getEmployees({ limit: limit, lastIdFromList: this.getLastId() }).then(({ data }) => {
      this.employees = data
    })
  }
  ngOnInit() {

    this.getEmployeesHandle()

  }
}
