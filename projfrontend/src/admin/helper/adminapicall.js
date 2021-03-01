// import {API} from "../../backend";


//create category
export const createCategory = (userId,token,category) => {
    return fetch(`/api/category/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body : JSON.stringify(category)
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err))
}
//get all categories

export const getCategories = () =>{
    return fetch(`/api/categories`,{
        method:"GET"

    }).then(response=>{return response.json();})
    .catch(err=>console.log(err))
}



// create a product
export const createProduct = (userId,token,product) =>{
    return fetch(`/api/product/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        },
        body:product
    }).then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}


//get all products

export const getProducts = () =>{
    return fetch(`/api/products`,{
        method:"GET",

    }).then(response=>{return response.json()})
    .catch(err=>console.log(err))
}


//delete all products

export const deleteProduct = (productId,userId,token) =>{
    return fetch(`/api/product/${productId}/${userId}`,{
        method:"DELETE",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        }
    }).then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}

//get a product

export const getaProduct = productId =>{
    return fetch(`/api/product/${productId}`,{
        method:"GET",
    }).then(response=>{return response.json()})
    .catch(err=>console.log(err))
}


//update all products

export const updateProduct = (productId,userId,token,product) =>{
    return fetch(`/api/product/${productId}/${userId}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        },
        body:product
    }).then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}