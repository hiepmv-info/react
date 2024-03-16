import Cookies from 'js-cookie';

function setCookie(name: string, value: string | object, expiresIn: string) {
    Cookies.set(name, typeof value === 'object' ? JSON.stringify(value) : value, 
        { expires: new Date(expiresIn), secure: true, sameSite: 'strict' });
}

export default setCookie;