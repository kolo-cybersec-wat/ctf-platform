import Cookies from "universal-cookie";
import {environment} from "./environment";

export const fetchData = (path: string, options: RequestInit = {}) => {
    options.headers = options.headers || {};
    options.headers['Accept'] = 'application/json';
    return fetch(`${environment.BACKEND_URL}${path}`, options);
}

// WARNING: urls MUST end with a slash
export const postData = (url: string, options: RequestInit = {}) => {
    const cookies = new Cookies();
    options.method = 'POST';
    options.headers = options.headers || {};
    options.headers['X-CSRFToken'] = cookies.get('csrftoken');
    options.headers['Content-Type'] = 'application/json';
    return fetchData(url, options);
}

export const getSessionData = () => {
    return fetchData('/api/auth/session/');
}