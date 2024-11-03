const Product=require("../models/productModel");
const ErrorHandler=require('../utils/errorhandler');
const catchAsycErrors=require('../middleware/catchAsycErrors');
const ApiFeatures = require("../utils/apifeatures");
exports.getAllProducts=catchAsycErrors(async(req,res)=>{
    $resultPerPage=5;
    const productCount=await Product.countDocuments();
    const apiFeatures=new ApiFeatures(Product.find(),req.query).search().filter().pagination($resultPerPage);
    const Products=await apiFeatures.query;
    res.status(200).json({success:true,Products});
});
exports.createProduct=catchAsycErrors(async(req,res)=>{
    req.body.user=req.user.id;
    const product=await Product.create(req.body);
    res.status(201).json({success:true,product});
});
exports.updateProduct=catchAsycErrors(async(req,res,next)=>{
    let product=await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found",500));
    }
    product=await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        userFindAndModify:false
    });
    res.status(200).json({
        success:true,
        product
    })
});
exports.deleteProduct=catchAsycErrors(async(req,res,next)=>{
    const product=await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found",500));
    }
    await product.deleteOne({_id:req.params.id});
    res.status(200).json({
        success:true,
        message:"Product delete successfully"
    })

});
exports.GetProductDetails=catchAsycErrors(async(req,res,next)=>{
    const product=await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }
    res.status(200).json({
        success:true,
        product,
        productCount
    })
});