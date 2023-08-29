const mongoose = require("mongoose")

const connectToDb = async ()=>{
    mongoose.connect(process.env.MONGOOSE_URL)
    .then((conn)=>{
        console.log(`server successfully connected${conn.connection.host}`);
    })

    
    .catch((error)=>{
        console.log(error.message);
        process.exit(1);
    })

    
}
module.exports=connectToDb