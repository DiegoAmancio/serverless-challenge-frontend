import { Employee } from "../components/molecules/employee-cards/employee-cards.component";
import { api } from "./baseURL";

export const getEmployees = (
    { limit, lastIdFromList }: { limit: number, lastIdFromList?: String }) =>
    api.get(`/employee?limit=${limit}&lastIdFromList=${lastIdFromList}`)

export const createEmployee = (data: Employee) => api.post('/employee', data)

export const updateEmployee = (data: Employee) => api.put('/employee', data)

export const deleteEmployee = ({ Id }: Employee) => api.delete(`/employee/${Id}`)