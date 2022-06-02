const mongoose=require('mongoose')

const Event=new mongoose.Schema(
    {
        firstName:{type:String,required:true},
        lastName:{type:String,required:true},
        address:{type:String,required:true},
        mobile:{type:Number,required:true},
        alternateMobile:{type:Number},
        bookedDate:{type:Date,required:true},
        eventType:{type:Number,required:true},
        openBook:{type:String,required:true},
        eventDesc:{type:String,required:true}
    },
    {collection:'Event Booking'}
)

const model=mongoose.model('EventsBooked',Event)
module.exports=model