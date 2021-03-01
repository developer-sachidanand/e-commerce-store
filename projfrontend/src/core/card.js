import React ,{useState}from 'react'; // useEffect and useCallback hooks are removed
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from 'react-router-dom';
import {addItemToCart, removeItemFromCart} from "./helper/cartHelper";
 
const Card = ({ product, addtoCart = true, removeFromCart = false,setReload = f =>f,reload=undefined }) => {

    const [redirect,setRedirect] = useState(false);

    // const [count,setCount] = useState(product.count)

    const cardTitle = product ? product.name:"A photo from pexels"
    const cardDescription = product ? product.description:"Default description"
    const cardPrice = product ? product.price:"Default"


    const addToCart = ()=>{
        addItemToCart(product,()=> setRedirect(true))
    }

    const getARedirect = redirect =>{
        if(redirect)
        {
            return <Redirect to = "/cart" />
        }
    };

    const showAddtoCart = addtoCart => {
        return(
            addtoCart && (
                <button
                    onClick={addToCart}
                    className="btn btn-block btn-outline-success mt-2 mb-2"
                    >
                    Add to Cart
                </button>
            )
        );
    };

    const showRemoveFromCart = removeFromCart => {
        return(
            removeFromCart && (
                <button
                    onClick={()=>(
                        removeItemFromCart(product._id),
                        setReload(!reload)
                    )}
                    className="btn btn-block btn-outline-danger mt-2 mb-2"
                    >
                    Remove from cart
              </button>
            )
        )
    }

    return (
        <div className="card text-white bg-light">
            <div className="card-header lead text-success">{cardTitle}</div>
            <div className="card-body bg-light">
                {getARedirect(redirect)}
                <ImageHelper product={product} />
                <p className="lead bg-light text-dark border border-dark font-weight-normal mt-2 text-wrap">
                    {cardDescription}
                </p>
                <p className="btn btn-success rounded  btn-sm px-4">${cardPrice}</p>
                <div className="row">
                    <div className="col-12">
                        {showAddtoCart(addtoCart)}
                    </div>
                    <div className="col-12">
                        {showRemoveFromCart(removeFromCart)}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Card;