import { get_api, post_api, delete_api } from "./Method";
import { isEmptyOrSpaces } from "../utils/utils";
import { getFoods } from "./FoodRepository";

const api = 'https://localhost:7116/api/menus';

export function getMenus(pageSize = 10, pageNumber = 1, sortColumn = '', sortOrder = '') {
    let url = new URL(api);
    sortColumn !== '' && url.searchParams.append('SortColumn', sortColumn);
    sortOrder !== '' && url.searchParams.append('SortOrder', sortOrder);
    url.searchParams.append('PageSize', pageSize);
    url.searchParams.append('PageNumber', pageNumber);
    return get_api(url.href);
}

export async function getMenuById(id = 0) {
    if (id > 0)
        return get_api(api + `/${id}`);
    return null;
}

export async function addOrUpdateMenu(formData) {
    return post_api(api, formData);
}

export async function getFoodsByMenuSlug(slug = '', pageSize = 10, pageNumber = 1, sortColumn = '', sortOrder = '') {
    if (!isEmptyOrSpaces(slug)) {
        let url = new URL(api + `/${slug}/foods`);
        sortColumn !== '' && url.searchParams.append('SortColumn', sortColumn);
        sortOrder !== '' && url.searchParams.append('SortOrder', sortOrder);
        url.searchParams.append('PageSize', pageSize);
        url.searchParams.append('PageNumber', pageNumber);
        return get_api(url.href);
    }
    else
        return getFoods(3, 1);
        
    return null;
}

export async function deleteMenuById(id = 0) {
    if (id > 0)
        return delete_api(api + `/${id}`);
    return null;
}