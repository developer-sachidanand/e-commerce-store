// import {API} from '../../backend';

export const signup = user =>{
    return fetch(`/api/signup`,{
        method:"POST",
        headers:{
            Accept:'application/json',
            "Content-Type":'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err))
}


export const signin = user =>{
    return fetch(`/api/signin`,{
        method:"POST",
        headers:{
            Accept:'application/json',
            "Content-Type":'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err))
}

export const authenticate = (data,next) =>{
    if(typeof window !== "undefined")
    {
        localStorage.setItem("jwt",JSON.stringify(data));
        next();
    }
}

export const signout = next =>{
    if(typeof window !== "undefined")
    {
        localStorage.removeItem("jwt")
        next();

        return fetch(`/api/signout`,{
            method:"GET"
        })
        .then(()=>console.log("signout success"))
        .catch(err=>console.log(err))
    }
}

export const isAuthenticated = () =>{
    if(typeof window == "undefined")
    {
        return false;
    }
    if(localStorage.getItem("jwt"))
    {
        const token = localStorage.getItem("jwt")
        return JSON.parse(token);
    }
    else{
        return false;
    }
};