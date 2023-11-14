
const checkAdmin=(req,res,next)=>{
    const userType=req.body.userType;
    if(userType!=='admin')return res.status(404).send({msg:'Access Denied by me hue hue'})
    next();
}

module.exports=checkAdmin;