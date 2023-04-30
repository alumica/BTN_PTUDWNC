import { delete_api, get_api } from "./Method";

const api = 'https://localhost:7116/api';

export function getContacts(pageSize = 10, pageNumber = 1, sortColumn = '', sortOrder = '') {
    let url = new URL(api + '/contacts');
    sortColumn !== '' && url.searchParams.append('SortColumn', sortColumn);
    sortOrder !== '' && url.searchParams.append('SortOrder', sortOrder);
    url.searchParams.append('PageSize', pageSize);
    url.searchParams.append('PageNumber', pageNumber);
    return get_api(url.href);
}

export function deleteContact(id = 0) {
    return delete_api(api + `/contacts/${id}`);
}