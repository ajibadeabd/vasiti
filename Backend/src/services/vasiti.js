const express = require('express')
const path = require('path')
const fs = require('fs')
const CustomError = require('../middleware/customError')
const router = express.Router()

const {succes_Message, error_Message} = require('../middleware/helper')
const {Product} = require('../../models/index')
class vasiriContoller {

  async post_product(request,response){
    try{
        if(request.files.length===0){
        throw new Error('Please upload product image')

        }
        // console.log(`${request.hostname}/upload/${request.images[0].filename}`)
    // console.log({image:request.files})

const imageArray = []
        for(each of request.files ){
            imageArray.push(`${request.hostname}/upload/${each.filename}`)

        }
    const { product_name, product_description,
    product_varieties} = request.body
    if( !product_name || !product_description || !product_varieties){
       

        throw new Error(' provide all required fields [product_name, product_description,product_varieties]')
            }
    const ifProductExist = await Product.findOne({where:{product_name}})
    if(ifProductExist){

   throw new Error('Poduct already exist ')
    }
    if(!Array.isArray(product_varieties)){
   throw new Error('product_varieties has an incorrect format')
    }
    

   for(const each_varieties of product_varieties){
const varieties_properties = []

    for(const each_property in each_varieties){
// console.log(each_propertiy , each_varieties)
varieties_properties.push(each_property)

// check if varieties_properties field contains a un neccessary fields

if(![ 'size', 'color', 'quatity', 'images', 'price' ].includes(each_property)){
throw new Error('Please remove unneccessary field that area not not to perform this operation')
}
}
// check if varieties_properties is send down completely
if(varieties_properties.length!==5){
throw new Error(` varieties must have properties of 'size', 'color', 'quatity', 'images', 'price' `)

}
   }

   // save products with varieties
   const save_product = await Product.create({
    product_name, product_description,
    product_varieties
   })
return (save_product)
    }catch(error){
        // console.log(`${request.hostname}/upload/${request.images[0].filename}`)
        // await  fs.unlink(`public/upload/${request.images[0].filename}`,(err)=>{})
throw new CustomError(error.message)


    }
}
async fetch_products (){
    return await Product.findAll({})
}
async fetch_each_products (product_id){
    
    const product = await Product.findOne({where:{product_id}})
    if(!product){
    throw new CustomError('product does not exist')
    }
return product
}
async delete_each_products (product_id){
    
    const product = await Product.findOne({where:{product_id}})
    if(!product){
    throw new CustomError('You cant delete an un existing product')
    }
    product.destroy()
}
async update_each_products (product_id){


    const p = await Product.findOne({where:{product_id}})
    p.product_varieties
    return p
}
}
module.exports = new vasiriContoller();
