import { handleResponse } from '../_helpers/handle-response.js';
import urls from './Urls.js';
import { requestOptions } from '../_helpers/request-options.js';

export const employeeDirectoryService = {
    getAllEmployees,
    getAllEmployeeBySkill,
    getAllEmpSkills
};
function getAllEmployees(empPayload) {
    return fetch(urls().getAllEmployees,
    requestOptions.post(empPayload))
        .then(handleResponse)
        .then(user => {
            return user;
        });
}

function getAllEmpSkills(){
    return fetch(urls().getAllEmpSkills,requestOptions.get())
    .then(handleResponse)
    .then(user => {
        return user;
    });
}

function getAllEmployeeBySkill(skill) {
    return fetch(urls().getAllEmployeeBySkill+'?skillname='+skill, requestOptions.get())
        .then(handleResponse)
        .then(user => {
            return user;
        });
}