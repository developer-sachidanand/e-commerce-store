const stripe = require("stripe")("SECRECT_KEY")
const uuid = require("uuid/v4")


exports.makepayment = (req,res) =>{
    const {products,token} = req.body

    let amount = 0;
    products.map(p=>{
        amount = amount + p.price;
    })

    const idempotencyKey = uuid()
    return stripe.customers.create({
        email:token.email,
        source:token.id
    }).then(customer=>{
        stripe.charges.create({
            amount:amount,
            currency:'usd',
            customer:customer.id,
            receipt_email:tokem.email,
            shipping:{
                name:token.card.name
            }
        },{idempotencyKey})
        .then(result => res.status(200).json(result))
        .catch(err=>console.log(err))
    })
}