import { BehaviorSubject } from 'rxjs';

import { requestOptions } from '../_helpers/request-options.js';
import { handleResponse } from '../_helpers/handle-response.js';

import urls from './Urls.js';


const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(username, password) {
    return fetch(urls().login, requestOptions.post({ userName:username, password }))
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            var auth = {};
            var token = user.accessToken;
            var payload = JSON.parse(atob(token.split(".")[1]));
            var roles =[];
            for (var i = 0; i < payload.role.length; i++) {
                roles.push(payload.role[i].authority);
            }
            auth.token = token;
            auth.role = roles;
            localStorage.setItem('currentUser', JSON.stringify(auth));
            currentUserSubject.next(auth);
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}
