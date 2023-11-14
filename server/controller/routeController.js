const User=require('../models/user')

const showProfile=async (req,res)=>{

    try{    

    const userProfile=await User.findOne({username:req.body.username});
    console.log(userProfile)
    return res.status(200).json({user:userProfile});
    }catch(e){
        console.log(e)
        return res.status(400).send(e)
    }
}
const registerProfile=async(req,res)=>{
    try {
        const { username,address,department,gender,dob,email,name,employeeId } = req.body;
        const newUser = await User.create({
          username,
          address,
          department,
          gender,
          dob,
          email,
          name,
          employeeId
        });
    
        return res.status(200).json({user: newUser});
      } catch (error) {
        return res.status(400).send(error);
      }
}

module.exports={showProfile,registerProfile}