import UserModel from "../models/User.js"
import bcryptjs from 'bcryptjs'

const Register = async (req, res) => {
    try {

        const { userName, email, password } = req.body
        if (!userName || !email || !password) {
            return res.status(303).json({success:true,message:" All faild are required"})
          }
        const ExistUser = await UserModel.findOne({ email })
        if (ExistUser) {
            return res.status(402).json({ success: false, message: "User Already exists Please Login" });
        }

        const hasePassword= await bcryptjs.hashSync(password,10)
        const newUser= new UserModel({
            userName,email,password:hasePassword
           })
           await newUser.save()
           res.status(200).json({success:true,message:"User Register Successfully",user:newUser})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:" Internal server error"})
    }
}


const Login=async(req,res)=>{
    try {
          const {email,password}=req.body
          if (!email || !password) {
            return res.status(303).json({success:false,message:" All faild are required"})
            
          }
          const FindUser=await UserModel.findOne({email})
           if (!FindUser) {
            return res.status(303).json({success:false,message:" Account Not Found please register"})
            
           }
           const ChecPassword=await bcryptjs.compare(password,FindUser.password)
           if (!ChecPassword) {
            return res.status(403).json({success:false,message:" Invalid Password"})
            
           }
          
           res.status(200).json({success:true,message:"User Login successfully",user:FindUser})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:" Internal server error"})
    }
}

export {Register,Login}