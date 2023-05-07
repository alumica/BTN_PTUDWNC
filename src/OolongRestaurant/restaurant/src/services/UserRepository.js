import { delete_api, get_api, post_api } from "./Method";

const api = 'https://localhost:7116/api/users';

export async function getUsers(pageSize = 10, pageNumber = 1, sortColumn = '', sortOrder = '') {
    let url = new URL(api);
    sortColumn !== '' && url.searchParams.append('SortColumn', sortColumn);
    sortOrder !== '' && url.searchParams.append('SortOrder', sortOrder);
    url.searchParams.append('PageSize', pageSize);
    url.searchParams.append('PageNumber', pageNumber);
    return get_api(url.href);
}

export async function getUserById(id = 0) {
    if (id > 0)
        return get_api(api + `/${id}`);
    return null;
}

export async function addOrUpdateUser(formData) {
    return post_api(api, formData);
}

export async function deleteUserById(id = 0) {
    if (id > 0)
        return delete_api(api + `/${id}`);
    return null;
}