import ProductModal from "../models/Product.js";

const ProductCreate = async (req, res) => {

    try {
        const userId = req.params.userId
        const { title, desc, Image_url } = req.body;
        if (!title || !desc || !Image_url || !userId) {
            return res.status(303).json({ success: false, message: "Al fields are required" })
        }

        const CreateProduct = new ProductModal({
            title, desc, Image_url, userId
        })

        await CreateProduct.save()
        return res.status(200).json({ success: true, message: "Product created Successfully", Prdouct: CreateProduct })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error", })
    }

}


const Update = async (req, res) => {
    try {

        const ProductId = req.params.id;
        const { title, desc, Image_url } = req.body;

        const FindProdouct = await ProductModal.findById({ _id: ProductId })

        if (!FindProdouct) {
            return res.status(404).json({ success: false, message: "Products not Found", })

        }


        const UpdateProduct = await ProductModal.findByIdAndUpdate(
            { _id: ProductId },
            { title, desc, Image_url }, { new: true }
        )

        res.status(200).json({ success: true, message: "Product Updates Successfully", prdocut:UpdateProduct })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}



const DeleteProduct=async(req,res)=>{
    try {
       
        const ProductId=req.params.id
        const FindProdouct = await ProductModal.findById({ _id: ProductId })

        if (!FindProdouct) {
            return res.status(404).json({ success: false, message: "Products not Found", })

        }

        const deletedProduct=await ProductModal.findByIdAndDelete({_id: ProductId})


              res.status(200).json({success:true,message:"Product deleted Deleted Successfully",Product:deletedProduct})

    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"Internal Server Error",})
    }
}


const GetProduct=async(req,res)=>{
    try {
        const userId = req.params.userId        
        const products=await ProductModal.find({userId})


        return res.status(200).json({success:true,products})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"Internal Server Error"})
    }
}

export { ProductCreate, Update , DeleteProduct, GetProduct }