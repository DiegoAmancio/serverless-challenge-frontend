import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Employee, EmployeeCardsComponent } from "./components/molecules/employee-cards/employee-cards.component";
import { getEmployees } from "./api/employee";
import { FloatingButtonComponent } from "./components/molecules/floating-button/floating-button.component";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, EmployeeCardsComponent, CommonModule, FloatingButtonComponent, MatInputModule, FormsModule, MatButtonModule],


})
export class AppComponent {
  title = 'serverless-challenge-frontend';
  employees: Employee[] = [];
  inputValue = ''
  filteredEmployees: Employee[] = []


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
    const lastemployee = employeesAux.pop()

    if (lastemployee !== undefined) {
      return lastemployee['Id']
    }

    return undefined
  }

  filterEmployeeByInput = (filterValue: any) => {
    const searchvalue: string = filterValue.target.value.toLocaleLowerCase();
    this.filteredEmployees = searchvalue === '' ? this.employees : this.employees.filter(({ Nome }) => Nome.toLowerCase().includes(searchvalue))
  }
  getEmployeesHandle(limit = 2) {
    getEmployees({ limit: limit, lastIdFromList: this.getLastId() }).then(({ data }) => {
      this.employees = this.employees.concat(data)
      this.filteredEmployees = this.employees
    })
  }
  ngOnInit() {
    //this.getEmployeesHandle()
  }
}
