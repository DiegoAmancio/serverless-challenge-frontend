import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Employee, EmployeeCardsComponent } from "./components/molecules/employee-cards/employee-cards.component";
import { getEmployees } from "./api/employee";


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, EmployeeCardsComponent, CommonModule]
})
export class AppComponent {
  title = 'serverless-challenge-frontend';
  employees = [];

  constructor() {
    this.deleteEmployeeFromList = this.deleteEmployeeFromList.bind(this)

  }
  deleteEmployeeFromList(deletedEmployee: Employee) {
    this.employees = this.employees.filter(({ Id }) => Id !== deletedEmployee.Id)
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
    // this.employees = [
    //   {
    //     "Cargo": "Software Engineer",
    //     "Nome": "John",
    //     "Id": "EMPLOYEE-60a8aa54-6cdd-4540-bc3d-83122b02c10b",
    //     "Idade": "2122"
    //   }
    // ]
  }
}
