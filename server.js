const express=require('express')
const jwt=require('jsonwebtoken')
const app=express()
const mongoose=require('mongoose')
const cors=require('cors')
app.use(cors())
app.use(express.json())
//connect db
mongoose.connect("mongodb+srv://saran:saran@cluster0.qmc1h.mongodb.net/event-Booking?retryWrites=true").then(console.log("DB successfull"))

//importing models
const User=require('./modals/user.modal.js')
const EventsBooked=require('./modals/event.model')

//routes
app.get('/hello',(req,res)=>{
    res.send('helloword')
    console.log("hello")
})
//register payload json username,password
app.post('/api/register', async(req,res)=>{
    console.log(req.body)
    try{
        const user=await User.create(
            {
                userName:req.body.userName,
                password:req.body.password
            }
        )
        res.json({status:true})
        console.log("register successfull")
    }
    catch(err){
        console.log(err)
        res.json({error:"Failed to create to db"})
    }
})

app.get('/api/adminBook',async(req,res)=>{
    const bookOpen=await EventsBooked.find()
    if(bookOpen)
    {
        res.json(bookOpen)
    }
    console.log(bookOpen)
})

app.post('/api/login', async(req,res)=>{
    console.log(req.body)
        const user=await User.find(
            {
                userName:req.body.userName,
                password:req.body.password
            }
        )
        if(user)
        {
            const token=jwt.sign({
                userName:user.userName
            },'secret123')
            res.json({status:true,user:token})
            console.log("Login Successfull")
        }
        else
        {
            res.json({status:false,user:false})
        }
    
})

app.post('/api/booking',async(req,res)=>{
    try{
        const event=await EventsBooked.create(
            {
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                address:req.body.address,
                mobile:req.body.mobile,
                bookedDate:req.body.bookedDate,
                alternateMobile:req.body.alternateMobile||"",
                eventType:req.body.eventType,
                openBook:"true"
            }

        )
        res.json({status:true,booked:true})
        console.log("success booking retrieved")
    }
    catch(error){
        console.log("Error in retrive open book",error)
        res.json({status:false,booked:false})
    }
})
app.listen(5000,()=>{
    console.log("Server running on 5000")
})