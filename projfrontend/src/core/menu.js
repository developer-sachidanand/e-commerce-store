import React,{Fragment} from 'react';
import {Link,withRouter} from 'react-router-dom';
import {signout,isAuthenticated} from '../auth/helper';

const currentTab = (history,path) =>{
    if(history.location.pathname ===path)
    {
        return{color:"#2ecc72"}
    }
    else{
        return {color:"#FFFFFF"}
    }
}


const Menu = ({history}) =>(
    <div>
        <ul className="nav nav-tabs bg-dark justify-content-center">
            <li className="nav-item">
                <Link 
                style = {currentTab(history,'/')}
                 className="nav-link" to="/">
                     Home
                </Link>
            </li>
            <li className="nav-item">
                <Link 
                style = {currentTab(history,'/cart')} 
                className="nav-link" to="/cart">
                    Cart
                </Link>
            </li>
            { isAuthenticated() && isAuthenticated().user.role ===0 && (
                <li className="nav-item">
                <Link 
                style = {currentTab(history,'/user/dashboard')} 
                className="nav-link" to="/user/dashboard">
                    U.DashBoard
                </Link>
            </li>
            )}
            { isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className="nav-item">
                <Link 
                style = {currentTab(history,'/admin/dashboard')} 
                className="nav-link" to="/admin/dashboard">
                    A.DashBoard
                </Link>
            </li>
            )}
            {!isAuthenticated() && (
                <Fragment>
                    <li className="nav-item">
                        <Link 
                        style = {currentTab(history,'/Signup')} 
                        className="nav-link" to="/Signup">
                            Signup
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link 
                        style = {currentTab(history,'/Signin')} 
                        className="nav-link" to="/Signin">
                            Signin
                        </Link>
                    </li>
                </Fragment>
            )}
            {isAuthenticated() && (
                  <nav className="nav-item">
                      <Link className="nav-link text-warning" to="/"
                      onClick = {()=>{
                          signout(()=>{
                              history.push("/");
                          });
                      }}
                      >
                        Signout
                      </Link>
                  </nav>
            )}

        </ul>
    </div>
)

export default withRouter(Menu);