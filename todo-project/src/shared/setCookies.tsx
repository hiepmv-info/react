import Cookies from 'js-cookie';

function setCookie(name: string, value: string | object) {
    Cookies.set(name, typeof value === 'object' ? JSON.stringify(value) : value, 
        { secure: true, sameSite: 'strict' });
}

export default setCookie;