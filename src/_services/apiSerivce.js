
import { handleResponse } from '../_helpers/handle-response.js';
import { requestOptions } from '../_helpers/request-options.js';
import urls from './Urls.js';

export const apiService = {
    getProfileInfo,
    updateSummary,
    getSkills,
    saveSkills,
    saveExpDetails,
    updateExpDetails,
    publishProfile,
    deleteSkills,
    viewPublicProfile,
    saveArticle,
    updateArticle,
    saveCertificate,
    updateCertificate,
};

function getProfileInfo() {
    return fetch(urls().getProfileInfo,
        requestOptions.get())
        .then(handleResponse)
        .then(response => {
            return response;
        });
}
/**
 * Update Summary
 * @param summaryData- summary text
 */
function updateSummary(summaryData) {
    return fetch(urls().updateSummary + summaryData.id,
        requestOptions.patch(summaryData))
        .then(handleResponse)
        .then(response => {
            return response;
        });
}
function publishProfile(payload) { 
    console.log(payload , 'payload');           
    return fetch(urls().publishProfile,
        requestOptions.post(payload))
        .then(handleResponse)
        .then(response => {
            return response;
        });
}
/**
 * Update skills
 * @response skillList- Skill list
 */
function getSkills() {
    return fetch(urls().getSkills, requestOptions.get())
        .then(handleResponse)
        .then(response => {
            return response;
        });
}
/**
 * Delete Skill
 * @param skill- Skill list to be deleted
 */
function deleteSkills(skill) {
    return fetch(urls().deleteSkills, requestOptions.delete(skill))
        .then(handleResponse)
        .then(response => {
            return response;
        });
}
/**
 * Save Skill
 * @param skill- Skill list to be added
 */
function saveSkills(skill) {
    return fetch(urls().saveSkills, requestOptions.post(skill))
        .then(handleResponse)
        .then(response => {
            return response;
        });
}
function saveExpDetails(expDetail) {
    return fetch(urls().saveExpDetails, requestOptions.post(expDetail))
        .then(handleResponse)
        .then(response => {
            return response;
        });
}
function updateExpDetails(expDetail) {
    return fetch(urls().updateExpDetails  + expDetail.id, requestOptions.patch(expDetail))
        .then(handleResponse)
        .then(response => {
            return response;
        });
}
function viewPublicProfile(id) {
  return fetch(urls().viewPublicProfile + '/' + id, requestOptions.get())
    .then(handleResponse)
    .then(response => {
      return response;
    });
}
function saveArticle(article) {
    return fetch(urls().saveArticle, requestOptions.post(article))
        .then(handleResponse)
        .then(response => {
            return response;
        });
}
function updateArticle(article) {
    return fetch(urls().updateArticle + article.id, requestOptions.post(article))
        .then(handleResponse)
        .then(response => {
            return response;
        });
}
function saveCertificate(certificate) {
    return fetch(urls().saveCertificate, requestOptions.post(certificate))
        .then(handleResponse)
        .then(response => {
            return response;
        });
}
function updateCertificate(certificate) {
    return fetch(urls().updateCertificate  + certificate.id, requestOptions.post(certificate))
        .then(handleResponse)
        .then(response => {
            return response;
        });
}


