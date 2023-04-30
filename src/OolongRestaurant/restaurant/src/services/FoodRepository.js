import { isEmptyOrSpaces } from "../utils/utils";
import { delete_api, get_api, post_api } from "./Method";

const api = 'https://localhost:7116/api/foods';

export function getFoods(pageSize = 10, pageNumber = 1, sortColumn = '', sortOrder = '') {
    let url = new URL(api);
    sortColumn !== '' && url.searchParams.append('SortColumn', sortColumn);
    sortOrder !== '' && url.searchParams.append('SortOrder', sortOrder);
    url.searchParams.append('PageSize', pageSize);
    url.searchParams.append('PageNumber', pageNumber);
    return get_api(url.href);
}

export async function getFoodsByMenuId(id = 0, pageSize = 10, pageNumber = 1, sortColumn = '', sortOrder = '') {
    if (id > 0) {
        let url = new URL(api + `/menu/${id}`);
        sortColumn !== '' && url.searchParams.append('SortColumn', sortColumn);
        sortOrder !== '' && url.searchParams.append('SortOrder', sortOrder);
        url.searchParams.append('PageSize', pageSize);
        url.searchParams.append('PageNumber', pageNumber);
        return get_api(url.href);
    }
        
    return null;
}



export async function getFoodById(id = 0) {
    if (id > 0)
        return get_api(api + `/${id}`);
    return null;
}

export async function addOrUpdateFood(formData) {
    return post_api(api, formData);
}

export async function deleteFoodById(id = 0) {
    if (id > 0)
        return delete_api(api + `/${id}`);
    return null;
}