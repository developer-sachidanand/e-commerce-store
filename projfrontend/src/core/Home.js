import React,{useState,useEffect} from 'react';
import "../styles.css";
import Base from './Base';
import Card from "./card";
import {getProducts} from "./helper/coreapicalls"

const Home = () => {

    const[products,setProducts]=useState([]);

    const[error,setError]=useState(false);

    const loadAllProduct = () =>{
        getProducts().then(data=>{
            if(data.error){
                setError(data.error)
            }
            else
            {
                setProducts(data);
            }
        });
    };
    
    useEffect(()=>{
        loadAllProduct();
    },[])

    return (
        <Base title="Welcome" description="A T-Shirt Store For Everyone">
            <div className="row text-center">
                <div className="row">
                    {products.map((product,index)=>{
                        return(
                            <div key={index} className="col-sm-4 col-md-4 mb-4">
                                <Card product={product}/>
                            </div>
                        )
                    })}
                    {error}
                </div>
            </div>
        </Base>
    )
}

export default Home;