const express = require('express')
const router = express.Router()
const multerImage = require('../middleware/multer')('image');

const {succes_Message, error_Message} = require('../middleware/helper')
const {
    post_product,
    delete_each_products,
     fetch_each_products,
     fetch_products,
     update_each_products
     } = require('../services/vasiti')
const resp = require('../middleware/response')

router.post('/product',multerImage[0], async(request,response)=>{
// try{

const data  = await fetch_products(request,response)
response.status(200).send(resp(" Product Saved", data));
})


router.get('/products', async(request,response)=>{
    // try{
    const data  = await fetch_products(request,response)
    response.status(200).send(resp(" Product Fetched", data));
})
router.get('/product/:product_id', async(request,response)=>{
const {product_id} = request.params
    const data  = await fetch_each_products(product_id)
    response.status(200).send(resp(" Product Fetched", data));
})
router.delete('/product/:product_id', async(request,response)=>{

    const {product_id} = request.params
    const data  = await delete_each_products(product_id)
    response.status(200).send(resp(" Product Fetched", data));
})
router.patch('/product/:product_id', async(request,response)=>{
    
    const {product_id} = request.params
    const data  = await update_each_products(product_id)
    response.status(200).send(resp(" Product Fetched", data));
})
module.exports = router;