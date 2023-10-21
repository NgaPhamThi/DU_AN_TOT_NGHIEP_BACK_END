const orderStatus = [
    'chờ duyệt',
    'lấy hàng',
    'đang giao',
    'giao hàng thành công'
  ];
  export const validateOrder =(req,res,next)=>{
    const {userId,status,address,orderTotal} =req.body
    if(!userId || !address ||!orderTotal){
        return res.status(400).json({error:"Please provide all required fields."})
    } 
    if(status && !orderStatus.includes(status)){
        return res.status(400).json({error:`Status must be one of ${orderStatus.join(', ')}`})
    }
    next();
  }