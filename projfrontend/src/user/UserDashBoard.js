import React from 'react';
import Base from '../core/Base';
import {isAuthenticated} from "../auth/helper/index";

const UserDashBoard = () =>{
    
    const {user:{name,email}} = isAuthenticated();


    const userProfile = () =>{
        return(
            <div className = "card mb-5">
                <h4 className = "card-header text-dark">User Information</h4>
                <ul className="list-group">
                    <li className="list-group-item text-dark">
                        <span className="badge badge-success mr-2 text-dark">Name:</span> {name}
                    </li>
                    <li className="list-group-item text-dark">
                        <span className="badge badge-success mr-2 text-dark">Email:</span> {email}
                    </li>
                    <li className="list-group-item">
                        <span className="badge badge-danger mr-2">User Area</span>
                    </li>
                </ul>
            </div>
        )
    };


    return(
        <Base title = "Welcome,User"description="Your Profile">
            <div className="row">
                {/* <div className="col-3">{adminLeftSide()}</div> */}
                <div className="col-8 offset-2">{userProfile()}</div> 
            </div>
        </Base>
    )

};

export default UserDashBoard;