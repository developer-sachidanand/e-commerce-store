import React ,{useState} from 'react';
import Base from '../core/Base';
import {Link} from 'react-router-dom';
import {signup} from '../auth/helper';

const Signup = () => {
    //hook is used here
    const [values,setValues] = useState({
        name:"",
        email:"",
        password:"",
        error:"",
        success:false
    });
    //object destructuring
    const {name,email,password,error,success} = values;
    //high order function
    const handleChange = name => event =>{
        setValues({...values,error:false,[name]:event.target.value});
    };
    // another submit function
    const onSubmit = event =>{
        event.preventDefault();
        setValues({...values,error:false});
        signup({ name, email, password})
        .then(data =>{
            if(data.error)
            {
                setValues({...values,error:data.error,success:false});
            }
            else{
                setValues({...values,
                    name:"",
                    email:"",
                    password:"",
                    error:"",
                    success:true

                });
            }
        })
        .catch(console.log("error in signup"))
    };

    const signupform = () => {
        return(
            <div className="row mb-5">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input
                             className="form-control" 
                             onChange = {handleChange("name")}
                             value = {name}
                              type="text"/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input
                             onChange = {handleChange("email")} 
                             value = {email}
                             className="form-control"type="email"/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input 
                            onChange = {handleChange("password")} 
                            value = {password}
                            className="form-control" type="password"/>
                        </div>
                        <button
                         onClick ={onSubmit} 
                         className="btn btn-success btn-block">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        )
    };

    const successMessage = () =>{
        return(
        <div className="row mb-2">
            <div className="col-md-6 offset-sm-3 text-left">
                <div className="alert alert-success" style={{display: success ? "":"none"}}>
                    New Account was created successfully. Please <Link to="/signin">Login Here</Link>
                </div>
            </div>
        </div>
        );
    }
    const errorMessage = () =>{
        return(
        <div className="row mb-2">
            <div className="col-md-6 offset-sm-3 text-left">
                <div className="alert alert-danger" style={{display: error ? "":"none"}}>
                    {error}
                </div>
            </div>
        </div>
        );
    }

    return(
        <Base title="Signup Page" description="A page for user to signup">
            {successMessage()}
            {errorMessage()}
            {signupform()}
        </Base>
    )
};

export default Signup;