const userModel = require("../module/usermodel.js");

const signup = async (req,res,next)=>{
    const {name , email , password , confirmpassword } = req.body;
    console.log(name , email , password , confirmpassword);

    if(!name || !email || !password || !confirmpassword){
        return res.status(400).json({
            success: false,
            message:"Every field is required"
        })
    }

   const validemail= emailValidator.validator(email)
   if(!validemail){
    return res.status(400).json({
        success: false,
        message:"Please provid a valid email id "
    })
   }

   if(password !== confirmpassword){
    return res.status(400).json({
        success: false,
        message:"Password and confirm password dose not match"
    })

   }

    try{
        const userInfo = userModel(req.body);//to store the data in data base
        const result = await userInfo.save();
    
        return res.status(200).json({
            success : true,
            data:result
        });

    }
    catch(e){
        if(e.code== 1100){
            return res.status(400).json({
                success: false,
                message:"Account already exists  with provide email id"
        })
    }
        return res.status(400).json({
            success: false,
            message:e.message

        })

    }

   
    }


    const signin= async (req,res) =>{
        const {email,password}=req.body
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message:"Every field is mandetory"
            })
        }

        try{
            const user= await userModel
            .findOne({
                email
            })
            .select('+password');
            //compare as a text password
            if(!user || user.password !== password){
                return res.status(400).json({
                    success: false,
                    message:"invalid  credentials"
                })
            }
    
            const token = user.jwtToken();
            user.password = undefined
    
            const cookieOption ={
                maxAge: 24*60*60*1000,
                httpOnly: true
            };
    
            res.cookie("token " ,token, cookieOption);
            res.status(200).json({
                success: true,
                data:user
            })

        }
        catch(e){
            res.status(400).json({
                success: false,
                message:e.message
            })

        }

       

    }


    const getuser= async(req,res,next)=>{
        const userId =req.user.id;

        try{
            const user= await userModel.findById(userId);
            return res.status(200).json({
                success:true,
                data: user
            })

        }
        catch(e){
            return res.status(400).json({
                success:false,
                message:e.message
            })

        }

    }

module.exports={
    signup,
    signin,
    getuser
}