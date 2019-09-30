import { handleResponse } from '../_helpers/handle-response.js';
import urls from './Urls.js';
import {requestOptions} from "../_helpers/request-options";

export const skillMatrixService = {
    getAllSkills,
    getDesignationCategory,
    getSkillsByDesg
    
};
function getAllSkills(type) {
   
    return fetch(urls().getAllSkills+'?type='+type, requestOptions.get())
        .then(handleResponse)
        .then(response => {
            return response;
        });
}

function getDesignationCategory() {
    return fetch(urls().getDesignationCategory, requestOptions.get())
        .then(handleResponse)
        .then(response => {
            return response;
        });
}

function getSkillsByDesg(type){
    
    return fetch(urls().getSkillsByDesg+'?type='+type, requestOptions.get())
    .then(handleResponse)
    .then(response => {
        return response;
    });
}
