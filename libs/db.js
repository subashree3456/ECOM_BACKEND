import mongoose from "mongoose";

const Dbcon = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URL)
        console.log("mongodb is connected")
    } catch (error) {
        console.log("mongodb connection error",error)
    }
}

export default Dbcon


//bITvxBbRusrIUKvw 


// suba