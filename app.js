const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors())
app.use(express.json());

const braintree = require('./routes/payment')






app.use('/api/v1/braintree/',braintree);



app.listen(7575, ()=>{
    console.log("Started...")
})


//http://localhost:7575