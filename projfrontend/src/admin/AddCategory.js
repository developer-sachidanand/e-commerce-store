import React,{useState} from 'react';
import Base from "../core/Base";
import {isAuthenticated} from '../auth/helper';
import {Link} from 'react-router-dom';
import {createCategory} from "./helper/adminapicall"

const AddCategory = () =>{

    const [name,setName] = useState("")
    const [error,setError] = useState(false)
    const [success,setSuccess] = useState(false)

    const {user,token} = isAuthenticated();


    const handleChange = event =>{
        setError("");
        setName(event.target.value);
    }

    const onsubmit = event => {
        event.preventDefault();
        setError("");
        setSuccess(false);

        //backend request fired

        createCategory(user._id,token,{name})
        .then(data=>{
            if(data.error){
                setError(true);
            }
            else{
                setError("");
                setSuccess(true);
                setName("");
            }
        })
    }

    const successMessage = () =>{
        if(success){
            return <h4 className =" text-success">Category created successfully</h4>
        }
    }
    const warningMessage = () =>{
        if(error){
            return <h4 className =" text-warning">Failed to create category</h4>
        }
    }

    const myCategoryForm = () =>(
        <form>
            <div className="form-group">
                <p className="lead">Enter the Category</p>
                <input 
                type="text" className="form-control my-3" 
                autoFocus required placeholder="for Ex. Summer"
                onChange = {handleChange} value = {name}/>
                <button onClick = {onsubmit} className="btn btn-outline-info">Create Category</button>
            </div>
        </form>

    );
    
    const goBack = () =>(
        <div className="mt-5">
            <Link className = "btn btn-sm btn-success mb-3" to ="/admin/dashboard">Admin Home</Link>
        </div>
    )

    return(
       <Base
       title =  "Create a new Category" description="Add a new Category for a new T-Shirt"
       className = "container bg-info p-4"
       >
           <div className="row bg-white rounded">
               <div className="col-md-6 offset-md-2">
                   {successMessage()}
                   {warningMessage()}
                   {myCategoryForm()} {goBack()}
               </div>
           </div>
       </Base>
    );
};


export default AddCategory;