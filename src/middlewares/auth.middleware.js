const jwt=require("jsonwebtoken");



async function authArtist(req,res,next){
     const token=req.cookies.token;


     if(!token){
        return res.status(401).json({
            messsage:"unauthorized"
        })
     }

     try{
    const decoded=jwt.verify(token,process.env.JWT_SECRET)

    if(decoded.role!=="artist"){
     return res.status(403).json({message:"you dont have access"})
    }

    req.user=decoded;
    next()
     }
     catch(err){
        console.log("error",err)
        return res.status(401).json({
            messsage:"unauthorized error"
        })
     }
}


async function authUser(req,res,next){
    const token=req.cookies.token


    if(!token){
        return res.status(401).json({message:'unauthorized user'})
    }
    try{
      const decoded=jwt.verify(token,process.env.JWT_SECRET)
      if(decoded.role !=="artist" && decoded.role !=="user"){
        return res.status(403).json({message:"you dont have access"})
      }
    req.user=decoded
    next()
     
    }
    catch(err){
       console.log("Error",err)
        return res.status(401).json({message:'unauthorized'})
    }

}



module.exports={authArtist,authUser}