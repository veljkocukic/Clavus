import Cookies from 'js-cookie';

const getCookies = (cookiename:any)=>{

try {
    const cookies:any =  Cookies.get(cookiename)
    const resp = JSON.parse(cookies)
    return resp
    
} catch (error) {
    return null
}

}

export default getCookies;
