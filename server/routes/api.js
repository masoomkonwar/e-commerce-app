const express = require('express')
const router = express.Router();
const {database} = require('./helper');
const { request } = require('express');

router.get('/',(req,res)=>{
    res.send("hello form api router")
})


router.get('/products',(req,res)=>{
    let q = req.query
    let page = (q.page != undefined && q.page != 0) ? q.page : 1;
    const limit = (q.limit != undefined && q.limit != 0) ? q.limit : 10;
    let startValue;
    let endValue;

    if(page>0){
        startValue = (page*limit)-limit;
        endValue = parseInt(limit)+parseInt(startValue)

    }
    else
    {
        startValue = 0;
        endValue = 10
    }
    database.table('products as p').join(
        [{table : 'categories as c',
        on: 'c.id = p.cat_id'
    }]
    ).withFields([
        'p.title as name',
        'p.price',
        'p.id',
        'p.quantity',
        'p.description',
        'p.image'
    ]).slice(startValue,endValue).sort({id : .1}).getAll()
    .then(prods=>{
        if(prods.length > 0){
            res.status(200).json(
                {
                    count : prods.length,
                    products : prods
                }
            );
        }else{
            res.send("no products found")
        }
    }).catch(err=>console.log(err))


})

router.get('/products/:prodId',(req,res)=>{
    let prodId = req.params.prodId;
    //console.log(prodId);
    
    database.table('products as p').join(
        [{table : 'categories as c',
        on: 'c.id = p.cat_id'
    }]
    ).withFields([
        'p.title as name',
        'p.price',
        'p.id',
        'p.quantity',
        'p.image',
        'p.images'
    ]).filter({'p.id' : prodId}).get()
    .then(prod=>{
        if(prod){
            res.status(200).json(
                prod
            );
        }else{
            res.send("no product found with product id"+prodId)
        }
    }).catch(err=>console.log(err))

})
router.get('/products/category/:catName',(req,res)=>{
    let q = req.query
    let cat_title = req.params.catName
    console.log(q.page)
    let page = (q.page != undefined && q.page != 0) ? q.page : 1;
    const limit = (q.limit != undefined && q.limit != 0) ? q.limit : 10;
    let startValue;
    let endValue;

    if(page>0){
        startValue = (page*limit)-limit;
        endValue = parseInt(limit)+parseInt(startValue);
    }
    else
    {
        startValue = 0;
        endValue = 10
    }
    database.table('products as p').join(
        [{table : 'categories as c',
        on: `c.id = p.cat_id where c.title LIKE '%${cat_title}%'`
    }]
    ).withFields([
        'p.title as name',
        'p.price',
        'p.id',
        'p.quantity'
    ]).slice(startValue,endValue).sort({id : .1}).getAll()
    .then(prods=>{
        if(prods.length > 0){
            res.status(200).json(
                {
                    count : prods.length,
                    products : prods
                }
            );
        }else{
            res.send(`no products found dorm the ${cat_title} catagory`)
        }
    }).catch(err=>console.log(err))


})

module.exports = router