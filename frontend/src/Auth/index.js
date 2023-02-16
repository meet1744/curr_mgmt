export const doLogin=(data,next)=>{
    localStorage.setItem('data',JSON.stringify(data));
    next();
}

export const isLoggedIn=()=>{
    localStorage.getItem('data');
    if(data==null){
        return false;
    }
    return true;
}

export const doLogout=()=>{
    localStorage.removeItem('data');
}

export const getUserData=()=>{
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem('data'));
    }
    return false;
}