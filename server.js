const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')



const app = express()

app.use(express.json())

//routes

app.get('/', (req, res)=>{
    res.send('Welcome my guy')
})

app.get('/products', async(req, res)=>{
    try{
        const products = await Product.find({});
        res.status(200).json(products)

    }
    catch(error){
        res.status(500).json({message: error.message})

    }
   
})

app.get('/products/:id', async(req, res)=>{
    try{
        const {id} = req.params
        const product = await Product.findById(id);
        if(!product){
            res.send('Product does not exist')
        }
        res.status(200).json(product)

    }
    catch(error){
        res.status(500).json({message: error.message})

    }
   

})
app.post('/products', async (req, res)=>{
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product)

    }
    catch(error){
        console.log(error.message)
        res.status(500).json({message:error.message})
        res.send('sent')
    }
  
 
})

app.put('/products/:id', async (req, res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message:`cannot find any product with ID ${id}`})

        }
        res.status(200).json(product)

    }
    catch(error){
        console.log(error.message)
        res.status(500).json({message:error.message})
        
    }
  
 
})

app.put('/products/:id', async (req, res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message:`cannot find any product with ID ${id}`})

        }
        res.status(200).json(product)

    }
    catch(error){
        console.log(error.message)
        res.status(500).json({message:error.message})
        
    }
  
 
})

app.delete('/products/:id', async (req, res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message:`cannot find any product with ID ${id}`})

        }
        res.status(200).json(product)

    }
    catch(error){
        console.log(error.message)
        res.status(500).json({message:error.message})
        
    }
  
 
})



mongoose.set('strictQuery', false)
mongoose.connect('mongodb+srv://wilo_11:kingsman@cluster0.szpi4t7.mongodb.net/api?retryWrites=true&w=majority')
.then(()=>{

    console.log('connected to mongodb')
})
.catch(()=>{
    console.log('error')
})

app.listen(8080)



