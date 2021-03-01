import React,{useState,useEffect} from 'react';
import { isAuthenticated } from '../auth/helper';
// import { cartEmpty, loadCart } from './helper/cartHelper';
// import {Link} from 'react-router-dom';
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from '../backend';
// import { createOrder } from './helper/orderHelper';

const StripeCheckout = ({products,setReload=f=>f,reload = undefined}) =>{
    
    const [data,setData] = useState({
        loading:false,
        success:false,
        error:"",
        address:""
    });


    const tokenId = isAuthenticated() && isAuthenticated().token
    const userId = isAuthenticated() && isAuthenticated().user._id

    const getFinalPrice = () =>{
        let amount =0
        products.map(p=>{
            amount = amount + p.price
        })
        return amount;
    };
    

    const makePayment = tokenId =>{
        const body = {
            tokenId,
            products
        }
        const headers = {
            "Content-type":"application/json"
        }
        return fetch(`${API}/stripepayment`,{
            method:'POST',
            headers,
            body:JSON.stringify(body)
        }).then(response=>{
            console.log(response)
        }).catch(err=>console.log(err))
    };

    const showStripeButton = () =>{
        return isAuthenticated() ? (
            <StripeCheckoutButton
                stripeKey = ""
                token={makePayment}
                amount = {getFinalPrice()*100}
                name="Buy T-shirts"
                shippingAddress
                billingAddress
            >
            <button className="btn btn-success">Pay with Stripe</button>
            </StripeCheckoutButton>
        ):(
            <link to="/signin">
                <button className="btn btn-warning">
                    signin
                </button>
            </link>
        );
    }
    
    return(
        <div>
            <h3 className="text-white">Stripe checkout ${getFinalPrice()}</h3>
            {showStripeButton()}
        </div>
    )
};

export default StripeCheckout;