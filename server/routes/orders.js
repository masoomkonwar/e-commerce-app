const express = require('express')
const router = express.Router();
const {database} = require('./helper')



router.get('/',(req,res)=>{
    database.table('orders_details as od')
    .join([
        {
            table : 'orders as o',
            on: ' o.id = od.order_id'
        },
        {
            table : 'products as p',
            on : 'p.id = od.product_id'
        },
        {
            table : 'users as u',
            on : 'u.id = o.user_id'
        }
    ]).withFields(['o.id','p.title as name','p.description','p.price','u.username']).sort({id : .1}).getAll()
    .then(orders=>{
        if(orders.length>0)
        {
            res.status(200).json(orders)
        }else{
            res.send('no orders found')
        }
    }).catch(err=>console.log(err))
})
router.get('/:id',(req,res)=>{
    const orderId = req.params.id;
    database.table('orders_details as od')
    .join([
        {
            table : 'orders as o',
            on: ' o.id = od.order_id'
        },
        {
            table : 'products as p',
            on : 'p.id = od.product_id'
        },
        {
            table : 'users as u',
            on : 'u.id = o.user_id'
        }
    ]).withFields(['o.id','p.title as name','p.description','p.price','u.username']).sort({id : .1}).filter(`o.id = ${orderId}`)
    .getAll()
    .then(orders=>{
        if(orders.length>0)
        {
            res.status(200).json(orders)
        }else{
            res.send(`no orders found of order id ${orderId}`)
        }
    }).catch(err=>console.log(err))
})

router.post('/new',(req,res)=>{
    
    let x = req.body
    console.log(req.body)
    let {userId , products } = x;
    console.log(userId)
    console.log(products)
    

    if(userId!=null && userId > 0 && !isNaN(userId))
    {
        database.table('orders').insert({
            user_id : userId
        }).then(newOrderId=>{
            if(newOrderId>0)
            {
                products.forEach(async(p) => {
                    let data =  await database.table('products').filter({id : p.id}).withFields(['quantity']).get()       
                

                let incart = p.incart;
        
            if(data.quantity>0)
            {
                data.quantity = data.quantity - incart
                if(data.quantity<0)
                {
                    data.quantity = 0;
                }
            }
            else
            {
                data.quantity = 0
            }

            database.table('orders_details').insert(
                {order_id : newOrderId,
                    product_id : p.id,
                    quantity : incart
                }
            ).then(newId=>{
                database.table('products').filter({id : p.id}).update({quantity : data.quantity})
                .then(successNum =>{

                }).catch(err=>console.log(err))
            }).catch(err=>console.log(err));
        });
        }
        else
        {
            res.json({message : "faild to place new order",success : false})
        }

        res.json({
            message : `order successfully placed with order id ${newOrderId}`,
            success : true,
            order_id : newOrderId,
            products : products
        });

        }).catch(err=>console.log(err))
    }
    else{
        res.json({message:'failed to place order',success : true});
    }
})

module.exports = router