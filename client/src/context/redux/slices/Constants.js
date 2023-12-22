import Cookies from 'js-cookie'
export const setToken = (token) => {
    Cookies.set('userToken', token);
}
export const getToken = () => {
    return Cookies.get('userToken');
}