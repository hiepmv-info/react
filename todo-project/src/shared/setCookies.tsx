import Cookies from 'js-cookie';

function setCookie(name: string, value: string | object, days: number) {
    Cookies.set(name, typeof value === 'object' ? JSON.stringify(value) : value, 
        { secure: true, sameSite: 'strict', expires: days });
}

export default setCookie;