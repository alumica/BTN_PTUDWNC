import { get_api } from "./Method";

const api = 'https://localhost:7116/api/dashboard';

export async function getTotalFood() {
    return get_api(api + "/totalfood");
}

export async function getTotalMenu() {
    return get_api(api + "/totalmenu");
}

export async function getTotalContact() {
    return get_api(api + "/totalcontact");
}

export async function getTotalUser() {
    return get_api(api + "/totaluser");
}

// export async function getTotalUser() {
//     return get_api(api + "/totalfood");
// }