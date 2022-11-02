const express = require('express');
const productRouter = require('./routes/products')
const app = express();
const cors = require('cors')
const productData = require('./data/products.json')
const hbs = require('hbs')
const connectDatabase = require('./database/connection')

connectDatabase();


app.use(cors());
app.use(express.json());
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'))
hbs.registerPartials(__dirname + '/views/partials')

//Our Middlewares
const logger = ((req,res,next)=>{
    console.log("This is middleware")
    next()
})
const logger2 = ((req,res,next)=>{
    console.log("This is second middleware")
    next()
})
// app.use(logger)

app.get('/', [logger,logger2], (req, res) => {
   res.render('index',{productData});
})

app.get('/details/:id',(req,res)=>{
    res.render('details',productData.find((product)=>{
       return product.id == req.params.id
    }))
})

// app.get('/details/:id',(req,res)=>{
//     const {id} = req.params
//     const selectedProduct = productData.find((product)=>product.id===parseInt(id))
//     res.render('details',selectedProduct)
// })



// app.get('/css/index.css',(req,res)=>{
//     res.sendFile(__dirname + '/css/index.css')
// })

app.use('/api/products', productRouter)

app.listen(4000, () => {
    console.log("Server started at port 4000");
})