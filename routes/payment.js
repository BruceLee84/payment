const router = require('express').Router()
const braintree = require('braintree')

const config ={
    environment:braintree.Environment.Sandbox,
    merchantId:'pw9gkb87zjsjypkn',
    publicKey:'jpnncypvdwzfwwmg',
    privateKey:'0628f1bd948bdcb84d6235f9b1df6cbb'
}

const gateway = new braintree.BraintreeGateway(config)

router.get('/token', async(req, res)=>{
    try{
        gateway.clientToken.generate({}, (err, response)=>{
            if(err){
                return res.send({'error':err})
            }else{
                return res.json({'status':'success', 'message':response})
            }
        })
    }catch(err){
        return res.json({'error':err.message})
    }
})


router.post('/transaction', async(req,res)=>{
    try {
        const paymentDetail = gateway.transaction.sale({
            amount:req.body.amount,
            paymentMethodNonce:req.body.paymentMethodNonce,
            options:{
                submitForSettlement:true
            }
        },(err, response)=>{
            if(response.success){
                return res.json({'status':'success', 'message': response.transaction})
            }else{
                return res.send({err:err})
            }
        })
    } catch (error) {
        return res.send({error:error.message})
    }
})

module.exports=router;