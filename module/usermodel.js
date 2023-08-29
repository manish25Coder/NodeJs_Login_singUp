const mongoose= require ('mongoose');
const { Schema } = mongoose;
const JWT=require('jsonwebtoken');
const userSchema = new Schema({
    name:{
        type : String,
        required : [true, 'user name is required'],
        minLenght : [5,'name must be at least 5 char '],
        maxLenght :[25,'name must be less than 25 char'],
        trim : true
    },
    email:{
        type: String,
        required : [true, 'user email is required'],
        unique: true,
        lowerCase: true,
        unique :[true, 'already registered']
    },
    password:{
        type:String,
        select:false
        
    },
    forgetPasswordToken :{
        type : String
    },
    forPasswordExpiryDate :{
        type : Date
    }

     
},{
    timestamps: true
});

userSchema.methods ={
    jwtToken() {
        return JWT.sign(
            {id: this._id, email: this.email},
            process.env.SECRET,
            {
                expiresIn: '24'
            }
        
        )
    }
}

const userModel = mongoose.model('user',userSchema);
module.exports=userModel;